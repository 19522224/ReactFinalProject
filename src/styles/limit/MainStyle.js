import { StyleSheet, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#C9DAEA",
    backgroundColor: "#fbfbff",
    height: "100%",
    marginTop: 8,
    // paddingTop: 14,
  },
  header: {
    marginTop: STATUSBAR_HEIGHT,
    position: "relative",
    // minHeight: 60,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#198155",
    marginLeft: 12,
  },
});

export default styles;
