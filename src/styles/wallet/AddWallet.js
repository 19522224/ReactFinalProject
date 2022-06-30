import { StyleSheet, StatusBar } from "react-native";
import Theme from "../../theme/mainTheme";

const styles = StyleSheet.create({
  top: {
    backgroundColor: "#fbfbff",
    marginTop: 10,
    // paddingHorizontal: 12,
    // marginHorizontal: "5%",
    paddingVertical: 12,
    maxHeight: "40%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  name: {
    // color: Theme.gray,
    color: "#444",
    fontSize: 18,
    fontWeight: "700",
  },
  iconWrapper: {},

  walletContainer: {
    borderRadius: 10,
    // backgroundColor: Theme.mint,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  moneyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
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

  content: {},
  contentTitle: {
    fontSize: 16,
    color: "#444",
    marginBottom: 2,
  },
  money: {
    fontSize: 16,
    fontWeight: "700",
    color: "green",
  },

  top: {
    backgroundColor: "#fbfbff",
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    maxHeight: "40%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  name: {
    // color: Theme.gray,
    color: "#444",
    fontSize: 18,
    fontWeight: "700",
  },
  iconWrapper: {},

  walletContainer: {
    borderRadius: 10,
    // backgroundColor: Theme.mint,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  mainMoneyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#f3f788",
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
});

export default styles;
