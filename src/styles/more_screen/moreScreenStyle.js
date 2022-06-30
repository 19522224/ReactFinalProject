import { StyleSheet, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#C9DAEA",
    backgroundColor: "#fbfbff",
    flex: 1,
    // marginTop: STATUSBAR_HEIGHT,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    lineHeight: 40,
    fontWeight: "700",
    marginBottom: 24,
    marginTop: 60,
    color: "#333",
    letterSpacing: 2,
  },
  featureContainer: {
    backgroundColor: "#ECFCE5",
    width: "92%",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
    color: "#333",
  },
  featureItem: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  featureTitle: {
    fontSize: 14,
    color: "#333",
  },
  moreContainer: {
    backgroundColor: "#ECFCE5",
    width: "95%",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  moreItemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
  },
  moreItem: {
    fontSize: 16,
  },
});

export default styles;
