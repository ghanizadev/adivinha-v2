import React from "react";
import { View, Text, Button } from "native-base";
import { Modal } from "react-native";

import styles from "./styles";
import PlayerProps from "../../../App/interface/IPlayerProps";

type Props = {
  player?: PlayerProps;
  onCloseRequest: () => void;
  visible: boolean;
};

const NextPlayer: React.FC<Props> = (props) => {
  const { player, onCloseRequest, visible } = props;

  const handleClick = () => {
    onCloseRequest();
  };

  return (
    <Modal transparent animationType={"slide"} visible={visible}>
      <View style={styles.container}>
        {player && (
          <View style={styles.content}>
            <Text style={styles.title}>O proximo a jogar e:</Text>
            <Text style={{ ...styles.name, color: player.color }}>
              {player.name}
            </Text>
            <Button block dark onPress={handleClick}>
              <Text>Continuar</Text>
            </Button>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default NextPlayer;
