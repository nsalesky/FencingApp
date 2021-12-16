import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList, RootScreens } from "../constants/screenNames/Root";

// interface WelcomeProps {
// 	navigation: NavigationType
// };

type WelcomeProps = NativeStackScreenProps<
  RootStackParamList,
  "Welcome" //todo: figure out a way to use RootScreens.WELCOME_SCREEN
>;

const WelcomeScreen = (props: WelcomeProps) => {
  return (
    <SafeAreaView style={styles.containerStyle}>
      <Text h4 style={styles.titleText}>
        Welcome to Fencing
      </Text>

      <Button
        title="Login"
        type="solid"
        containerStyle={{
          ...styles.buttonContainer,
          ...styles.loginContainer,
        }}
        onPress={() => props.navigation.navigate("Login")}
      />

      <Button
        title="Register"
        type="solid"
        containerStyle={{
          ...styles.buttonContainer,
          ...styles.registerContainer,
        }}
        onPress={() => props.navigation.navigate("Register")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  titleText: {
    marginTop: "70%",
  },

  buttonContainer: {
    backgroundColor: "black",
    width: "50%",
  },

  loginContainer: {
    marginTop: 50,
  },

  registerContainer: {
    marginTop: 20,
  },
});

export default WelcomeScreen;
