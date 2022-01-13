import { gql, useQuery } from "@apollo/client";
import React from "react";
import context from "../../context/context";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalTheme } from "../../globalTheme";
import { MainTabParamList } from "./MainTab";
import { Button, Text } from "react-native-elements";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import dateFormat from "dateformat";

type DashboardProps = BottomTabScreenProps<MainTabParamList, "Dashboard">;

const GET_USER = gql`
  query {
    currentUser {
      id
      prefName
      registeredTournaments {
        id
        name
        location
        time
      }
      managedTournaments {
        id
        name
        location
        time
      }
    }
  }
`;

/**
 * The shape of the data queried by the `GET_USER` query.
 */
interface UserData {
  currentUser: {
    prefName: string;
    registeredTournaments: [
      {
        id: string;
        name: string;
        location: string;
        time: string;
      }
    ];
    managedTournaments: [
      {
        id: string;
        name: string;
        location: string;
        time: string;
      }
    ];
  };
}

/**
 * The data for a single tournament.
 */
interface TournamentData {
  id: string;
  name: string;
  location: string;
  time: string;
}

/**
 * Displays the basic info for a tournament and links the user to more information when pressed.
 * @param props the basic tournament information
 * @returns the rendered tournament object
 */
function Tournament(props: {
  id: string;
  name: string;
  location: string;
  time: string;
}) {
  const navigation = useNavigation<DashboardProps>();

  const dateString = dateFormat(props.time, "mmm dS, yyyy, h:MM TT");

  return (
    <TouchableOpacity>
      <View style={styles.tournamentContainer}>
        <Text h4>{props.name}</Text>
        <View style={styles.tournamentInfo}>
          <Text>
            At {props.location} on {dateString}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/**
 * The user's dashboard screen, showing the upcoming tournaments they're registered for and other useful information.
 * @param props the screen props
 * @returns the rendered dashboard screen
 */
export default function Dashboard({ route, navigation }: DashboardProps) {
  const globalState = React.useContext(context);

  const [prefName, setPrefName] = React.useState("");
  const [registered, setRegistered] = React.useState<TournamentData[]>([]);
  const [managed, setManaged] = React.useState<TournamentData[]>([]);

  const { loading, error, data } = useQuery<UserData>(GET_USER);

  React.useEffect(() => {
    if (data) {
      setPrefName(data.currentUser.prefName);
      setRegistered(data.currentUser.managedTournaments);
      setManaged(data.currentUser.managedTournaments);
    }
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={globalTheme.centerContainer}>
      <View style={styles.container}>
        <Text h1>Hi {prefName}</Text>

        <Text h4 h4Style={{ ...styles.centerLabel, ...styles.upcomingLabel }}>
          Upcoming tournaments you're registered for...
        </Text>

        <ScrollView style={styles.upcomingScroll}>
          {registered.map(({ id, name, location, time }) => (
            <Tournament
              key={id}
              id={id}
              name={name}
              location={location}
              time={time}
            />
          ))}
        </ScrollView>

        <Text h4 h4Style={{ ...styles.centerLabel, ...styles.managingLabel }}>
          Tournaments you're managing...
        </Text>

        <ScrollView style={styles.managingScroll}>
          {managed.map(({ id, name, location, time }) => (
            <Tournament
              key={id}
              id={id}
              name={name}
              location={location}
              time={time}
            />
          ))}
        </ScrollView>

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

  tournamentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },

  tournamentInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
