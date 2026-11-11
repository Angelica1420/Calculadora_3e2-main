import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface BotonProps {
  texto: string;
  color?: "mauve" | "rose" | "pink";
  isDouble?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

const Boton = ({ texto, color = "rose", isDouble, onPress, onLongPress }: BotonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
      style={[
        styles.boton,
        isDouble && styles.doubleButton,
        { backgroundColor:
          color === "mauve" ? "#9a86a8" :
          color === "rose" ? "#745564" :
          color === "pink" ? "#45192f" : "#D4D4D2"
        },
      ]}
    >
      <Text style={[styles.text, { color: color === "mauve" ? "black" : "white" }]}>{texto}</Text>
    </TouchableOpacity>
  );
};

export default Boton;

const styles = StyleSheet.create({
  boton: {
    borderRadius: 100,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  doubleButton: 
  { width: 144 },
  text: 
  { fontSize: 24 },
});
