import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import Logo from "src/components/login-signup/Logo";
import LoginForm from "src/components/login-signup/LoginForm";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1 }}
        scrollEnabled={false}
      >
        <ScrollView style={{ flex: 1, backgroundColor: "#fbfbff" }}>
          <Logo />
          <LoginForm />
        </ScrollView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
