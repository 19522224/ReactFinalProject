import { StyleSheet } from "react-native";
import Theme from "../../theme/mainTheme";

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fbfbff",
  },
  title: {
    textAlign: "center",
    // color: Theme.gray,
    color: "#333",
    marginTop: 24,
    fontSize: 20,
  },
  body1: {
    width: 320,
    textAlign: "center",
    color: Theme.gray,
    fontStyle: "italic",
    marginBottom: 44,
  },
  body2: {
    //   flex: 1,
    width: 320,
    textAlign: "center",
    color: Theme.gray,
    // marginBottom: ,
  },
});

export default style;
