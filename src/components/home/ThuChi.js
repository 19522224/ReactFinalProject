import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import styles from "src/styles/home/ThuChiStyle";
import { Select } from "native-base";
import ThuChiGraph from "./ThuChiGraph";
import DataContext from "src/hooks/data/DataContext";
import dayjs from "dayjs";
import { print, formatMoney } from "src/utils";

// Navigation
import { useNavigation } from "@react-navigation/native";

const ThuChi = () => {
  const navigation = useNavigation();
  const { wallets, settings } = useContext(DataContext);

  const currentWallet = wallets.find(wallet => wallet.isMain);
  const transactionsToday = currentWallet?.transactions?.filter(transaction => dayjs(transaction.date).isSame(dayjs(), "day"));

  const getTransactionsForType = (transactions, type) => {
    if (typeof transactions === "undefined")
      return;

    if (type === "income")
      return transactions.filter(transaction => transaction.amount > 0);
    else if (type === "expense")
      return transactions.filter(transaction => transaction.amount < 0);
  };

  let incomeAmount = getTransactionsForType(transactionsToday, "income")?.reduce(
    (sum, currT) => sum += currT.amount,
    0
  );
  let expenseAmount = getTransactionsForType(transactionsToday, "expense")?.reduce(
    (sum, currT) => sum += Math.abs(currT.amount),
    0
  );

  if (typeof incomeAmount === "undefined") incomeAmount = 0;
  if (typeof expenseAmount === "undefined") expenseAmount = 0;

  const totalAmount = incomeAmount - expenseAmount;

  const formattedIncome = formatMoney(incomeAmount, settings.currency);
  const formattedExpense = formatMoney(expenseAmount, settings.currency);
  const formattedTotal = formatMoney(totalAmount, settings.currency);


  return (
    <View style={styles.thuchiContainer}>
      <View style={styles.thuchiTop}>
        <View style={styles.thuchiTitleWrapper}>
          <Text style={styles.thuchiTitle}>Tình hình thu chi hôm nay</Text>
        </View>
        <AntDesign
          name="arrowright"
          size={24}
          color="#198155"
          onPress={() =>
            navigation.navigate("Khác", { screen: "ReportHistory" })
          }
        />
      </View>
      <View style={styles.thuchiContent}>
        <ThuChiGraph incomeAmount={incomeAmount} expenseAmount={expenseAmount} currency={settings.currency} />

        <View style={styles.thuchiDesc}>
          <View style={styles.thuItem}>
            <View style={styles.nameItemWrapper}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#198155",
                  marginRight: 4,
                  borderRadius: 8,
                }}
              ></View>
              <Text style={styles.nameItem}>Thu</Text>
            </View>
            <Text style={styles.thuMoney}>{formattedIncome}</Text>
          </View>
          <View style={styles.chiItem}>
            <View style={styles.nameItemWrapper}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#D3180C",
                  marginRight: 4,
                  borderRadius: 8,
                }}
              ></View>
              <Text style={styles.nameItem}>Chi</Text>
            </View>
            <Text style={styles.chiMoney}>{formattedExpense}</Text>
          </View>
          <Text style={styles.result}>{formattedTotal}</Text>
        </View>
      </View>
    </View>
  );
};

export default ThuChi;
