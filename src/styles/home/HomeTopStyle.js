import { StyleSheet, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  top: {
    backgroundColor: "#4FB286",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  title: {
    marginTop: STATUSBAR_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    // color: "#ECFCE5",
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  iconWrapper: {},
  moneyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#ECFCE5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 8,
  },
  content: {},
  contentTitle: {
    fontSize: 14,
    color: "#444",
    fontWeight: "400",
    // marginBottom: 2,
  },
  money: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3C896D",
    // color: "#E8D54E",
  },
});

export default styles;
