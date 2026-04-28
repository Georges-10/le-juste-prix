import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Game from "../Components/Game/Game";
import ModalEndGame from "../Components/Game/Modal";
import { COLORS } from "../Constants/Colors";
import { addResultAction } from "../stores/actions/resultAction";
export default function Home() {
  const [inGame, setInGame] = useState(false);
  const [tryNumber, setTryNumber] = useState(1);
  const [message, setMessage] = useState("quel est le juste prix ?");
  const interval = useSelector((state) => state.settings.interval);
  const [numberToGuess, setNumberToGuess] = useState(
    Math.floor(Math.random() * (interval.end - interval.start + 1)) +
      interval.start,
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("Joueur Inconnu");
  const dispatch = useDispatch();

  useEffect(() => {
    setNumberToGuess(
      Math.floor(
        Math.random() * (interval.end - interval.start + 1),
      ) + interval.start,
    );
    setInGame(false);
    setTryNumber(1);
    setMessage("quel est le juste prix ?");
  }, [interval]);

  const onGuess = (number) => {
    const guess = parseInt(number);
    if (guess < numberToGuess) {
      setMessage("C'est plus !");
    } else if (guess > numberToGuess) {
      setMessage("C'est moins !");
    } else {
      Alert.alert(
        "Félicitations !",
        `Vous avez trouvé le juste prix en ${tryNumber} essais.`,
      );
      setIsGameOver(true);
      return;
    }
    setTryNumber(tryNumber + 1);
  };

  const dispatchResult = (name) => {
    setInGame(false);
    setTryNumber(1);
    setNumberToGuess(
      Math.floor(
        Math.random() * (interval.end - interval.start + 1),
      ) + interval.start,
    );
    setMessage("quel est le juste prix ?");
    setIsGameOver(false);
    dispatch(
      addResultAction(
        tryNumber,
        interval,
        numberToGuess,
        new Date().toISOString(),
        name,
      ),
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ModalEndGame visible={isGameOver}>
            <Text>Entrez votre nom</Text>

            <TextInput
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Nom du joueur"
              style={{
                borderWidth: 1,
                marginTop: 10,
                padding: 8,
                width: "80%",
                borderRadius: 8,
              }}
            />

            <Pressable
              onPress={() => dispatchResult(playerName)}
              style={{
                marginTop: 15,
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Valider
              </Text>
            </Pressable>
          </ModalEndGame>
          <Text
            style={{
              marginTop: -22,
              marginBottom: 40,
              fontWeight: "heavy",
              fontSize: 16,
            }}
          >
            Retrouver le juste prix entre
            <Text style={styles.numberInterval}>
              {" "}
              {interval.start}
            </Text>{" "}
            et
            <Text style={styles.numberInterval}> {interval.end}</Text>
          </Text>
          {inGame ? (
            <Game
              try={tryNumber}
              mess={message}
              onGuess={onGuess}
            />
          ) : (
            <Pressable
              onPress={() => setInGame(true)}
              style={styles.button}
            >
              <Text style={{ color: COLORS.quaternary }}>
                Commencer
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  numberInterval: {
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  logo: {
    width: 250,
    height: 250,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    paddingVertical: 16,
    borderRadius: 8,
  },
});
