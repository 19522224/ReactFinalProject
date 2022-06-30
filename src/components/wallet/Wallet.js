import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/wallet/AddWallet";
import { AntDesign } from "@expo/vector-icons";

// Navigation
import { useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import DataContext from "../../hooks/data/DataContext";
import { formatMoney, formatAmountOnly, formatCurrencyOnly } from "src/utils";

const Wallet = () => {
  const navigation = useNavigation();
  const { wallets, settings } = useContext(DataContext);
  return (
    <View style={styles.top}>
      <View style={styles.title}>
        <Text style={styles.name}>Thêm - xóa ví</Text>
        <AntDesign
          name="arrowright"
          size={24}
          color="#198155"
          onPress={() => navigation.navigate("Ví", { screen: "AddWallet" })}
        />
      </View>

      <ScrollView nestedScrollEnabled>
        {wallets.map((wallet) => (
          <View
            style={
              wallet.isMain == true
                ? styles.mainMoneyContainer
                : styles.moneyContainer
            }
            key={wallet.id}
          >
            <Text style={styles.contentTitle}>{wallet.name} </Text>
            <Text style={styles.money}>
              {formatMoney(wallet.balance, settings.currency)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Wallet;
