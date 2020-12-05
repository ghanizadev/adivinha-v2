import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  players: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  points: {
    color: "#e39b00",
    fontWeight: "bold",
    fontSize: 36,
  },
  pointsSmall: {
    color: "#e39b00",
    fontWeight: "bold",
    fontSize: 12,
  },
  pointsHolder: {
    marginVertical: 8,
    alignItems: "center",
  },
  player: {
    backgroundColor: "gray",
    borderRadius: 8,
    height: 50,
    width: "45%",
    margin: 3,
    padding: 4
  },
  playerName: {
    color: "lightgray",
    fontWeight: "bold",
  },
  playerPoints: {
    color: "lightgray",
  },
});
