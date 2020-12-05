import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});