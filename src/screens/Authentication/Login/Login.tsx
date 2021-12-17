import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const isEmailValid = (email: string): boolean => {
//   var re = /\S+@\S+\.\S+/;
//   return re.test(email);
// };

const LoginScreen = (props: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        console.log("Signed in sucessfully");
      })
      .catch((error) => {
        // Failed to sign in
        console.log(error.message);
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
          containerStyle={{ ...styles.button, ...styles.readyButton }}
          onPress={login}
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

  button: {
    width: "50%",
    borderRadius: 20,
  },

  readyButton: {
    backgroundColor: "#363535",
  },

  notReadyButton: {
    backgroundColor: "#737070",
  },
});

export default LoginScreen;
