import React from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage from "./src/components/MainPage";
import GamePage from "./src/components/GamePage";
import GameHeader from "./src/components/GamePage/Header";
import NewGamePage from "./src/components/NewGamePage";
import SettingsPage from "./src/components/SettingsPage";
import Loading from "./src/components/Loading";

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = React.useState(true);

  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });

    setLoading(false);
  };

  React.useEffect(() => {
    loadFont();
  });

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={MainPage}
              options={{ header: () => null }}
            />
            <Stack.Screen
              name="NewGame"
              component={NewGamePage}
              options={{ header: GameHeader }}
            />
            <Stack.Screen
              name="Game"
              component={GamePage}
              options={{ header: GameHeader }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsPage}
              options={{ header: () => null }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
