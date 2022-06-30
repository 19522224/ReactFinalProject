import { View, Text, TouchableWithoutFeedback, Pressable } from "react-native";
import React from "react";
import styles from "src/styles/income_expense/MainStyle";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import FormAddNewItem from "src/components/income_expense/FormAddNewItem";
import { Keyboard } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

// Navigation
import { useNavigation } from "@react-navigation/native";

const IncomeExpenseScreen = () => {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{ ...styles.container, marginBottom: tabBarHeight }}>
      <View style={styles.header}>
        <Text style={styles.title}>Thêm thu chi</Text>
      </View>
      <Pressable
        style={styles.historyContainer}
        onPress={() => navigation.navigate("Khác", { screen: "ReportHistory" })}
      >
        <FontAwesome name="history" size={22} color="#39A0ED" />
        <Text style={styles.history}>Xem lịch sử</Text>
      </Pressable>
      <FormAddNewItem />
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default IncomeExpenseScreen;
