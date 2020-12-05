import React from "react";
import { View, Text, Button } from "native-base";
import { Animated } from "react-native";
import styles from "./styles";
import { useSelector } from "react-redux";
import { store } from "../../../redux/store";

export interface PlayerInfo {
  name: string;
  color: string;
  points: number;
}

type Props = {
  actualPlayer: PlayerInfo;
  actualWord?: string;
  startChronometer: () => void;
  stopChronometer: () => void;
};

const Chalkboard: React.FC<Props> = (props) => {
  const { actualPlayer, actualWord, startChronometer, stopChronometer } = props;
  const [showChronometer, setShowChronometer] = React.useState(false);
  const [showWord, setShowWord] = React.useState(false);
  const [showNextPlayer, setShowNextPlayer] = React.useState(true);

  const [chronometerOpacity] = React.useState(new Animated.Value(0));
  const [wordOpacity] = React.useState(new Animated.Value(0));

  const game = useSelector((state: any) => state.game);
  const timer = useSelector((state: any) => state.timer);

  const routine = async () => {
    setShowWord(true);
    setShowNextPlayer(false);

    await new Promise((res) => {
      Animated.timing(wordOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(res);
    });

    await new Promise((res) => setTimeout(res, 3000));

    await new Promise((res) => {
      Animated.timing(wordOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(res);
    });

    setShowWord(false);
    setShowChronometer(true);

    await new Promise((res) => {
      Animated.timing(chronometerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(res);
    });

    startChronometer();
  };

  const reset = () => {
    if (showWord) {
      Animated.timing(wordOpacity, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    }

    if (showChronometer) {
      Animated.timing(chronometerOpacity, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    }

    setTimeout(() => {
      setShowWord(false);
      setShowChronometer(false);
      setShowNextPlayer(true);
      stopChronometer();
    }, 50);
  };

  const secondsToMinutes = (seconds: number): string => {
    const m = Math.trunc(seconds / 60);
    const s = seconds - Math.trunc(m * 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  React.useEffect(() => {
    if (game.inTurn) {
      routine();
    } else if (game.turn > 0) {
      reset();
    }
  }, [game.inTurn]);

  return (
    <View style={styles.container}>
      {showChronometer && (
        <Animated.Text
          style={{ ...styles.counter, opacity: chronometerOpacity }}
        >
          {secondsToMinutes(timer)}
        </Animated.Text>
      )}
      {showWord && (
        <Animated.View style={{ ...styles.wordHolder, opacity: wordOpacity }}>
          <Text style={styles.text}>A palavra e:</Text>
          <Text style={styles.word}>{actualWord}</Text>
          <Button light style={styles.skipButton}>
            <Text>Pular: X5</Text>
          </Button>
          <Text style={styles.small}>Comeca em 3s...</Text>
        </Animated.View>
      )}

      {showNextPlayer && (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.text}>O proximo a jogar e:</Text>
          <Text style={{ ...styles.word, color: actualPlayer.color }}>
            {actualPlayer.name.toUpperCase()}
          </Text>
          <Text style={styles.small}>
            Clique em iniciar para sortear a palavra
          </Text>
        </View>
      )}
    </View>
  );
};

export default Chalkboard;
