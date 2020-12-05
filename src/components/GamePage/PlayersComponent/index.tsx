import { Text, View } from "native-base";
import React from "react";
import styles from "./styles";

export interface PlayerInfo {
  name: string;
  color: string;
  points: number;
}

type Props = {
  players: PlayerInfo[];
};

const Players: React.FC<Props> = (props) => {
  const { players } = props;
  return (
    <View style={styles.players}>
      {players.map((player) => {
        return (
          <View key={player.name} style={{...styles.playerContainer, backgroundColor: player.color}}>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerPoints}>{player.points}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Players;
