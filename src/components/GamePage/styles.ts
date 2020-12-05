import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    flex: 1,
  },
  wrapper: {
    padding: 16,
  },
  buttonGroup: {
      flexDirection: "row",
      width: "100%",
      height: 50,
  },
  button: {
      flex: 1,
      marginVertical: 6,
  },
  text: {
    marginVertical: 3,
    alignSelf: "center"
  }
});
