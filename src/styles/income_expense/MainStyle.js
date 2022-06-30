import { StyleSheet, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#C9DAEA",
    backgroundColor: "#fbfbff",
    height: "100%",
  },
  header: {
    marginTop: STATUSBAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#198155",
    marginLeft: 8,
  },
  historyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 12,
  },
  history: {
    fontSize: 18,
    fontWeight: "400",
    color: "#39A0ED",
    marginLeft: 4,
  },
});

export default styles;
