import {StyleSheet, StatusBar} from "react-native";

export default StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight || 0,
        height: 80,
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center"
      },
      logo: {
          height: 42,
          width: "80%",
      }
});