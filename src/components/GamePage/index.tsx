import { View, Text, Button } from "native-base";
import React  from "react";
import { SafeAreaView } from "react-native";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";

import Players from "./PlayersComponent";
import NextPlayer from "./NextPlayer";
import ComputePoints from "./ComputePoint";
import TimeOver from "./TimeOver";
import Chalkboard from "./Chalkboard";
import { GameManager } from "../../App";
import { actions } from "../../redux/store";

const GamePage: React.FC<{ navigation: any }> = (props) => {
  const { navigation } = props;

  const [nextPlayerVisible, setNextPlayerVisible] = React.useState(false);
  const [timeOverVisible, setTimeOverVisible] = React.useState(false);

  const game = useSelector((state: any) => state.game);
  const timeOver = useSelector((state: any) => state.timeOver);
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    GameManager.newMatch();
  }, []);

  const handleNextPlayerClose = () => {
    setNextPlayerVisible(false);
  };

  const handleTimeOverClose = () => {
    setTimeOverVisible(false);
    GameManager.continue();
  };

  const handleStopMatch = () => {
    GameManager.stopMatch();
    navigation.goBack();
  };

  const handleStop = () => {
    dispatch(actions.updateGame({ inTurn: false }));
  };

  const handleStart = () => {
    GameManager.newTurn();
  };

  const handleStartChronometer = () => {
    GameManager.startChronometer();
  };
  const handleStopChronometer = () => {
    GameManager.stopChronometer();
  };
  
  React.useEffect(() => {
    if(timeOver) {
      setTimeOverVisible(true);
      dispatch(actions.setTimeOver(false));
    }
  }, [timeOver])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            {game.maxScore} pontos | {game.maxTime}s | {game.words.length}{" "}
            palavras restantes
          </Text>
          <Chalkboard
            startChronometer={handleStartChronometer}
            stopChronometer={handleStopChronometer}
            actualWord={game.actualWord}
            actualPlayer={game.actualPlayer}
          />
          <View style={styles.buttonGroup}>
            <Button
              block
              success
              style={styles.button}
              disabled={game.inTurn}
              onPress={handleStart}
            >
              <Text>Iniciar</Text>
            </Button>
            <Button
              block
              danger
              style={styles.button}
              disabled={!game.inGame || !game.inTurn}
              onPress={handleStop}
            >
              <Text>Parar</Text>
            </Button>
          </View>
          <Text style={styles.text}>Jogadores</Text>
          <Players players={game.players} />
          <Button block dark onPress={handleStopMatch}>
            <Text>Finalizar Partida</Text>
          </Button>
        </View>
      </SafeAreaView>
      <NextPlayer
        visible={nextPlayerVisible}
        onCloseRequest={handleNextPlayerClose}
        player={game.actualPlayer}
      />
      {/* <ComputePoints actualPlayer={players[0]} players={players} /> */}
      <TimeOver visible={timeOverVisible} onCloseRequest={handleTimeOverClose} word={game.actualWord} />
    </>
  );
};

export default GamePage;
