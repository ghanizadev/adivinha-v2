import React from "react";
import { View, Picker, Text, Icon, Button } from "native-base";
import styles from "./styles";
import { Alert, TouchableOpacity } from "react-native";
import AddPlayer from "./AddPlayer";
import {actions} from "../../redux/store";
import { useDispatch } from "react-redux";

import lists from "../../assets/text/lists.json";
import PlayerProps from "../../App/interface/IPlayerProps";

const Player: React.FC<{
  player: PlayerProps;
  onRemove: (player: PlayerProps) => void;
}> = (props) => {
  const { player, onRemove } = props;

  const handleRemove = () => {
    onRemove(player);
  };

  return (
    <View style={styles.playerHolder}>
      <Text style={{ ...styles.playerName, color: player.color }}>
        {player.name}
      </Text>
      <TouchableOpacity
        onPress={handleRemove}
        style={styles.playerRemoveButton}
      >
        <Icon
          name="md-remove-circle-outline"
          style={{ color: "red" }}
          type={"Ionicons"}
        />
      </TouchableOpacity>
    </View>
  );
};

const NewGamePage : React.FC<{navigation ?: any}> = (props) => {
  const [players, setPlayers] = React.useState<PlayerProps[]>([
    {name: "Jogador 1", points: 0, skips: 5, color: "#ff0077", id: Math.trunc(Math.random() * 10000).toString()},
    {name: "Jogador 2", points: 0, skips: 5, color: "#561577", id: Math.trunc(Math.random() * 10000).toString()},
  ]);
  const [maxScore, setMaxScore] = React.useState("250");
  const [maxTime, setMaxTime] = React.useState("90");
  const [list, setList] = React.useState("geral");
  const [addPlayer, setAddPLayer] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpenAddPlayer = () => {
    setAddPLayer(true);
  };

  const handleCloseAddPlayer = () => {
    setAddPLayer(false);
  };

  const handleSubmitAddPlayer = (player: PlayerProps) => {
    setPlayers([...players, player]);
  };

  const handlePlayerRemove = (player: PlayerProps) => {
    setPlayers(players.filter((p) => p !== player));
  };

  const handleListChange = (item: string) => {
    setList(item);
  };

  const handleMaxTimeChange = (item: string) => {
    setMaxTime(item);
  };

  const handleMaxScoreChange = (item: string) => {
    console.log(item);

    setMaxScore(item);
  };

  const checkStart = players.length >= 2 && !!list && !!maxTime && !!maxScore;

  const handleStartMatch = () => {
    dispatch(actions.setPlayers(players));
    dispatch(actions.setMaxTime(maxTime));
    dispatch(actions.setMaxScore(maxScore))

    dispatch(actions.updateGame({
      players,
      maxTime,
      maxScore,
      words: lists.find(l => l.id === list)!.words.split("\n"),
    }))
    
    props.navigation.navigate("Game");
  };

  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.title}>NOVA PARTIDA</Text>
        <Text>Lista de palavras:</Text>
        <Picker
          mode="dropdown"
          placeholder="Selecione..."
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#333"
          style={{ width: undefined }}
          selectedValue={list}
          onValueChange={handleListChange}
        >
          <Picker.Item label="Geral" value="geral" />
          <Picker.Item label="Impossivel" value="impossivel" />
          <Picker.Item label="Animais" value="animais" />
          <Picker.Item label="Paises" value="paises" />
          <Picker.Item label="Desenhos Animados" value="desenhos" />
          <Picker.Item label="Musicas Populares" value="musicas" />
          <Picker.Item label="Infantil" value="infantil" />
          <Picker.Item label="Profissoes" value="profissoes" />
        </Picker>

        <Text>Duracao:</Text>
        <Picker
          mode="dropdown"
          placeholder="Selecione..."
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#333"
          style={{ width: undefined }}
          selectedValue={maxTime}
          onValueChange={handleMaxTimeChange}
        >
          <Picker.Item label="0m 30s" value="30" />
          <Picker.Item label="1m 00s" value="60" />
          <Picker.Item label="1m 30s" value="90" />
          <Picker.Item label="2m 00s" value="120" />
          <Picker.Item label="2m 30s" value="150" />
        </Picker>

        <Text>Pontos:</Text>
        <Picker
          mode="dropdown"
          placeholder="Selecione..."
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#333"
          style={{ width: undefined }}
          selectedValue={maxScore}
          onValueChange={handleMaxScoreChange}
        >
          <Picker.Item label="100" value="100" />
          <Picker.Item label="150" value="150" />
          <Picker.Item label="200" value="200" />
          <Picker.Item label="250" value="250" />
          <Picker.Item label="300" value="300" />
          <Picker.Item label="350" value="350" />
          <Picker.Item label="400" value="400" />
        </Picker>

        <Text>Jogadores (2-6):</Text>
        <View>
          {players.length === 0 && (
            <Text style={styles.warnMessage}>
              Adicione ao menos 2 jogadores para iniciar
            </Text>
          )}
          {players.map((player) => {
            return (
              <Player
                key={player.id}
                player={player}
                onRemove={handlePlayerRemove}
              />
            );
          })}
        </View>
      </View>
      <View>
        <Button
          disabled={players.length === 6}
          block
          dark
          style={styles.button}
          onPress={handleOpenAddPlayer}
        >
          <Text>Adicionar Jogador</Text>
        </Button>
        <Button
          disabled={!checkStart}
          block
          dark
          style={styles.button}
          onPress={handleStartMatch}
        >
          <Text>Iniciar Partida</Text>
        </Button>
      </View>
      <AddPlayer
        visible={addPlayer}
        onSubmit={handleSubmitAddPlayer}
        onCloseRequest={handleCloseAddPlayer}
      />
    </View>
  );
};

export default NewGamePage;
