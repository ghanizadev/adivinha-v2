import React from "react";
import { View, Text, Button } from "native-base";
import { Modal, TouchableOpacity } from "react-native";

import styles from "./styles";

export interface PlayerInfo {
  name: string;
  color: string;
  points: number;
}

const Player: React.FC<{
  player: PlayerInfo;
  selected: boolean;
  onPress: (player: PlayerInfo) => void;
}> = (props) => {
  const { player, onPress, selected } = props;
  return (
    <TouchableOpacity
      key={player.name}
      onPress={() => {
        onPress(player);
      }}
      style={{
        ...styles.player,
        backgroundColor: selected ? player.color : "gray"
      }}
    >
      <>
        <Text style={{
          ...styles.playerName,
          color: selected ? "#fff" : "lightgray"
        }}>{player.name}</Text>
        <Text style={{
          ...styles.playerPoints,
          color: selected ? "#fff" : "lightgray"
        }}>{player.points}</Text>
      </>
    </TouchableOpacity>
  );
};

type Props = {
  players: PlayerInfo[];
  actualPlayer: PlayerInfo;
};

const ComputePoints: React.FC<Props> = (props) => {
  const { players, actualPlayer } = props;
  const [visible, setVisible] = React.useState(true);
  const [selected, setSelected] = React.useState<PlayerInfo[]>([]);

  const handleClick = () => {
    setVisible(false);
  };

  const handleSelect = (player: PlayerInfo) => {
    if (selected.includes(player)) {
      setSelected(selected.filter((p) => p !== player));
    } else {
      setSelected([...selected, player]);
    }
  };

  return (
    <Modal transparent animationType={"slide"} visible={visible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Fim da rodada</Text>
          <View style={styles.pointsHolder}>
            <Text style={styles.points}>9999</Text>
            <Text style={styles.pointsSmall}>pontos</Text>
          </View>

          <Text style={styles.title}>Quem acertou?</Text>
          <View style={styles.players}>
            {players.map((player) => {
              if (player === actualPlayer) return;
              return (
                <Player
                  key={player.name}
                  player={player}
                  selected={selected.includes(player)}
                  onPress={handleSelect}
                />
              );
            })}
          </View>
          <Button block dark onPress={handleClick}>
            <Text>Continuar</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ComputePoints;
