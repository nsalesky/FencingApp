import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/Welcome";
import ScreenNames from "./src/constants/ScreenNames";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ScreenNames.WELCOME_SCREEN}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name={ScreenNames.WELCOME_SCREEN}
            component={WelcomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
