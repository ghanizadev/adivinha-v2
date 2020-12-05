import { View, Text, Input, Item, Label, Button } from "native-base";
import React from "react";
import { Alert, Modal, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from "react-native";
import PlayerProps from "../../../App/interface/IPlayerProps";
import { PlayerInfo } from "../../GamePage/PlayersComponent"; //TODO export Player info in store definition
import styles from "./styles";

const colorList = [
  "#eb4034",
  "#758e11",
  "#ebd700",
  "#c3eb00",
  "#6aeb00",
  "#24a807",
  "#04d663",
  "#00fff2",
  "#0077ff",
  "#446df5",
  "#6929ff",
  "#d059ff",
  "#ff59f4",
  "#d40074",
  "#d41e1e",
  "#5164db",
  "#fcba03",
  "#8e13f2",
];

const ColorButton: React.FC<{
  color: string;
  selected: boolean;
  onPress: (color: string) => void;
}> = (props) => {
  const { color, selected, onPress } = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(color)}
      style={{
        ...styles.colorButton,
        backgroundColor: color,
        borderColor: selected ? "#000" : "#fff",
      }}
    ></TouchableOpacity>
  );
};

type Props = {
  visible: boolean;
  onCloseRequest: () => void;
  onSubmit: (user: PlayerProps) => void;
};

const AddPlayer: React.FC<Props> = (props) => {
  const { onCloseRequest, onSubmit, visible } = props;
  const [color, setColor] = React.useState("#eb4034");
  const [name, setName] = React.useState("");

  const handleChangeColor = (color: string) => {
    setColor(color);
  };

  const handleClose = () => {
    setColor("#eb4034");
    setName("");
    onCloseRequest();
  };

  const handleNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    setName(value);
  }

  const handleSubmit = () => {
    if(!name || name.length < 3) return Alert.alert("O nome deve conter 3 ou mais caracteres");

    onSubmit({
      name,
      color,
      points: 0,
      id: "",
      skips: 0
    });
    onCloseRequest();
    setColor("#eb4034");
    setName("");
  }

  return (
    <Modal
    transparent
    animationType={"slide"}
    visible={visible}
    style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Novo Jogador</Text>
          <View style={styles.form}>
            <Item inlineLabel>
              <Label>Nome</Label>
              <Input onChange={handleNameChange} />
            </Item>
            <View style={styles.colorWrapper}>
              <Label>Cor</Label>
              <View style={styles.colorHolder}>
                {colorList.map((c) => (
                  <ColorButton
                    onPress={handleChangeColor}
                    selected={color === c}
                    key={c}
                    color={c}
                  />
                ))}
              </View>
            </View>
            <Button block dark style={styles.button} onPress={handleSubmit}>
              <Text>Salvar</Text>
            </Button>
            <Button block dark style={styles.button} onPress={handleClose}>
              <Text>Cancelar</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPlayer;
