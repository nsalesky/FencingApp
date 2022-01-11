import { gql, useQuery } from "@apollo/client";
import React from "react";
import context from "../../context/context";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalTheme } from "../../globalTheme";
import { MainTabParamList } from "./MainTab";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text } from "react-native-elements";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type DashboardProps = BottomTabScreenProps<MainTabParamList, "Dashboard">;

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
export default function Dashboard({ route, navigation }: DashboardProps) {
  const globalState = React.useContext(context);

  const { loading, error, data } = useQuery<UserData>(GET_USER);

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={globalTheme.centerContainer}>
      <View style={styles.container}>
        <Text h1>Hi {data?.currentUser.prefName}</Text>

        <Text h4 h4Style={{ ...styles.centerLabel, ...styles.upcomingLabel }}>
          Upcoming tournaments you've registered for...
        </Text>

        <ScrollView style={styles.upcomingScroll}></ScrollView>

        <Text h4 h4Style={{ ...styles.centerLabel, ...styles.managingLabel }}>
          Tournaments you're managing...
        </Text>

        <ScrollView style={styles.managingScroll}></ScrollView>

        <Button
          title="Create a new tournament"
          containerStyle={{ ...globalTheme.wideButton, ...styles.createButton }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  centerLabel: {
    textAlign: "center",
  },

  upcomingLabel: {
    marginTop: 20,
  },

  upcomingScroll: {
    backgroundColor: "#dedede",
    width: "100%",
    height: "40%",
  },

  managingLabel: {
    marginTop: 10,
  },

  managingScroll: {
    backgroundColor: "#dedede",
    width: "100%",
    height: "25%",
  },

  createButton: {
    width: "80%",
    marginTop: 10,
  },
});
