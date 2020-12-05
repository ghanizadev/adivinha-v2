import { View, Text, Button } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {actions} from "../../redux/store";

let t = 0;

const startTimer = (callback : () => void) => {
  t = setInterval(callback, 1000);
}

const SettingsPage = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state: any) => state.timer);

  const [state, setState] = React.useState({
    paused: true,
    initialValue: 10,
    actualValue: 10,
  });

  React.useEffect(() => {
    dispatch(actions.resetTimer(30))
    return () => clearInterval(t);
  }, []);

  return (
    <View style={{alignContent: "center", justifyContent: "center", flex: 1}}>
      <Text>{timer}</Text>
      <Button block dark onPress={() => {
        setState({...state, paused: !state.paused});
        startTimer(() => {
          dispatch(actions.countdown())
        });
      }}>
        <Text>Start/Stop</Text>
      </Button>
    </View>
  );
};

export default SettingsPage;
