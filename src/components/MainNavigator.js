import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import LoginScreen from "./LoginScreen";
import ChecklistsScreen from "./ChecklistsScreen";
import ProfileScreen from "./ProfileScreen";
import TaskScreen from "./TaskScreen";

const MainNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    ChecklistsScreen: { screen: ChecklistsScreen },
    TaskScreen: { screen: TaskScreen }
  },
  {
    initialRouteName: "ChecklistsScreen"
  }
);

export default MainNavigator;
