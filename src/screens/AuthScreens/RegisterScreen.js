import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "src/components/login-signup/RegisterForm";
import Logo from "src/components/login-signup/Logo";

export default function RegisterScreen() {
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={false}
    >
      <ScrollView style={{ backgroundColor: "#fbfbff" }}>
        <Logo />
        <RegisterForm />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
