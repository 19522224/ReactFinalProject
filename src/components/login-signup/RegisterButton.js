import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Theme from "../../theme/mainTheme";
import Typo from "../../theme/mainTypo";

export default function RegisterButton(props) {
  return (
    <TouchableOpacity style={style.container} onPress={props.onPress}>
      <Text style={Typo.primaryButton}>ĐĂNG KÝ</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Theme.dark,
    margin: 8,
    padding: 15,
    // width: 350,
    width: "90%",
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    alignSelf: "center",
  },
});
