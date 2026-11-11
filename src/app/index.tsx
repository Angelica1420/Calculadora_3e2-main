import { StyleSheet, View } from "react-native";
import Rejilla from "./components/botones/Rejilla";
import Display from "./components/Display";
import { useCalculator } from "./hooks/useCalculator";

export default function Index() {
  const calculator = useCalculator();

  const presionarBoton = (texto: string) => {
    if (texto === "AC") calculator.clear();
    else if (texto === "⌫") calculator.backspace();
    else if (texto === "+/-") calculator.toggleSign();
    else if (texto === "%") calculator.percent();
    else if (texto === "√") calculator.squareRoot();
    else if (texto === "=") calculator.calculate();
    else if (texto === "+" || texto === "-" || texto === "×" || texto === "÷") calculator.setOperator(texto);
    else calculator.writeNumber(texto);
  };

  return (
    <View style={styles.container}>
      <Display
        operacion={calculator.expression}
        valor={calculator.preview}
        historial={calculator.history}
        borrarHistorial={calculator.clearHistory}
      />
      <View style={styles.separador} />
      <Rejilla onPress={presionarBoton} onLongPress={calculator.backspace} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1b1b1b",
    paddingTop: 28,
    paddingBottom: 12,
  },
  separador: {
    width: "88%",
    height: 2,
    backgroundColor: "#9a86a8",
    marginBottom: 12,
  },
});
