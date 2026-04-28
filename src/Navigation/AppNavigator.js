import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigatorComponent } from "./Navigators";
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomTabNavigatorComponent />
    </NavigationContainer>
  );
}
