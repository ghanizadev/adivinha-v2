import { StyleSheet } from "react-native";

export default StyleSheet.create({
  players: {
    height: "42%",
    width: "100%",
    backgroundColor: "#333",
    padding: 3,
    flexDirection: "row",
    flexWrap: "wrap"
  },

  playerContainer: {
    width: "48%",
    height: 54,
    backgroundColor: "gray",
    borderRadius: 8,
    margin: 3,
    padding: 6,
  },
  playerName: {
    fontWeight: "bold",
    color: "#fff"
  },
  playerPoints: {
    color: "#fff"
  },
});
