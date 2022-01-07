import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/Welcome";
import { RootScreens } from "./src/constants/screenNames/Root";
import LoginScreen from "./src/screens/Authentication/Login/Login";
import RegistrationScreen from "./src/screens/Authentication/Registration/Registration";
import initializeFirebase from "./src/firebase/firebase";
import AccountCreationScreen from "./src/screens/Authentication/Registration/AccountCreation";
import HomeScreen from "./src/screens/Home";
import GlobalState from "./src/context/GlobalState";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BACKEND_SERVER_URI } from "@env";
import { getLoginInfo } from "./src/auth";

const Stack = createNativeStackNavigator();

// Basic initializations
initializeFirebase();

// todo: clean this mess up
const httpLink = createHttpLink({
  uri: BACKEND_SERVER_URI,
});
const authLink = setContext(async (_, { headers }) => {
  // const loginInfo = await getLoginInfo();

  // return {
  //   headers: {
  //     ...headers,
  //     authorization: loginInfo ? loginInfo.token : "",
  //   },
  // };

  return getLoginInfo().then((loginInfo) => {
    return {
      headers: {
        ...headers,
        authorization: loginInfo ? loginInfo.token : "",
      },
    };
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: BACKEND_SERVER_URI,
  link: authLink.concat(httpLink),
});

/**
 * The overall app.
 * @returns the rendered app
 */
export default function App() {
  return (
    <GlobalState>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={RootScreens.WELCOME}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name={RootScreens.WELCOME}
                component={WelcomeScreen}
              />

              <Stack.Screen name={RootScreens.LOGIN} component={LoginScreen} />

              <Stack.Screen
                name={RootScreens.REGISTER}
                component={RegistrationScreen}
              />

              <Stack.Screen
                name={RootScreens.ACCOUNT_CREATION}
                component={AccountCreationScreen}
              />

              <Stack.Screen name={RootScreens.HOME} component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </GlobalState>
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
