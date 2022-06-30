import { ScrollView, Text, TouchableOpacity, View, Button } from "react-native";
import React, { useContext, useState } from "react";
import { Fab } from "native-base";
import AddDebitModal from "src/components/wallet/AddDebitModal";
import ModifyDebitModal from "src/components/wallet/ModifyDebitModal";

import { AntDesign } from "@expo/vector-icons";
import style from "../../../styles/wallet/AddRemoveDebit";
import DebitLongPress from "../../../components/wallet/DebitLongPress";
import DebitItem from "../../../components/wallet/DebitItem";
import Debit from "./../../../components/wallet/Debit";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import DataContext from "../../../hooks/data/DataContext";
import { useIsFocused } from '@react-navigation/native';

const AddDebitScreen = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [hold, setHold] = useState(false);
  const [currentDebit, setCurrentDebit] = useState();
  const tabBarHeight = useBottomTabBarHeight();
  const { debits } = useContext(DataContext);
  const isFocused = useIsFocused();

  return (
    <>
      <View style={[style.container, { marginBottom: tabBarHeight }]}>
        <Text style={style.title}>Sổ ghi nợ</Text>
        <ScrollView>
          {debits.map((debit) => (
            <DebitItem
              debit={debit}
              setCurrentDebit={setCurrentDebit}
              setShowModal2={setShowModal2}
              setHold={setHold}
              key={debit.id}
            />
          ))}
        </ScrollView>

        <AddDebitModal showModal={showModal1} setShowModal={setShowModal1} />
        <ModifyDebitModal
          showModal={showModal2}
          setShowModal={setShowModal2}
          currentDebit={currentDebit}
          setCurrentDebit={setCurrentDebit}
        />
        <DebitLongPress
          hold={hold}
          setHold={setHold}
          currentDebit={currentDebit}
          setShowModal2={setShowModal2}
        />
        {isFocused && <Fab
          position="absolute"
          size="sm"
          bgColor="#4FB286"
          onPress={() => setShowModal1(true)}
          marginBottom={12}
          icon={<AntDesign name="pluscircleo" size={24} color="white" />}
        />}
      </View>
    </>
  );
};

export default AddDebitScreen;
