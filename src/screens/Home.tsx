import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../constants/screenNames/Root";
import context from "../context/context";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * The props expected for the home screen.
 */
type HomeProps = NativeStackScreenProps<
  RootStackParamList,
  "Home" //todo: figure out a way to use RootScreens.HOME
>;

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

const HomeScreen = (props: HomeProps) => {
  const globalState = React.useContext(context);

  const { loading, error, data } = useQuery<UserData>(GET_USER);

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView>
      <Text>{data ? data.currentUser.prefName : "Data is null"}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
