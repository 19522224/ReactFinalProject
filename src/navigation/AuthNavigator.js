import WelcomeScreen from "src/screens/AuthScreens/WelcomeScreen";
import LoginScreen from "src/screens/AuthScreens/LoginScreen";
import RegisterScreen from "src/screens/AuthScreens/RegisterScreen";
import RetrieveScreen from "src/screens/AuthScreens/RetrieveScreen";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Retrieve" component={RetrieveScreen} />
    </Stack.Navigator>
  )
}
