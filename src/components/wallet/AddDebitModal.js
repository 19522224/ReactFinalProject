import {
  Modal,
  FormControl,
  Input,
  Button,
  Radio,
  Select,
  TextArea,
  Box,
  useToast,
} from "native-base";
import { useContext, useState, useEffect } from "react";
import Theme from "../../theme/mainTheme";
import { View, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalSelector from "react-native-modal-selector";
import axios from "axios";
import AuthContext from "../../hooks/login-signup/AuthContext";
import DataContext from "../../hooks/data/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from "moment";
import { formatDate } from "src/utils";

export default function AddDebitModal(props) {
  const { showModal, setShowModal } = props;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { categories, setDebits, debits, settings } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    isDebt: true,
    amount: "",
    categoryName: "",
    categoryIcon: "",
    desc: "",
    deadline: new Date(),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      name: "",
      isDebt: true,
      amount: "",
      categoryName: "Chung",
      categoryIcon: "apps",
      desc: "",
      deadline: new Date(),
      id: debits[debits.length - 1]?.id + 1 || 0,
    });
    setErrors({});
  }, [showModal]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    // setDate(currentDate);
    setFormData((prev) => ({ ...prev, deadline: currentDate }));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const list = categories.map((item) => ({
    key: item.id,
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

  const handleSubmit = async () => {
    if (formData.name === "") {
      setErrors({ ...errors, name: "Tên ghi nợ không được để trống" });
    } else if (formData.amount === "") {
      setErrors({ ...errors, amount: "Số tiền không được để trống" });
    } else {
      setShowModal(false);
      try {
        setDebits([...debits, formData]);
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
                Thêm khoản ghi nợ thành công!
              </Box>
            );
          },
          placement: "top-right",
        });
        const res = await axios.put("/debits", [...debits, formData], {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      } catch (error) {
        console.log(error);
      } // no internet
      setFormData({
        name: "",
        isDebt: true,
        amount: "",
        categoryName: "",
        categoryIcon: "",
        desc: "",
        deadline: new Date(),
      });
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xl">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Khoản nợ hiện tại</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Thể loại</FormControl.Label>
            <Radio.Group
              name="type"
              value={formData.isDebt}
              onChange={(nextValue) => {
                setFormData((prev) => ({ ...prev, isDebt: nextValue }));
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              accessibilityLabel="favorite number"
              my="1"
            >
              <Radio value={true} my={1} colorScheme="success">
                <Text style={{ fontSize: 14 }}>Khoản nợ</Text>
              </Radio>
              <Radio value={false} my={1} colorScheme="success">
                <Text style={{ fontSize: 14, marginRight: 12 }}>
                  Khoản cho nợ
                </Text>
              </Radio>
            </Radio.Group>
          </FormControl>
          <FormControl isRequired isInvalid={"name" in errors} my="2">
            {/* <FormControl.Label>Tên khoản nợ</FormControl.Label> */}
            <Input
              fontSize={14}
              variant="rounded"
              bg="white"
              borderWidth={2}
              borderColor="#4fb286"
              placeholder="Tên khoản nợ"
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, name: text }));
                delete errors.name;
              }}
              value={formData.name}
              InputLeftElement={
                <FontAwesome5
                  name="money-check-alt"
                  size={18}
                  color="#999"
                  style={{ marginLeft: 12 }}
                />
              }
            />
            {"name" in errors ? (
              <FormControl.ErrorMessage marginLeft="4" marginTop="0">
                {errors.name}
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={"amount" in errors} my="2">
            {/* <FormControl.Label>Số tiền</FormControl.Label> */}
            <Input
              fontSize={14}
              variant="rounded"
              bg="white"
              borderWidth={2}
              borderColor="#4fb286"
              placeholder="Số tiền"
              keyboardType="numeric"
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, amount: text }));
                delete errors.amount;
              }}
              value={formData.amount}
              InputLeftElement={
                <MaterialIcons
                  name="attach-money"
                  size={24}
                  color="#999"
                  style={{ marginLeft: 12 }}
                />
              }
            />
            {"amount" in errors ? (
              <FormControl.ErrorMessage marginLeft="4" marginTop="0">
                {errors.amount}
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl my="2">
            {/* <FormControl.Label>Hạng mục</FormControl.Label> */}
            {/* <Input /> */}
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
              }}
              style={{
                borderRadius: 24,
                backgroundColor: "white",
                paddingHorizontal: 12,
                borderColor: "#4FB286",
                borderWidth: 2,
                // borderWidth: 1,
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
                    style={{ marginRight: 12, marginLeft: 4 }}
                  />
                  <Text style={{ fontSize: 13, color: "#999" }}>Hạng mục</Text>
                </View>
              )}
            </ModalSelector>
          </FormControl>
          <FormControl my="2">
            {/* <FormControl.Label> Thời hạn thanh toán</FormControl.Label> */}
            {/* <Input /> */}
            <TouchableOpacity onPress={showDatepicker}>
              <Input
                fontSize={14}
                type="date"
                variant="rounded"
                bg="white"
                borderWidth={2}
                borderColor="#4fb286"
                InputLeftElement={
                  <AntDesign
                    name="calendar"
                    size={24}
                    color="#7a7975"
                    onPress={showDatepicker}
                    style={{
                      // marginRight: 8,
                      marginLeft: 13,
                    }}
                  />
                }
                placeholder="Thời gian"
                value={formatDate(
                  formData.deadline || new Date(),
                  settings.dateFormat
                )}
                editable={false}
              />
            </TouchableOpacity>
          </FormControl>
          <FormControl my="2">
            {/* <FormControl.Label>Mô tả</FormControl.Label> */}
            <TextArea
              fontSize={14}
              h={20}
              borderRadius="20"
              borderWidth={2}
              borderColor="#4fb286"
              placeholder="Mô tả"
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, desc: text }));
              }}
              value={formData.desc}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer justifyContent="center">
          <Button.Group>
            <Button
              marginX={10}
              size="lg"
              backgroundColor={Theme.danger}
              shadow="9"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Hủy
            </Button>
            <Button
              marginX={10}
              size="lg"
              backgroundColor={Theme.darkGreen}
              shadow="9"
              onPress={handleSubmit}
            >
              Lưu
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
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
    </Modal>
  );
}
