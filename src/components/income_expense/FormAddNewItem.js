import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/income_expense/FormStyle";
import {
  Button,
  Radio,
  Input,
  FormControl,
  Select,
  TextArea,
  Modal,
  useToast,
  Box,
  Spinner,
  HStack,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AntDesign } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DataContext from "../../hooks/data/DataContext";
import AuthContext from "../../hooks/login-signup/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import axios from "axios";

import { print, formatAmountOnly, formatCurrencyOnly, formatDate } from "src/utils";

const FormAddNewItem = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [type, setType] = useState("1");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const {
    categories,
    debits,
    setDebits,
    wallets,
    setWallets,
    settings,
    solveDebit,
    setSolveDebit,
  } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  const toast = useToast();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    categoryName: "Chung",
    categoryIcon: "apps",
    date: new Date(),
    desc: "",
    walletId: "",
  });

  useEffect(
    () =>
      setFormData({
        ...formData,
        walletId: wallets.findIndex((w) => w.isMain),
      }),
    [wallets]
  );
  
  useEffect(() => {
    if (solveDebit) {
      console.log(solveDebit);
      setType(solveDebit.isDebt ? "1" : "0");
      setFormData({
        amount: String(solveDebit.amount),
        categoryName: solveDebit.categoryName,
        categoryIcon: solveDebit.categoryIcon,
        date: new Date(),
        walletId: wallets?.findIndex(w => w.isMain),
        desc: `Thanh toán cho khoản ${solveDebit.name}`
      })
    }
  }, [solveDebit]);
  
  const list = categories.map((item) => ({
    key: item.id || item._id,
    label: item.name,
    value: item.icon,
    component: (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name={item.icon} size={24} color="#198155" />
        <Text style={{ fontSize: 16, marginLeft: 6 }}>{item.name}</Text>
      </View>
    ),
  }));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate ? selectedDate : new Date();
    setShow(false);
    setFormData((prev) => ({ ...prev, date: currentDate }));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleSubmit = async () => {
    if (formData.amount === "") {
      setErrors({ ...errors, amount: "Vui lòng nhập số tiền" });
      return;
    }
    if (formData.categoryName === "") {
      setErrors({ ...errors, category: "Vui lòng chọn hạng mục" });
      return;
    }
    if (formData.walletId === "") {
      setErrors({ ...errors, wallet: "Vui lòng chọn ví" });
      return;
    }
    const data = {
      ...formData,
      amount: type === "1" ? -Number(formData.amount) : Number(formData.amount),
    };

    setLoading(true);
    try {
      if (solveDebit) {
        const deleted = debits.filter((db) => db.id != solveDebit.id);
        setDebits(deleted);
        setSolveDebit(null);
        await axios
          .put("/debits", deleted, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .catch((err) => console.log(err));
      }

      const index = wallets.findIndex((w) => w.id == formData.walletId);
      if (index != -1) {
        let modified = [...wallets];
        modified[index].transactions.push(data);
        modified[index].balance =
          Number(modified[index].balance) + Number(data.amount);
        setWallets(modified);
        toast.show({
          render: () => {
            return (
              <Box
                bg="emerald.500"
                rounded="sm"
                mb={5}
                px="2"
                py="2"
                mr="2"
                _text={{
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "warmGray.50",
                  letterSpacing: "lg",
                }}
              >
                Thêm khoản thu chi thành công!
              </Box>
            );
          },
          placement: "top-right",
        });
        const res = await axios.put(
          "/wallets",
          { data: modified },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
      }
    } catch (error) {
      // offline
      console.log(error);
      setLoading(false);
    }

    setFormData({
      amount: "",
      categoryName: "Chung",
      categoryIcon: "apps",
      date: new Date(),
      desc: "",
      walletId: wallets.findIndex((w) => w.isMain),
    });
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={false}
    >
      <ScrollView style={{ marginBottom: tabBarHeight + 4 }}>
        <FormControl style={styles.container}>
          <FormControl.Label>Thu/Chi</FormControl.Label>
          <Radio.Group
            name="type"
            value={type}
            onChange={(nextValue) => {
              setType(nextValue);
              if (solveDebit) setSolveDebit(null);
            }}
            style={styles.radioGroup}
            accessibilityLabel="favorite number"
            my="1"
            // size="sm"
          >
            <Radio value="1" my={1} colorScheme="success">
              <Text style={{ fontSize: 14, marginRight: 12 }}>
                Thêm khoản chi
              </Text>
            </Radio>
            <Radio value="0" my={1} colorScheme="success">
              <Text style={{ fontSize: 14 }}>Thêm khoản thu</Text>
            </Radio>
          </Radio.Group>

          <FormControl isRequired isInvalid={"amount" in errors}>
            <FormControl.Label>Số tiền</FormControl.Label>
            <Input
              fontSize={14}
              type="number"
              placeholder="100.000"
              variant="rounded"
              bg="white"
              my="1"
              borderWidth={2}
              borderColor="#4fb286"
              keyboardType="numeric"
              InputLeftElement={
                <Ionicons
                  name="cash"
                  size={24}
                  color="#999"
                  style={{ marginLeft: 12 }}
                />
              }
              value={formData.amount}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, amount: text }));
                if (solveDebit) setSolveDebit(null);
                delete errors.amount;
              }}
            />
            {"amount" in errors ? (
              <FormControl.ErrorMessage marginLeft="4" marginTop="0">
                {errors.amount}
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={"category" in errors}>
            <FormControl.Label> Hạng mục</FormControl.Label>
            <ModalSelector
              data={list}
              scrollViewAccessibilityLabel={"Scrollable options"}
              cancelButtonAccessibilityLabel={"Cancel Button"}
              onChange={(option) => {
                setFormData((prev) => ({
                  ...prev,
                  categoryName: option.label,
                  categoryIcon: option.value,
                }));
                if (solveDebit) setSolveDebit(null);
                delete errors.category;
              }}
              style={{
                borderRadius: 24,
                backgroundColor: "white",
                paddingHorizontal: 12,
                borderWidth: 2,
                borderColor: "category" in errors ? "#4FB286" : "#4FB286",
                // width: 280,
                // paddingVertical: 2,
                // marginLeft: 5,
                marginVertical: 4,
                // marginHorizontal: ,
              }}
              optionContainerStyle={{
                backgroundColor: "#ECFCE5",
                marginHorizontal: 30,
              }}
              cancelContainerStyle={{ marginHorizontal: 60 }}
              cancelStyle={{
                backgroundColor: "#FF9800",
              }}
              cancelTextStyle={{ color: "#ECFCE5" }}
              optionStyle={{ flexDirection: "row", justifyContent: "center" }}
            >
              {formData?.categoryName ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 7,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name={formData.categoryIcon}
                      size={28}
                      color="#4FB286"
                      style={{ marginRight: 12 }}
                    />
                    <Text style={{ fontSize: 14 }}>
                      {formData.categoryName}
                    </Text>
                  </View>
                  <Ionicons name="chevron-down" size={22} color="#999" />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 9,
                  }}
                >
                  <Ionicons
                    name="menu-sharp"
                    size={24}
                    color="#999"
                    style={{ marginRight: 12 }}
                  />
                  <Text style={{ fontSize: 12, color: "#999" }}>Hạng mục</Text>
                </View>
              )}
            </ModalSelector>
            {"category" in errors ? (
              <FormControl.ErrorMessage marginLeft="4" marginTop="0">
                {errors.category}
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label>Thời gian</FormControl.Label>
            <TouchableOpacity
              onPress={() => {
                showDatepicker();
                if (solveDebit) setSolveDebit(null);
              }}
            >
              <Input
                fontSize={14}
                my="1"
                bg="white"
                w={{
                  md: "100%",
                }}
                variant="rounded"
                type="date"
                borderWidth={2}
                borderColor="#4fb286"
                InputLeftElement={
                  <Ionicons
                    name="calendar"
                    size={24}
                    color="#7a7975"
                    onPress={showDatepicker}
                    style={{
                      marginLeft: 12,
                    }}
                  />
                }
                placeholder="Thời gian"
                value={formatDate(formData.date, "dd/mm/yyyy")}
                editable={false}
              />
            </TouchableOpacity>
          </FormControl>

          <FormControl isRequired isInvalid={"wallet" in errors}>
            <FormControl.Label>Ví tiền</FormControl.Label>
            <Select
              fontSize={14}
              my="1"
              bg="white"
              borderRadius="full"
              borderWidth={2}
              borderColor="#4fb286"
              selectedValue={formData.walletId}
              minWidth="100%"
              accessibilityLabel="Chọn ví tiền"
              placeholder="Chọn ví tiền"
              _selectedItem={{
                bg: "teal.600",
              }}
              onValueChange={(itemValue) => {
                setFormData((prev) => ({ ...prev, walletId: itemValue }));
                if (solveDebit) setSolveDebit(null);
                delete errors.wallet;
              }}
              InputLeftElement={
                <Ionicons
                  name="wallet"
                  size={24}
                  color="#999"
                  style={{ marginLeft: 12 }}
                />
              }
            >
              {wallets?.map((item) => (
                <Select.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Select>
            {"wallet" in errors ? (
              <FormControl.ErrorMessage marginLeft="4" marginTop="0">
                {errors.wallet}
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>

          <FormControl>
            <FormControl.Label> Mô tả</FormControl.Label>
            <TextArea
              fontSize={14}
              my="1"
              bg="white"
              borderRadius="2xl"
              borderWidth={2}
              borderColor="#4fb286"
              value={formData.desc}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, desc: text }));
                if (solveDebit) setSolveDebit(null);
              }}
              w="100%"
              minHeight="100px"
              placeholder="Mô tả"
            />
          </FormControl>
          <Button
            fontSize="xl"
            my="2"
            mx="auto"
            py="3"
            style={{
              backgroundColor: "#4FB286",
            }}
            w="80%"
            shadow="4"
            onPress={() => {
              handleSubmit();
            }}
          >
            <HStack>
              <Text style={{ fontSize: 18, color: "#fff" }}>Thêm</Text>
              {loading && <Spinner />}
            </HStack>
          </Button>
          <View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date || new Date()}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
        </FormControl>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default FormAddNewItem;
