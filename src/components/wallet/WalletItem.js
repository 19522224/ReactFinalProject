import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { formatMoney } from "src/utils";
import { Divider } from "native-base";
import { Badge } from 'native-base';

const WalletItem = ({ wallet, settings, setCurrentWallet, setShowModal2, setHold }) => {
  return (
    <TouchableOpacity
      style={wallet.isMain? style.mainCard : style.card}
      onPress={() => {
        setCurrentWallet(wallet);
        setShowModal2(true);
      }}
      onLongPress={() => {
        setCurrentWallet(wallet);
        setHold(true);
      }}
      delayLongPress={100}
    >
      <Text style={style.name}>{wallet.name}</Text>
      <Divider my="1" />
      <View style={style.textContainer}>
        <FontAwesome5
          name="coins"
          size={28}
          color="#198155"
          style={style.icon}
        />
        <Text style={style.tit}>Số dư</Text>
        <Text style={[style.value, { color: "green" }]}>{formatMoney(wallet.balance, settings.currency)}</Text>
      </View>
      <Divider my="1" />
      <View style={style.textContainer}>
        <MaterialIcons
          name="category"
          size={28}
          color="#198155"
          style={style.icon}
          />
        <Text style={style.tit}>Hạng mục</Text>
        <Text style={style.value}>{wallet.categoryName}</Text>
      </View>
      <Divider my="1" />
      <View style={style.textContainer}>
        <FontAwesome
          name="credit-card-alt"
          size={28}
          color="#198155"
          style={style.icon}
        />
        <Text style={style.tit}>Mô tả</Text>
        <Text style={style.value}>{wallet.desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WalletItem;

const style = StyleSheet.create({
  card: {
    backgroundColor: "#ECFCE5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 15,
    paddingLeft: 8,
    paddingRight: 24,
    paddingVertical: 12,
    marginBottom: 12,
    width: "90%",
    marginHorizontal: "5%",
  },
  mainCard: {
    backgroundColor: "#f3f788",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 15,
    paddingLeft: 8,
    paddingRight: 24,
    paddingVertical: 12,
    marginBottom: 12,
    width: "90%",
    marginHorizontal: "5%",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#555",
    marginBottom: 8,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  value: {
    flex: 2,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  tit: {
    flex: 2,
    textAlign: "left",
    fontSize: 14,
    color: "#555",
  },
  icon: {
    flex: 1,
    textAlign: "center",
  },
});
