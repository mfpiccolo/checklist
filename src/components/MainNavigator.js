import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import LoginScreen from "./LoginScreen";
import ChecklistsScreen from "./ChecklistsScreen";
import ProfileScreen from "./ProfileScreen";
import ChecklistScreen from "./ChecklistScreen";

const MainNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    ChecklistsScreen: { screen: ChecklistsScreen },
    ChecklistScreen: { screen: ChecklistScreen }
  },
  {
    initialRouteName: "ChecklistsScreen"
  }
);

export default MainNavigator;
