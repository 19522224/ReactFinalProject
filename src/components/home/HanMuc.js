import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import React, {
  useContext,
} from "react";
import styles from "../../styles/home/HanMucStyle";
import DataContext from "../../hooks/data/DataContext";

// Navigation
import { useNavigation } from "@react-navigation/native";
import { print, formatMoney, getTotalTransactionsAmountInTimeRange } from "src/utils";

const HanMuc = () => {
  const navigation = useNavigation();
  const { wallets, limits, settings } = useContext(DataContext);

  const currentWallet = wallets?.find(wallet => wallet.isMain);

  const totalTransactionsAmountDaily = getTotalTransactionsAmountInTimeRange(
    currentWallet?.transactions, 
    -1, 
    "day"
  );

  const limitIsActive = limits.daily.isActive;
  const limitDaily = Number(limits.daily.limit) || 1; // prevent division by 0

  const progressScale = (limitIsActive)? 
    Math.min(1, Math.abs(totalTransactionsAmountDaily) / limitDaily) :
    0;
  const progressColor = progressScale >= 0.66? "#d3180c" : "#f2b3ae";

  // print(totalTransactionsAmountDaily, "total transactions daily");
  // print(limitDaily, "limit daily");
  // print(progressScale, "progress scale");


  return (
    <View style={styles.hanmucContainer}>
      <View style={styles.hanmucTop}>
        <Text style={styles.hanmucTitle}>Hạn mức chi</Text>
        <AntDesign
          name="arrowright"
          size={24}
          color="#198155"
          onPress={() => navigation.navigate("Khác", { screen: "Limit" })}
        />
      </View>
      <View style={styles.hanmucInfo}>
        <Text style={styles.hanmucDate}>Hạn mức chi hôm nay</Text>
        <Text style={styles.hanmucMoney}>
          {limits.daily.isActive ?
            formatMoney(limitDaily, settings.currency)
            : "Chưa đặt"}
        </Text>
      </View>

      <Progress.Bar
        animated={false}
        progress={progressScale}   
        width={null}     // automatic flexbox sizing
        height={24}
        borderWidth={0}
        borderRadius={16}
        color={progressColor}
        unfilledColor="#c4c4c4"
        style={{
          marginVertical: 8
        }}
      />

      <View style={styles.hanmucInfoBottom}>
        <Text style={styles.hanmucDateLeft}>Đã tiêu</Text>
        <Text style={{...styles.hanmucMoneyLeft, color: progressColor}}>
          {formatMoney(Math.abs(totalTransactionsAmountDaily), settings.currency)}
        </Text>
      </View>
    </View>
  );
};

export default HanMuc;
