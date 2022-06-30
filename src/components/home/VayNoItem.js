import { Text, View } from "react-native";
import React, { useContext } from "react";
import styles from "../../styles/home/VayNoItemStyle";
import { HStack, VStack } from "native-base";
import { formatAmountOnly, formatCurrencyOnly } from "src/utils";
import DataContext from "../../hooks/data/DataContext";
import { formatDate } from "src/utils";
const VayNoItem = ({ item }) => {
  const { settings } = useContext(DataContext);

  return (
    <View style={styles.vaynoItem}>
      <VStack space={1}>
        <Text style={{}}>{item.name}</Text>
        <HStack justifyContent="space-between" paddingRight={4} paddingLeft={4}>
          <Text
            style={[
              styles.vaynoItemMoney,
              { color: (item.isDebt && "red") || "green" },
            ]}
          >
            {formatAmountOnly(item.amount, settings.currency)}{" "}
            {formatCurrencyOnly(settings.currency)}
          </Text>
          <Text style={styles.vaynoItemTime}>
            {formatDate(item.deadline, settings.dateFormat)}
          </Text>
        </HStack>
      </VStack>
    </View>
  );
};

export default VayNoItem;
