import { StyleSheet, StatusBar } from "react-native";
import Theme from "../../theme/mainTheme";

const styles = StyleSheet.create({
  top: {
    backgroundColor: "#fbfbff",
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    height: 400,

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
    backgroundColor: Theme.mint,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 12,

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
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // borderRadius: 20,
    // borderColor: Theme.lightGreen,
    // borderWidth: 1,
    // paddingHorizontal: 24,
    // paddingVertical: 10,
    // marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#ECFCE5",
    // backgroundColor: "#efefef",
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
    // fontSize: 22,
    fontSize: 16,
    // fontWeight: "700",
    // color: "#fff",
    color: "#333",
    marginBottom: 2,
  },
  money: {
    fontWeight: "700",
    fontSize: 16,
    // color: "#fff",
    // color: "green",
  },
});

export default styles;
