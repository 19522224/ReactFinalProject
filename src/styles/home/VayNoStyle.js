import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  vaynoContainer: {
    // backgroundColor: "#C9DAEA",
    backgroundColor: "#fbfbff",
    padding: 12,
    marginBottom: 8,
    height: 700,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  vaynoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vaynoTitle: {
    color: "#445",
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "700",
  },

  vaynoList: {
    marginTop: 12,
    height: "100%",
    padding: 12,
  },
});

export default styles;
