import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "400",
    color: "#3C896D",
    marginBottom: 16,
  },
  iconSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  selection: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  iconText: {
    marginRight: 24,
  },

  actions: {
    flexDirection: "row",
    marginTop: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 16,
  },
});

export default styles;
