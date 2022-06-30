import { StyleSheet, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#C9DAEA",
    backgroundColor: "#fbfbff",
    flex: 1,
    alignItems: "center",
  },
  header: {
    marginTop: STATUSBAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#198155",
    // alignSelf: "flex-start",
    // marginBottom: 4,

    // marginLeft: 12,
  },
  itemContainer: {
    backgroundColor: "#ECFCE5",
    width: "90%",
    marginVertical: 8,
    marginHorizontal: "5%",
    borderRadius: 20,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 28,
    color: "#444",
  },
  subItemTitle: {
    fontSize: 16,
    color: "#444",
  },
});
export default styles;
