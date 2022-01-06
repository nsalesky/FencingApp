import React from "react";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../constants/screenNames/Root";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import context from "../../../context/context";
import { gql } from "@apollo/client";

/**
 * The props expected for the account creation screen.
 */
type AccountCreationProps = NativeStackScreenProps<
  RootStackParamList,
  "AccountCreation" //todo: figure out a way to use RootScreens.WELCOME_SCREEN
>;

/**
 * Does the given body of text contain at least one special character?
 * @param text the body of text to analyze
 * @returns whether or not that `text` contains a special character
 */
const containsSpecialCharacter = (text: string): boolean => {
  const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  for (let i = 0; i < text.length; i += 1) {
    if (specialCharacters.includes(text[i])) {
      return true;
    }
  }

  return false;
};

/**
 * Does the given body of text contain at least one number?
 * @param text the body of text to analyze
 * @returns whether or not that `text` contains a number
 */
const containsNumber = (text: string): boolean => {
  const numbers = "1234567890";

  for (let i = 0; i < text.length; i += 1) {
    if (numbers.includes(text[i])) {
      return true;
    }
  }

  return false;
};

const CREATE_USER = gql`
  mutation CreateUser(user: {
    createUser
  }
`;

/**
 * The account creation screen which allows users to set up their login information with an email and password combo.
 * @param props the full name and preferred name that the user previously determined
 * @returns the rendered account creation screen
 */
const AccountCreationScreen = (props: AccountCreationProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const globalState = React.useContext(context);

  const isEmailValid = (): boolean => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isPasswordValid = (): boolean => {
    // Make sure password has at least 8 characters
    if (password.length < 8) {
      return false;
    }

    // Check for special characters and numbers
    return containsSpecialCharacter(password) && containsNumber(password);
  };

  /**
   * Creates the user's login account on Firebase and redirects the user to the home screen if successful.
   */
  const next = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Created account successfully");

        // Set the global email context
        globalState.setEmail(email);

        // TODO: create user account with the fullName and displayName provided in the backend
      })
      .catch((error: any) => {
        Alert.alert("Error creating account: " + error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h4 h4Style={styles.title}>
        Create an Account
      </Text>

      <Input
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={<Icon name="user" size={24} color="black" />}
        containerStyle={styles.inputContainer}
      />

      <Input
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        leftIcon={<Icon name="key" size={24} color="black" />}
        containerStyle={styles.inputContainer}
      />

      <View style={styles.passwordCheckContainer}>
        <Text style={styles.passwordCheck}>
          {password.length >= 8
            ? "At least 8 characters: ✓"
            : "At least 8 characters: X"}
        </Text>

        <Text style={styles.passwordCheck}>
          {containsSpecialCharacter(password)
            ? "Special character: ✓"
            : "Special character: X"}
        </Text>

        <Text style={styles.passwordCheck}>
          {containsNumber(password) ? "Number: ✓" : "Number: X"}
        </Text>
      </View>

      {isPasswordValid() ? (
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

// The account creation style
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

  passwordCheckContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  passwordCheck: {},

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

export default AccountCreationScreen;
