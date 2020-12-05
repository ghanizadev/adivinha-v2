import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    flex: 1,
  },
  logo: {
    width: "80%",
    height: "35%",
    alignSelf: "center"
  },
  buttonGroup: {
    width: "80%",
    height: "35%",
    alignSelf: "center",
  },
  button: {
      marginVertical: 6,
  },
  wrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
  }
});