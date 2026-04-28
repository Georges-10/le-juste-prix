import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import AppNavigator from "./src/Navigation/AppNavigator";
import resultsReducer from "./src/stores/reducers/resultReducer";
import settingsReducer from "./src/stores/reducers/settingsReducer";

const rootReducer = combineReducers({
  settings: settingsReducer,
  history: resultsReducer,
});
const store = createStore(rootReducer);

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
