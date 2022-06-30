import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "src/styles/limit/MainStyle";
import { Ionicons } from "@expo/vector-icons";
import LimitItem from "src/components/limit/LimitItem";
import { FlatList } from "native-base";
import ModalEdit from "src/components/limit/ModalEdit";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import DataContext from "../../../hooks/data/DataContext";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  print,
  formatMoney,
  getTotalTransactionsAmountInTimeRange,
} from "src/utils";

const LimitScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [showModal, setShowModal] = useState(false);
  const [limit, setLimit] = useState({});
  const { limits, setLimits, wallets, settings } = useContext(DataContext);
  const navigation = useNavigation();

  const currentWallet = wallets?.find((wallet) => wallet.isMain);

  const totalTransactionsAmountDaily = getTotalTransactionsAmountInTimeRange(
    currentWallet?.transactions,
    -1,
    "day"
  );
  const totalTransactionsAmountWeekly = getTotalTransactionsAmountInTimeRange(
    currentWallet?.transactions,
    -1,
    "week"
  );
  const totalTransactionsAmountMonthly = getTotalTransactionsAmountInTimeRange(
    currentWallet?.transactions,
    -1,
    "month"
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hạn mức chi</Text>
        <FontAwesome
          name="history"
          size={28}
          // color="#198155"
          color="#39A0ED"
          style={{
            marginRight: "5%",
          }}
          onPress={() => {
            navigation.navigate("Khác", { screen: "ReportHistory" });
          }}
        />
      </View>

      <ScrollView style={{ marginBottom: tabBarHeight + 4 }}>
        <LimitItem
          title="Trong ngày"
          item={limits.daily}
          setLimit={setLimit}
          setShowModal={setShowModal}
          money={formatMoney(
            totalTransactionsAmountDaily,
            settings.currency
          ).replace("-", "")}
          amount={totalTransactionsAmountDaily}
        />
        <LimitItem
          title="Trong tuần"
          item={limits.weekly}
          setLimit={setLimit}
          setShowModal={setShowModal}
          money={formatMoney(
            totalTransactionsAmountWeekly,
            settings.currency
          ).replace("-", "")}
          amount={totalTransactionsAmountWeekly}
        />
        <LimitItem
          title="Trong tháng"
          item={limits.monthly}
          setLimit={setLimit}
          setShowModal={setShowModal}
          money={formatMoney(
            totalTransactionsAmountMonthly,
            settings.currency
          ).replace("-", "")}
          amount={totalTransactionsAmountMonthly}
        />
      </ScrollView>
      <ModalEdit
        showModal={showModal}
        setShowModal={setShowModal}
        limit={limit}
        setLimit={setLimit}
      />
    </View>
  );
};

export default LimitScreen;
