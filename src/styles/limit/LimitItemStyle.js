import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //   container: {
  //     backgroundColor: "#ECFCE5",
  //     paddingHorizontal: 12,
  //     paddingVertical: 8,
  //     shadowColor: "#000",
  //     shadowOffset: {
  //       width: 0,
  //       height: 1,
  //     },
  //     shadowOpacity: 0.22,
  //     shadowRadius: 2.22,
  //     elevation: 3,
  //     marginBottom: 12,
  //     borderRadius: 20,
  //   },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    // textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "700",
    color: "#555",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  //   statusMoney: {
  //     textAlign: "center",
  //     color: "#198155",
  //     fontSize: 16,
  //     marginTop: 12,
  //     marginBottom: 8,
  //   },
  desc: {
    paddingHorizontal: 36,
    marginTop: 12,
  },
  descItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  descTitle: {
    fontSize: 16,
    color: "#555",
  },
  day: {
    fontSize: 16,
    color: "#333",
  },
  time: {
    fontSize: 16,
    color: "#333",
  },
  money: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;
