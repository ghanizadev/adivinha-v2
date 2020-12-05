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
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    alignItems: "flex-start",
  },
  colorButton: {
    width: "10%",
    margin: 1,
    borderWidth: 2,
    borderColor: "#fff",
    paddingTop: "10%",
  },
  colorHolder: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorWrapper: {
    marginVertical: 6,
  },
  button: {
    marginVertical: 3,
  },
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
});
