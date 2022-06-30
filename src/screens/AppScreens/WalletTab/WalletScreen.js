import { View, Text } from "native-base";
import TotalBalance from "src/components/wallet/TotalBalance";
import Wallet from "src/components/wallet/Wallet";
import Debit from "src/components/wallet/Debit";
import { ScrollView, StatusBar } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export default function WalletScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View
      style={{
        backgroundColor: "#fbfbff",
        marginBottom: tabBarHeight,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          marginTop: STATUSBAR_HEIGHT,
          fontWeight: "700",
          color: "#198155",
          lineHeight: 36,
          marginLeft: 12,
        }}
      >
        Quản lý
      </Text>
      <ScrollView nestedScrollEnabled>
        <TotalBalance />
        <Wallet />
        <Debit />
      </ScrollView>
    </View>
  );
}
