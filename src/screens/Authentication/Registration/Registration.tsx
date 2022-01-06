import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from "../../../constants/screenNames/Root";

/**
 * The props expected for the registration screen.
 */
type RegistrationProps = NativeStackScreenProps<
  RootStackParamList,
  "Register" //todo: figure out a way to use RootScreens.WELCOME_SCREEN
>;

/**
 * The registration screen which allows users to enter their user information and then
 * proceed to create an account.
 * @param props the props expected to register
 * @returns the rendered registration screen
 */
const RegistrationScreen = (props: RegistrationProps) => {
  const [fullName, setFullName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const next = () => {
    props.navigation.navigate("AccountCreation", {
      fullName,
      displayName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h4 h4Style={styles.title}>
        Registration
      </Text>

      <Input
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        leftIcon={<Icon name="user" size={24} color="black" />}
        containerStyle={styles.inputContainer}
      />

      <Text style={styles.subtext}>
        (e.g.,{" "}
        <Text style={{ ...styles.subtext, fontStyle: "italic" }}>
          Robert Jones, Elizabeth Johnson
        </Text>
        )
      </Text>

      <Input
        placeholder="Preferred Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        leftIcon={<Icon name="user" size={24} color="black" />}
        containerStyle={styles.inputContainer}
      />

      <Text style={styles.subtext}>
        (e.g.,{" "}
        <Text style={{ ...styles.subtext, fontStyle: "italic" }}>
          Bob Jones, Liz Johnson
        </Text>
        )
      </Text>

      {fullName.length > 0 && displayName.length > 0 ? (
        <Button
          title="Next"
          containerStyle={{ ...styles.button, ...styles.readyButton }}
          onPress={next}
        />
      ) : (
        <Button
          title="Next"
          containerStyle={{ ...styles.button, ...styles.notReadyButton }}
          disabled
        />
      )}
    </SafeAreaView>
  );
};

// Registration screen styling
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    marginTop: "50%",
    marginBottom: 30,
  },

  inputContainer: {
    marginTop: 10,
  },

  subtext: {
    marginTop: -25,
    marginBottom: 15,
  },

  button: {
    width: "50%",
    borderRadius: 20,
  },

  readyButton: {
    backgroundColor: "#363535",
    marginTop: 20,
  },

  notReadyButton: {
    backgroundColor: "#737070",
    marginTop: 20,
  },
});

export default RegistrationScreen;
