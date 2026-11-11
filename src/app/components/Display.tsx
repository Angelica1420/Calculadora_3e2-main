import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

type DisplayProps = {
  operacion: string;
  valor: string;
  historial: string[];
  borrarHistorial: () => void;
};

const Display = ({ operacion, valor, historial, borrarHistorial }: DisplayProps) => {
  return (
    <View style={styles.display}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Historial</Text>
        <Pressable onPress={borrarHistorial} accessibilityRole="button" accessibilityLabel="Borrar historial">
          <Text style={styles.clearHistory}>Borrar historial</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.historyBox} contentContainerStyle={styles.historyContent} nestedScrollEnabled>
        {historial.length === 0 ? (
          <Text style={styles.emptyHistory}>Todavía no hay operaciones</Text>
        ) : historial.map((item, i) => (
          <Text key={`${i}-${item}`} style={styles.historyItem}>{item}</Text>
        ))}
      </ScrollView>
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>{operacion}</Text>
      <Text style={styles.preview} numberOfLines={1} adjustsFontSizeToFit>{valor}</Text>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  display: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 5,
    flex: 1,
    justifyContent: "flex-end",
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  historyTitle: { color: "#b9acba", fontSize: 14 },
  clearHistory: { color: "#b9acba", fontSize: 12, textDecorationLine: "underline" },
  historyBox: { flexGrow: 0, height: 75, marginBottom: 12 },
  historyContent: { justifyContent: "flex-start" },
  historyItem: { color: "#999999", fontSize: 13, textAlign: "right", marginBottom: 4 },
  emptyHistory: { color: "#666666", fontSize: 12, textAlign: "right" },
  result: { color: "white", fontSize: 48, textAlign: "right" },
  preview: { color: "#999999", fontSize: 28, textAlign: "right", minHeight: 38, marginTop: 5 },
});
