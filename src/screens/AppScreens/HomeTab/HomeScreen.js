import { StyleSheet, View } from "react-native";

import HomeTop from "src/components/home/HomeTop";
import ThuChi from "src/components/home/ThuChi";
import HanMuc from "src/components/home/HanMuc";
import VayNo from "src/components/home/VayNo";
import { ScrollView } from "native-base";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={[styles.homeContainer, { marginBottom: tabBarHeight + 24 }]}>
      <HomeTop />
      <View>
        <ScrollView nestedScrollEnabled style={styles.mainContainer}>
          <ThuChi />
          <HanMuc />
          <VayNo />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "white",
  },
});
