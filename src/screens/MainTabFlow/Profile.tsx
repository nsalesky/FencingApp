import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalTheme } from "../../globalTheme";
import { MainTabParamList } from "./MainTab";

type ProfileProps = NativeStackScreenProps<MainTabParamList, "Profile">;

/**
 * The user's profile, allowing them to view and update their basic profile information as well as the app settings.
 * @param props the screen props
 * @returns the rendered profile screen
 */
export default function Profile(props: ProfileProps) {
  return (
    <SafeAreaView style={globalTheme.centerContainer}>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}
