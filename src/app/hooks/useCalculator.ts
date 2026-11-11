import { useState } from "react";


// Analizador sencillo de operaciones: no utiliza eval() ni expresiones regulares.
type Operator = "+" | "-" | "×" | "÷";
const isDigit = (char: string) => char >= "0" && char <= "9";
const isOperator = (char: string) =>
  char === "+" || char === "-" || char === "×" || char === "÷";

function formatNumber(value: number): string {
  return Number.isFinite(value) ? String(Number(value.toPrecision(12))) : "Error";
}

function evaluateExpression(expression: string): number | null {
  const parts: Array<number | Operator> = [];
  let current = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (isDigit(char) || char === ".") {
      current += char;
      continue;
    }
    if (char === "-" && (i === 0 || isOperator(expression[i - 1]))) {
      current += char;
      continue;
    }
    if (!isOperator(char) || current === "" || current === "-" || current === "." || current === "-.") {
      return null;
    }
    const number = Number(current);
    if (!Number.isFinite(number)) return null;
    parts.push(number, char as Operator);
    current = "";
  }
  if (current === "" || current === "-" || current === "." || current === "-.") return null;
  const last = Number(current);
  if (!Number.isFinite(last)) return null;
  parts.push(last);

  // La multiplicación y división tienen prioridad sobre la suma y resta.
  const stack: Array<number | Operator> = [];
  for (let i = 0; i < parts.length; i++) {
    const item = parts[i];
    if (item === "×" || item === "÷") {
      const left = stack.pop();
      const right = parts[++i];
      if (typeof left !== "number" || typeof right !== "number") return null;
      if (item === "÷" && right === 0) return null;
      stack.push(item === "×" ? left * right : left / right);
    } else {
      stack.push(item);
    }
  }
  if (typeof stack[0] !== "number") return null;
  let result = stack[0];
  for (let i = 1; i < stack.length; i += 2) {
    const op = stack[i];
    const next = stack[i + 1];
    if (typeof next !== "number") return null;
    if (op === "+") result += next;
    else if (op === "-") result -= next;
    else return null;
  }
  return Number.isFinite(result) ? result : null;
}

const MAX_DIGITS = 15;

// El estado de la calculadora vive aquí, no en los componentes visuales.
export function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [operator, setOperatorState] = useState<Operator | null>(null);
  const [replaceDisplay, setReplaceDisplay] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const addHistory = (line: string) => setHistory((prev) => [line, ...prev].slice(0, 20));
  const clearHistory = () => setHistory([]);

  const writeNumber = (char: string) => {
    if (!isDigit(char) && char !== ".") return;
    if (replaceDisplay || display === "Error") {
      setDisplay(char === "." ? "0." : char);
      setReplaceDisplay(false);
      return;
    }
    if (char === ".") {
      // Un solo punto decimal en el número actual.
      for (let i = 0; i < display.length; i++) {
        if (display[i] === ".") return;
      }
      setDisplay(display + ".");
      return;
    }
    if (display.length >= MAX_DIGITS && display !== "0" && display !== "-0") return;
    if (display === "0") setDisplay(char);
    else if (display === "-0") setDisplay("-" + char);
    else setDisplay(display + char);
  };

  const clear = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperatorState(null);
    setReplaceDisplay(false);
    // AC limpia la operación actual; el historial se conserva.
  };

  const backspace = () => {
    if (display === "Error" || replaceDisplay) {
      setDisplay("0");
      setReplaceDisplay(false);
      return;
    }
    const next = display.slice(0, -1);
    setDisplay(next === "" || next === "-" ? "0" : next);
  };

  const toggleSign = () => {
    if (display === "Error") return;
    if (replaceDisplay) setReplaceDisplay(false);
    setDisplay((prev) => prev[0] === "-" ? prev.slice(1) : prev === "0" ? "0" : "-" + prev);
  };

  const percent = () => {
    if (display === "Error") return;
    const result = formatNumber(Number(display) / 100);
    setDisplay(result);
    setReplaceDisplay(false);
  };

  const squareRoot = () => {
    if (display === "Error") return;
    const original = display;
    const value = Number(display);
    const result = value < 0 ? "Error" : formatNumber(Math.sqrt(value));
    addHistory(`√(${original}) = ${result}`);
    setDisplay(result);
    // Conserva el operador pendiente, por ejemplo: 2 + √9 = 5.
    setReplaceDisplay(false);
  };

  const setOperator = (nextOperator: Operator) => {
    if (!isOperator(nextOperator) || display === "Error") return;
    if (storedValue !== null && operator !== null && !replaceDisplay) {
      const value = evaluateExpression(`${storedValue}${operator}${display}`);
      const calculated = value === null ? "Error" : formatNumber(value);
      if (calculated === "Error") {
        setDisplay("Error");
        setStoredValue(null);
        setOperatorState(null);
        setReplaceDisplay(true);
        return;
      }
      setStoredValue(calculated);
      setDisplay(calculated);
    } else if (storedValue === null) {
      setStoredValue(display);
    }
    setOperatorState(nextOperator);
    setReplaceDisplay(true);
  };

  const calculate = () => {
    if (storedValue === null || operator === null || replaceDisplay || display === "Error") return;
    const text = `${storedValue} ${operator} ${display}`;
    const value = evaluateExpression(`${storedValue}${operator}${display}`);
    const result = value === null ? "Error" : formatNumber(value);
    addHistory(`${text} = ${result}`);
    setDisplay(result);
    setStoredValue(null);
    setOperatorState(null);
    setReplaceDisplay(true);
  };

  const expression = storedValue !== null && operator !== null
    ? replaceDisplay ? `${storedValue} ${operator}` : `${storedValue} ${operator} ${display}`
    : display;
  const previewValue = storedValue !== null && operator !== null && !replaceDisplay && display !== "Error"
    ? evaluateExpression(`${storedValue}${operator}${display}`) : undefined;
  const preview = previewValue === undefined ? "" : previewValue === null ? "Error" : formatNumber(previewValue);

  return {
    display, expression, preview, history,
    writeNumber, clear, backspace, toggleSign, percent, squareRoot,
    setOperator, calculate, clearHistory,
  };
}
