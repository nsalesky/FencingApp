import React from "react";
import { Alert, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../constants/screenNames/Root";
import context from "../../../context/context";
import { getLoginInfo, logInUser } from "../../../auth";
import { globalTheme } from "../../../globalTheme";

/**
 * The props expected for the Login screen.
 */
type LoginProps = NativeStackScreenProps<
  RootStackParamList,
  "Login" //todo: figure out a way to use RootScreens.LOGIN_SCREEN
>;

/**
 * The Login screen which allows a user to enter their email and password to login with their account.
 * @param props the props expected for the login screen
 * @returns the rendered login screen
 */
const LoginScreen = (props: LoginProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const globalState = React.useContext(context);

  const login = () => {
    const auth = getAuth();

    // Attempt to sign in
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        globalState.setEmail(email);

        // Generate a new token and store it for later
        await logInUser(email);

        props.navigation.navigate("Home");
      })
      .catch((error: any) => {
        Alert.alert(`Error logging in: ${error}`);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h4 h4Style={styles.title}>
        Login
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

      {email.length > 0 && password.length > 0 ? (
        <Button
          title="Next"
          containerStyle={{ ...globalTheme.wideButton, ...globalTheme.ready }}
          onPress={login}
        />
      ) : (
        <Button
          title="Next"
          containerStyle={{
            ...globalTheme.wideButton,
            ...globalTheme.notReady,
          }}
          disabled
        />
      )}
    </SafeAreaView>
  );
};

// The login screen styling
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
});

export default LoginScreen;
