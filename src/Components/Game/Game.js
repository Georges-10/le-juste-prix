// eslint-disable-next-line import/no-unresolved
import { FontAwesome5 } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../../Constants/Colors";
export default function Game(props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: "",
    },
    resolver: (data) => {
      const guess = parseInt(data.number);
      const errors = {};
      if (isNaN(guess)) {
        errors.number = {
          type: "invalid",
          message: "Veuillez entrer un nombre valide",
        };
      }
      return { values: data, errors };
    },
  });

  const onSubmit = (data) => {
    props.onGuess(data.number);
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.indice}>
        <Text
          style={{ fontWeight: "bold", color: COLORS.quaternary }}
        >
          #{props.try}
        </Text>
        <Text style={{ color: COLORS.quaternary }}>{props.mess}</Text>
      </View>
      <View>
        <Controller
          control={control}
          name="number"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => onChange(text)}
                //autoCapitalize="words"
                //autoCorrect={false}
                //autoFocus={true}
                //autoComplete="tel"
                //keyboardAppearance="dark"
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                //maxLength={30}
                //multiline={true}
              />
              <Pressable
                style={{
                  position: "absolute",
                  right: 12,
                  top: 18,
                }}
                onPress={handleSubmit(onSubmit)}
              >
                <FontAwesome5
                  name="arrow-right"
                  size={24}
                  color={COLORS.secondary}
                />
              </Pressable>
            </>
          )}
        />
        {errors.number && (
          <Text style={{ color: "red", marginTop: 4 }}>
            {errors.number.message}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  indice: {
    backgroundColor: COLORS.terciary,
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 12,
  },
  input: {
    width: 150,
    height: 60,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 4,
    borderRadius: 10,
    paddingHorizontal: 12,
    textAlign: "left",
    fontSize: 16,
    backgroundColor: COLORS.quaternary,
    //position: "relative",
  },
});
