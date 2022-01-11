import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../constants/screenNames/Root";
import context from "../../context/context";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalTheme } from "../../globalTheme";
import { MainTabParamList } from "./MainTab";

type DashboardProps = NativeStackScreenProps<MainTabParamList, "Dashboard">;

const GET_USER = gql`
  query {
    currentUser {
      prefName
    }
  }
`;

interface UserData {
  currentUser: {
    prefName: string;
  };
}

/**
 * The user's dashboard screen, showing the upcoming tournaments they're registered for and other useful information.
 * @param props the screen props
 * @returns the rendered dashboard screen
 */
export default function Dashboard(props: DashboardProps) {
  const globalState = React.useContext(context);

  const { loading, error, data } = useQuery<UserData>(GET_USER);

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={globalTheme.centerContainer}>
      <Text>{data ? data.currentUser.prefName : "Data is null"}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
