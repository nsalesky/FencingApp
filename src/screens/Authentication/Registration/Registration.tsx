import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from "../../../constants/screenNames/Root";
import { globalTheme } from "../../../globalTheme";

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
  const [prefName, setPrefName] = React.useState("");

  const next = () => {
    props.navigation.navigate("AccountCreation", {
      fullName,
      prefName,
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
        value={prefName}
        onChangeText={setPrefName}
        leftIcon={<Icon name="user" size={24} color="black" />}
        containerStyle={styles.inputContainer}
      />

      <Text style={styles.subtext}>
        (e.g.,{" "}
        <Text style={{ ...styles.subtext, fontStyle: "italic" }}>Bob, Liz</Text>
        )
      </Text>

      {fullName.length > 0 && prefName.length > 0 ? (
        <Button
          title="Next"
          containerStyle={{
            ...globalTheme.wideButton,
            ...globalTheme.ready,
            ...styles.nextButton,
          }}
          onPress={next}
        />
      ) : (
        <Button
          title="Next"
          containerStyle={{
            ...globalTheme.wideButton,
            ...globalTheme.notReady,
            ...styles.nextButton,
          }}
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

  nextButton: {
    marginTop: 20,
  },
});

export default RegistrationScreen;
