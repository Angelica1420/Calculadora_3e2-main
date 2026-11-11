import { StyleSheet, View } from "react-native";
import Boton from "./Boton";

type RejillaProps = {
  onPress: (texto: string) => void;
  onLongPress?: () => void;
};

const Rejilla = ({ onPress, onLongPress }: RejillaProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.fila}>
        <Boton texto="AC" color="mauve" onPress={() => onPress("AC")} onLongPress={onLongPress} />
        <Boton texto="+/-" color="mauve" onPress={() => onPress("+/-")} />
        <Boton texto="%" color="mauve" onPress={() => onPress("%")} />
        <Boton texto="÷" color="pink" onPress={() => onPress("÷")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="7" onPress={() => onPress("7")} />
        <Boton texto="8" onPress={() => onPress("8")} />
        <Boton texto="9" onPress={() => onPress("9")} />
        <Boton texto="×" color="pink" onPress={() => onPress("×")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="4" onPress={() => onPress("4")} />
        <Boton texto="5" onPress={() => onPress("5")} />
        <Boton texto="6" onPress={() => onPress("6")} />
        <Boton texto="-" color="pink" onPress={() => onPress("-")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="1" onPress={() => onPress("1")} />
        <Boton texto="2" onPress={() => onPress("2")} />
        <Boton texto="3" onPress={() => onPress("3")} />
        <Boton texto="+" color="pink" onPress={() => onPress("+")} />
      </View>
      <View style={styles.fila}>
        <Boton texto="0" onPress={() => onPress("0")} />
        <Boton texto="." onPress={() => onPress(".")} />
        <Boton texto="√" color="mauve" onPress={() => onPress("√")} />
        <Boton texto="=" color="pink" onPress={() => onPress("=")} />
      </View>
    </View>
  );
};

export default Rejilla;

const styles = StyleSheet.create({
     container: { width: "100%",
     paddingHorizontal: 20 },
     fila: { flexDirection: "row", 
     justifyContent: "space-around", 
     marginBottom: 15 },
});
