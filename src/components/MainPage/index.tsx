import React from "react";
import { Button, Text, View } from "native-base";
import { SafeAreaView, Image } from "react-native";

const logo = require("../../assets/images/logo.png");

import styles from "./styles";

const MainPage : React.FC<{navigation ?: any}> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.buttonGroup}>
          <Button block dark style={styles.button} onPress={() => navigation.navigate('NewGame')}>
            <Text>Novo Jogo</Text>
          </Button>
          <Button block dark style={styles.button} onPress={() => navigation.navigate('Settings')}>
            <Text>Configuracao</Text>
          </Button>
          <Button block dark style={styles.button}>
            <Text>Sair</Text>
          </Button>
        </View>
        <View>
          <Button block dark transparent  style={styles.button}>
            <Text>2020, ghanizadev</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainPage;
