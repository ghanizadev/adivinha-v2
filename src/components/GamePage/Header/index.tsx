import React from "react";
import {View} from "native-base";
import styles from "./styles";
import { Image } from "react-native";

const logo = require("../../../assets/images/logo-alt.png");

const Header = () => {
    return(
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode={"contain"} />
        </View>
    )
}

export default Header;