import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Fab } from "native-base";
import AddModal from "src/components/wallet/AddWalletModal";
import ModifyWalletModal from "src/components/wallet/ModifyWalletModal";
import WalletLongPress from "../../../components/wallet/WalletLongPress";

import { AntDesign } from "@expo/vector-icons";
import style from "src/styles/wallet/AddRemoveWallet";
import WalletItem from "../../../components/wallet/WalletItem";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from '@react-navigation/native';
import DataContext from '../../../hooks/data/DataContext';

const AddWalletScreen = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [hold, setHold] = useState(false);
  const [currentWallet, setCurrentWallet] = useState();
  const tabBarHeight = useBottomTabBarHeight();
  const { wallets, settings } = useContext(DataContext);
  const isFocused = useIsFocused();

  return (
    <View style={[style.container, { marginBottom: tabBarHeight }]}>
      <Text style={style.title}>Thêm/Xóa ví</Text>
      <ScrollView>
        {wallets.map((wallet) => (
          <WalletItem
            wallet={wallet}
            settings={settings}
            setCurrentWallet={setCurrentWallet}
            setShowModal2={setShowModal2}
            setHold={setHold}
            key={wallet.id}
          />
        ))}
      </ScrollView>

      <AddModal showModal={showModal1} setShowModal={setShowModal1} />
      <ModifyWalletModal
        showModal={showModal2}
        setShowModal={setShowModal2}
        currentWallet={currentWallet}
      />
      <WalletLongPress
        hold={hold}
        setHold={setHold}
        currentWallet={currentWallet}
        setShowModal2={setShowModal2}
      />
      {isFocused &&<Fab
        position="absolute"
        size="sm"
        bgColor="#4FB286"
        onPress={() => setShowModal1(true)}
        marginBottom={12}
        icon={<AntDesign name="pluscircleo" size={24} color="white" />}
      />}
    </View>
  );
};

export default AddWalletScreen;
