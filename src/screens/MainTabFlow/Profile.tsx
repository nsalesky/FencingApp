import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { logOutUser } from "../../auth";
import { RootStackParamList } from "../../constants/screenNames/Root";
import context from "../../context/context";
import { globalTheme } from "../../globalTheme";
import { MainTabParamList } from "./MainTab";

// type ProfileProps = NativeStackScreenProps<MainTabParamList, "Profile">;
type ProfileProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList>
>;

const GET_USER = gql`
  query {
    currentUser {
      email
      fullName
      prefName
    }
  }
`;
interface ProfileData {
  currentUser: {
    fullName: string;
    prefName: string;
  };
}

/**
 * The user's profile, allowing them to view and update their basic profile information as well as the app settings.
 * @param props the screen props
 * @returns the rendered profile screen
 */
export default function Profile({ route, navigation }: ProfileProps) {
  const globalState = React.useContext(context);

  const [fullName, setFullName] = React.useState("");
  const [prefName, setPrefName] = React.useState("");
  const { data, error, loading } = useQuery<ProfileData>(GET_USER);

  // if (loading) {
  //   return <Text>Loading</Text>;
  // }

  useEffect(() => {
    if (error) {
      Alert.alert(error.message);
    }

    if (data) {
      setFullName(data.currentUser.fullName);
      setPrefName(data.currentUser.prefName);
    }
  }, [error, data]);

  /**
   * Logs out the current user and redirects them back to the Welcome screen.
   */
  const logout = async () => {
    await logOutUser();

    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView style={globalTheme.centerContainer}>
      {/* <Input value={fullName} onChangeText={setFullName} />

      <Input value={prefName} onChangeText={setPrefName} /> */}

      <Button
        containerStyle={{ ...globalTheme.wideButton, ...styles.logoutButton }}
        title="Logout"
        onPress={logout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 600,
  },
});
