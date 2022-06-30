import MoreScreen from "src/screens/AppScreens/MoreTab/MoreScreen";
import ReportHistoryScreen from "src/screens/AppScreens/MoreTab/ReportHistoryScreen";
import LimitScreen from "src/screens/AppScreens/MoreTab/LimitScreen";
import CategoryScreen from "src/screens/AppScreens/MoreTab/CategoryScreen";

import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "../screens/AppScreens/MoreTab/SettingScreen";
import AccountScreen from "../screens/AppScreens/MoreTab/AccountScreen";
const Stack = createNativeStackNavigator();

export default function MoreNavigator() {
  const navigation = useNavigation();
  useEffect(() => {
    return () => {
      navigation.setParams({ screen: undefined });
    };
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="More"
      screenOptions={{ headerShown: false, unmountOnBlur: true }}
    >
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen name="ReportHistory" component={ReportHistoryScreen} />
      <Stack.Screen name="Limit" component={LimitScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
}
