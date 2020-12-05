import { StyleSheet } from "react-native";

export default StyleSheet.create({
  playerName: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff"
  },
  playerHolder: {
      width: "100%",
      marginVertical: 2,
      paddingVertical: 5,
      paddingHorizontal: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#eee",
      borderRadius: 8
  },
  playerRemoveButton: {},
  form: {
      padding: 10,
      flex: 1,
      justifyContent: "space-between"
  }, button: {
      marginVertical: 3
  },
  title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10
  },
  warnMessage: {
    color: "gray",
    fontSize: 12,
    margin: 3
  }
});
