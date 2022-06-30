import { StyleSheet, StatusBar } from "react-native";
import Theme from "../../theme/mainTheme";

// const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  top: {
    // backgroundColor: "#fff",
    // marginTop: STATUSBAR_HEIGHT,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  name: {
    color: "#ECFCE5",
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
    backgroundColor: Theme.darkGreen,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 8,
  },
  content: {},
  contentTitle: {
    color: "#fff",
    fontWeight: "400",
    marginBottom: 2,
  },
  money: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
});

export default styles;
