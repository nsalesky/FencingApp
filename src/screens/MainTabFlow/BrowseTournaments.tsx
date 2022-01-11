import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalTheme } from "../../globalTheme";
import { MainTabParamList } from "./MainTab";
import Icon from "react-native-vector-icons/FontAwesome";

type BrowseProps = BottomTabScreenProps<MainTabParamList, "BrowseTournaments">;

function PrivateTournamentSearch() {
  const navigation = useNavigation<BrowseProps>();

  const [code, setCode] = React.useState("");

  return (
    <View style={styles.privateContainer}>
      <Input
        placeholder="Enter a private tournament code"
        value={code}
        onChangeText={setCode}
        leftIcon={<Icon name="key" size={24} color="black" />}
      />

      <Button
        title="Next"
        disabled={code.length === 0}
        containerStyle={
          code.length > 0
            ? { ...globalTheme.wideButton, ...globalTheme.ready }
            : { ...globalTheme.wideButton, ...globalTheme.notReady }
        }
      />
    </View>
  );
}

/**
 * Allows the user to browse the available tournaments to look at results or register for a tournament.
 * @param props the screen props
 */
export default function BrowseTournaments({ route, navigation }: BrowseProps) {
  return (
    <SafeAreaView style={globalTheme.centerContainer}>
      <Text h1 style={styles.greeting}>
        Browse Tournaments
      </Text>

      <PrivateTournamentSearch />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    textAlign: "center",
  },

  privateContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
