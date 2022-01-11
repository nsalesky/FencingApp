import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalTheme } from "../../globalTheme";
import { MainTabParamList } from "./MainTab";

type BrowseProps = NativeStackScreenProps<
  MainTabParamList,
  "BrowseTournaments"
>;

/**
 * Allows the user to browse the available tournaments to look at results or register for a tournament.
 * @param props the screen props
 */
export default function BrowseTournaments(props: BrowseProps) {
  return (
    <SafeAreaView style={globalTheme.centerContainer}>
      <Text>Browse Tournaments</Text>
    </SafeAreaView>
  );
}
