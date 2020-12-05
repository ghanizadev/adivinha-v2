import React from "react";
import { View, Text, Button } from "native-base";
import { Modal } from "react-native";

import styles from "./styles";

export interface PlayerInfo {
  name: string;
  color: string;
  points: number;
}

type Props = {
  word: string;
  onCloseRequest: () => void;
  visible: boolean;
};

const TimeOver: React.FC<Props> = (props) => {
  const { word, visible, onCloseRequest } = props;

  return (
    <Modal transparent animationType={"slide"} visible={visible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>O tempo acabou! a palavra era:</Text>
          <View style={styles.wordHolder}>
            <Text style={styles.word}>{word}</Text>
          </View>

          <Button block dark onPress={onCloseRequest}>
            <Text>Continuar</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default TimeOver;
