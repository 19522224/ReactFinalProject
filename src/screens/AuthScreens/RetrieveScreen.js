import { ScrollView, View } from "react-native";
import Logo from "src/components/login-signup/Logo";
import RetrieveForm from "src/components/login-signup/RetrieveForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RetrieveScreen() {
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={false}
    >
      <ScrollView style={{ backgroundColor: "#fbfbff", flex: 1 }}>
        <Logo />
        <RetrieveForm />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
