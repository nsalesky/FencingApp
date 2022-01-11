import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "./Dashboard";
import BrowseTournaments from "./BrowseTournaments";
import Profile from "./Profile";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

/**
 * The route parameters expected for each of the tabs in the main flow.
 */
export type MainTabParamList = {
  Dashboard: undefined;
  BrowseTournaments: undefined;
  Profile: undefined;
};

/**
 * The main flow for a logged-in User that contains all the tabs that they are able to visit.
 * @returns the rendered main tab view
 */
export default function MainTabFlow() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="BrowseTournaments"
        component={BrowseTournaments}
        options={{
          tabBarLabel: "Browse",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="search" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="user" size={size} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
