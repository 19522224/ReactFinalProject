import Theme from "../../theme/mainTheme";
import mainTypo from "../../theme/mainTypo";

const style = {
  input: {
    variant: "rounded",
    borderWidth: "2",
    borderColor: Theme.inputBorder,
    fontSize: mainTypo.input.fontSize,
    width: "90%",
    alignSelf: "center",
    margin: 2,
  },
  icon: {
    size: 20,
    color: Theme.gray,
  },
  left_icon: {
    marginLeft: 15,
  },
  right_icon: {
    marginRight: 15,
  },
  text: {
    ...mainTypo.h5,
    color: Theme.gray,
  },
  link: {
    color: Theme.black,
    textDecorationLine: "underline",
  },
};

export default style;
