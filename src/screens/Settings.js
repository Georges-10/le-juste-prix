import { Label } from "@react-navigation/elements";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../Constants/Colors";
import { updateNumbersIntervalAction } from "../stores/actions/settingsAction";
export default function Settings() {
  const interval = useSelector((state) => state.settings.interval);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      start: String(interval.start ?? 0),
      end: String(interval.end ?? 1000),
    },
    resolver: (data) => {
      const newStart = parseInt(data.start);
      const newEnd = parseInt(data.end);
      const errors = {};
      if (isNaN(newStart)) {
        errors.start = {
          type: "invalid",
          message:
            "Veuillez entrer un nombre valide pour le prix minimum",
        };
      }
      if (isNaN(newEnd)) {
        errors.end = {
          type: "invalid",
          message:
            "Veuillez entrer un nombre valide pour le prix maximum",
        };
      } else if (newStart < 0 || newEnd > 1000) {
        errors.start = {
          type: "outOfRange",
          message: "Le prix minimum doit être >= 0",
        };
        errors.end = {
          type: "outOfRange",
          message: "Le prix maximum doit être <= 1000",
        };
      }
      return { values: data, errors };
    },
  });

  const dispatch = useDispatch();

  const sumbitHandler = (data) => {
    /*  const newStart = parseInt(data.start);
    const newEnd = parseInt(data.end);
    if (isNaN(newStart) || isNaN(newEnd)) {
      Alert.alert("Erreur", "Veuillez entrer des nombres valides");
      return;
    } else if (newStart < 0 || newEnd > 1000) {
      Alert.alert(
        "Erreur",
        "Veuillez respecter les limites (0 <= start <= end <= 1000)",
      );
      return;
    } */
    console.log(data);
    dispatch(
      updateNumbersIntervalAction(
        Number(data.start),
        Number(data.end),
      ),
    );
    Alert.alert("Succès", "Intervalle mis à jour");
    Keyboard.dismiss();
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
          <Text style={styles.title}>Paremètres</Text>
          <View style={styles.formContainer}>
            <View>
              <Label
                style={styles.label}
              >{`Prix minimum >= 0`}</Label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(val) => onChange(val)}
                    //autoCapitalize="words"
                    //autoCorrect={false}
                    //autoFocus={true}
                    //autoComplete="tel"
                    //keyboardAppearance="dark"
                    keyboardType="number-pad"
                    //maxLength={30}
                    //multiline={true}
                  />
                )}
                name="start"
              />
              {errors.start && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {errors.start.message}
                </Text>
              )}
            </View>
            <View>
              <Label
                style={styles.label}
              >{`prix maximum <= 1000`}</Label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(val) => onChange(val)}
                    //autoCapitalize="words"
                    //autoCorrect={false}
                    //autoFocus={true}
                    //autoComplete="tel"
                    //keyboardAppearance="dark"
                    keyboardType="number-pad"
                    //maxLength={30}
                    //multiline={true}
                  />
                )}
                name="end"
              />
              {errors.end && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {errors.end.message}
                </Text>
              )}
            </View>
          </View>
          <Pressable
            onPress={handleSubmit(sumbitHandler)}
            style={styles.button}
          >
            <Text style={{ color: COLORS.quaternary }}>
              Sauvegarder
            </Text>
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.primary,
    marginBottom: 32,
  },
  formContainer: {
    backgroundColor: COLORS.terciary,
    borderRadius: 8,
    paddingVertical: 38,
    paddingHorizontal: 32,
    alignContent: "center",
    alignItems: "center",
    gap: 32,
    marginBottom: 16,
    width: Dimensions.get("window").width * 0.8,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: COLORS.quaternary,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    paddingVertical: 16,
    borderRadius: 8,
  },
  label: {
    color: COLORS.quaternary,
    alignSelf: "flex-start",
    marginBottom: 8,
    fontWeight: "semibold",
  },
});
