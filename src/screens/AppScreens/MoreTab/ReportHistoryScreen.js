import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { HStack, Select, VStack } from "native-base";
import ReportGraph from "src/components/report-history/ReportGraph";

import Theme from "src/theme/mainTheme";
import Typo from "src/theme/mainTypo";
import { HistoryListItem } from "src/components/report-history/HistoryListItem";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { formatMoney, checkDateInRange, print } from "src/utils";

import DataContext from "src/hooks/data/DataContext";


export default function ReportHistoryScreen() {
  const { wallets, settings } = useContext(DataContext);

  const mainWalletName = wallets.find(wallet => wallet.isMain)?.name;

  const tabBarHeight = useBottomTabBarHeight();
  const [selectedTimeRange, setSelectedTimeRange] = useState("week");
  const [selectedWallet, setSelectedWallet] = useState(mainWalletName);

  const walletNamesIDs = wallets.map(
    wallet => ({
      name: wallet.name,
      id: wallet.id
    })
  );
  const currentWallet = wallets.find(wallet => wallet.name === selectedWallet);

  const transactionsInRange = currentWallet?.transactions.filter(
    (transaction) => checkDateInRange(transaction.date, selectedTimeRange)
  );

  // console.log(transactionsInRange);

  const incomeTransactions = transactionsInRange?.filter(
    (transaction) => transaction.amount >= 0
  );
  const expenseTransactions = transactionsInRange?.filter(
    (transaction) => transaction.amount < 0
  );

  const totalAmount = transactionsInRange?.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );
  const totalIncomeAmount = incomeTransactions?.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );
  const totalExpenseAmount = expenseTransactions?.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );

  return (
    <View style={[st.container, { marginBottom: tabBarHeight }]}>
      <ScrollView nestedScrollEnabled>
        <View style={st.reportContainer}>
          <Text style={[Typo.h4, st.reportHeader]}>Thống kê</Text>
          <View style={st.btnContainer}>
            <Select
              w="90"
              py="0"
              px="2"
              marginX="1"
              zIndex={3}
              borderColor="transparent"
              backgroundColor="#4FB286"
              color="white"
              fontSize="16"
              borderRadius="full"
              selectedValue={selectedTimeRange}
              onValueChange={(itemValue) => {
                setSelectedTimeRange(itemValue);
              }}
              _selectedItem={{
                bg: "teal.600",
              }}
            >
              <Select.Item label="Tuần" value="week" />
              <Select.Item label="Tháng" value="month" />
              <Select.Item label="Năm" value="year" />
            </Select>
            <Select
              w="120"
              py="0"
              px="2"
              marginX="1"
              zIndex={3}
              borderColor="transparent"
              backgroundColor="#4FB286"
              color="white"
              fontSize="16"
              borderRadius="full"
              selectedValue={selectedWallet}
              onValueChange={(itemValue) => {
                setSelectedWallet(itemValue);
              }}
              _selectedItem={{
                bg: "teal.600",
              }}
            >
              {walletNamesIDs.map(walletNameId => 
                <Select.Item label={walletNameId.name} value={walletNameId.name} key={walletNameId.id} />
              )}
            </Select>
          </View>

          <ReportGraph 
            style={st.graph} 
            transactions={transactionsInRange}
            currency={settings.currency}
            timeRange={selectedTimeRange} />

          <VStack space={1} alignItems="center">
            <HStack space={16} justifyContent="center">
              <View style={st.incomeMoneyContainer}>
                <Text style={st.moneyTitle}>Tổng thu</Text>
                <Text style={st.incomeMoney}>
                  {formatMoney(totalIncomeAmount || 0, settings.currency)}
                </Text>
              </View>
              <View style={st.expenseMoneyContainer}>
                <Text style={st.moneyTitle}>Tổng chi</Text>
                <Text style={st.expenseMoney}>
                  {formatMoney(totalExpenseAmount || 0, settings.currency)}
                </Text>
              </View>
            </HStack>
            <View style={st.totalContainer}>
              <Text style={st.moneyTitle}> Tổng thu - chi</Text>
              <Text style={totalAmount >= 0 ? st.incomeMoney : st.expenseMoney}>
                {formatMoney(totalAmount || 0, settings.currency)}
              </Text>
            </View>
          </VStack>
        </View>
        <View
          style={{
            height: 8,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 8,
            marginTop: 8,
          }}
        ></View>
        <View style={[st.historyContainer, { marginBottom: tabBarHeight }]}>
          <Text style={[Typo.h4, st.historyHeader]}>Lịch sử</Text>
          <View style={st.historyListContainer}>
            <SafeAreaView>
              <ScrollView nestedScrollEnabled>
                {transactionsInRange?.map((transaction, index) => (
                  <HistoryListItem data={transaction} key={index} />
                ))}
              </ScrollView>
            </SafeAreaView>
          </View>
          <View style={st.historyEmpty}></View>
        </View>
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: Theme.background,
    alignItems: "center",
    justifyContent: "space-between",
  },

  reportContainer: {
    // flex: 0.55,
    // height: "50%",
    width: "100%",
  },
  reportHeader: {
    // flex: 0.7,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#198155",
    marginVertical: 4,
    // backgroundColor: Theme.mint,
  },

  btnContainer: {
    // flex: 0.7,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  graph: {
    // flex: 4.5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: -40,
    marginBottom: -20,
  },

  historyContainer: {
    // flex: 0.45,
    height: 580,
    width: "100%",
  },
  historyHeader: {
    // flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: Theme.black,
    fontSize: 24,
    fontWeight: "700",
    color: "#198155",
    marginBottom: 8,
    marginTop: 12,
    // backgroundColor: Theme.mint
  },
  historyListContainer: {
    // flex: 8.5,
    // paddingHorizontal: 12,
  },

  historyEmpty: {
    // flex: 1.5,
  },

  moneyTitle: {
    fontSize: 16,
  },
  incomeMoney: {
    fontSize: 16,
    color: "green",
    fontWeight: "700",
    textAlign: "center",
  },

  expenseMoney: {
    fontSize: 16,
    color: "red",
    fontWeight: "700",
    textAlign: "center",
  },
  moneyTitle: {
    color: "#222",
  },
});