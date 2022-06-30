import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  vaynoItem: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 8,
    // backgroundColor: "#efefef",
    backgroundColor: "#ECFCE5",
    borderRadius: 10,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  vaynoItemTime: {
    color: "#555",
    fontStyle: "italic",
  },
  vaynoItemMoney: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;
