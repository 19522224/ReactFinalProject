import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import VayNoItem from "./VayNoItem";
import styles from "../../styles/home/VayNoStyle";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import DataContext from "../../hooks/data/DataContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

const VayNo = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const { debits } = useContext(DataContext);
  return (
    <View style={[styles.vaynoContainer, { marginBottom: tabBarHeight + 10 }]}>
      <View style={styles.vaynoTop}>
        <Text style={styles.vaynoTitle}>Tình hình vay nợ</Text>

        <AntDesign
          name="arrowright"
          size={24}
          color="#198155"
          onPress={() => navigation.navigate("Ví", { screen: "AddDebit" })}
        />
      </View>
      <View style={{ height: 400, marginBottom: 20 }}>
        <ScrollView nestedScrollEnabled>
          {debits.map((item) => (
            <VayNoItem item={item} key={item.id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default VayNo;
