import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../Constants/Colors";
import History from "../screens/History";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

export function BottomTabNavigatorComponent() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.terciary,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Jouer") {
            iconName = focused
              ? "game-controller"
              : "game-controller-outline";
          } else if (route.name === "history") {
            iconName = focused ? "beer" : "beer-outline";
          } else if (route.name === "settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Jouer"
        component={Home}
        options={{
          headerShown: false,
          title: "Jouer",
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          headerShown: false,
          title: "Historique",
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          headerShown: false,
          title: "Paramètres",
        }}
      />
    </Tab.Navigator>
  );
}
