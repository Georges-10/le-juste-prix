import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { COLORS } from "../Constants/Colors";

export default function History() {
  const history = useSelector((state) => state.history.results);
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={styles.title}>Historique</Text>

        <ScrollView
          contentContainerStyle={
            history ? styles.containerTop : styles.container
          }
        >
          {!history ? (
            <Text
              style={{
                textAlign: "center",
                color: COLORS.terciary,
                fontSize: 18,
              }}
            >
              Jouez votre première partie pour consulter votre
              historique
            </Text>
          ) : (
            history.map((result, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: COLORS.terciary,
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontWeight: "bold",
                  }}
                >
                  Partie du{" "}
                  {new Date(result.date).toLocaleDateString()} à{" "}
                  {new Date(result.date).toLocaleTimeString()}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  <Text style={{ color: COLORS.quaternary }}>
                    {`Nombre à deviner: `}
                    <Text style={{ fontWeight: "bold" }}>
                      {result.numberToGuess}
                    </Text>
                  </Text>
                  <Text style={{ color: COLORS.quaternary }}>
                    {`sur l'interval: `}
                    <Text style={{ fontWeight: "bold" }}>
                      {`[${result.interval.start}, ${result.interval.end}]`}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  <Text style={{ color: COLORS.quaternary }}>
                    {`Nombre d'essais: `}
                    <Text style={{ fontWeight: "bold" }}>
                      {result.essais}
                    </Text>
                  </Text>
                  <Text style={{ color: COLORS.quaternary }}>
                    Nom du joueur :{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {result.name}
                    </Text>
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  containerTop: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    color: COLORS.primary,
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
