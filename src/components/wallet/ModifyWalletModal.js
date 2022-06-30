import { Modal, FormControl, Input, Button, useToast, Box } from "native-base";
import Theme from "../../theme/mainTheme";
import style from "../../styles/wallet/walletModal";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import DataContext from "../../hooks/data/DataContext";
import AuthContext from "../../hooks/login-signup/AuthContext";
import { Text, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import axios from "axios";

export default function ModifyWalletModal(props) {
  const { showModal, setShowModal, currentWallet } = props;
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const { categories, setWallets, wallets } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  const toast = useToast();

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

  useEffect(() => {
    setData(currentWallet);
    setErrors({});
  }, [showModal]);

  const validate = async () => {
    if (formData.name === undefined || formData.name == "") {
      setErrors({
        ...errors,
        name: "Chưa có tên ví",
      });
      return false;
    }

    if (formData.balance === undefined || formData.balance == "") {
      setErrors({
        ...errors,
        balance: "Chưa nhập số dư",
      });
      return false;
    }
    // call HTTP
    setShowModal(false);
    try {
      const index = wallets.findIndex(w => w.id == currentWallet.id)
      let modified = [...wallets];
      if (index != -1) modified[index] = formData;
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
              Cập nhật ví thành công!
            </Box>
          );
        },
        placement: "top-right",
      });

      const res = await axios.put("/wallets", { data: modified }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

    } catch (error) { 
      console.log(error);
    } // offline
  };
  
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xl">
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Ví hiện tại</Modal.Header>
        <Modal.Body>
          <FormControl isRequired isInvalid={"name" in errors}>
            <Input
              bg="white"
              variant={style.input.variant}
              borderWidth={style.input.borderWidth}
              borderColor={style.input.borderColor}
              fontSize={style.input.fontSize}
              width={style.input.width}
              alignSelf={style.input.alignSelf}
              margin={style.input.margin}
              InputLeftElement={
                <Ionicons
                  name="wallet"
                  size={style.icon.size}
                  color={style.icon.color}
                  style={style.left_icon}
                />
              }
              placeholder="Tên ví"
              defaultValue={currentWallet?.name}
              onChangeText={(value) => {
                setData({
                  ...formData,
                  name: value,
                });
                delete errors.name;
              }}
            />
            {"name" in errors ? (
              <FormControl.ErrorMessage marginLeft="9" marginTop="0">
                {errors.name}
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={"balance" in errors}>
            <Input
              bg="white"
              variant={style.input.variant}
              borderWidth={style.input.borderWidth}
              borderColor={style.input.borderColor}
              fontSize={style.input.fontSize}
              width={style.input.width}
              alignSelf={style.input.alignSelf}
              margin={style.input.margin}              
              keyboardType="numeric"
              InputLeftElement={
                <FontAwesome
                  name="money"
                  size={style.icon.size}
                  color={style.icon.color}
                  style={style.left_icon}
                />
              }
              placeholder="Số dư"
              defaultValue={currentWallet?.balance.toString()}
              onChangeText={(value) => {
                setData({
                  ...formData,
                  balance: value,
                });
                delete errors.balance;
              }}
            />
            {"balance" in errors ? (
              <FormControl.ErrorMessage marginLeft="9" marginTop="0">
                {errors.balance}
              </FormControl.ErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>

          <FormControl style={{ alignItems: "center" }}>
            {/* <Input
              variant={style.input.variant}
              borderWidth={style.input.borderWidth}
              borderColor={style.input.borderColor}
              fontSize={style.input.fontSize}
              width={style.input.width}
              alignSelf={style.input.alignSelf}
              margin={style.input.margin}
              placeholder="Hạng mục"
              InputLeftElement={
                <Ionicons
                  name="menu-sharp"
                  size={style.icon.size}
                  color={style.icon.color}
                  style={style.left_icon}
                />
              }
              defaultValue={currentWallet?.categoryName}
              onChangeText={(value) => {
                setData({
                  ...formData,
                  category: value,
                });
                delete errors.category;
              }}
            /> */}
            <ModalSelector
              data={list}
              scrollViewAccessibilityLabel={"Scrollable options"}
              cancelButtonAccessibilityLabel={"Cancel Button"}
              onChange={(option) => {
                setData((prev) => ({
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
                width: 280,
                paddingVertical: 2,
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
                    paddingVertical: 5,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name={formData.categoryIcon}
                      size={28}
                      color="#4FB286"
                      style={{ marginRight: 12 }}
                    />
                    <Text style={{ fontSize: 15 }}>
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
                    size={style.icon.size}
                    color={style.icon.color}
                    style={{ marginRight: 12, marginLeft: 4 }}
                  />
                  <Text style={{ fontSize: 16, color: "#999" }}>Hạng mục</Text>
                </View>
              )}
            </ModalSelector>
          </FormControl>

          <FormControl>
            <Input
              bg="white"
              variant={style.input.variant}
              borderWidth={style.input.borderWidth}
              borderColor={style.input.borderColor}
              fontSize={style.input.fontSize}
              width={style.input.width}
              alignSelf={style.input.alignSelf}
              margin={style.input.margin}
              placeholder="Mô tả"
              InputLeftElement={
                <FontAwesome
                  name="credit-card"
                  size={style.icon.size}
                  color={style.icon.color}
                  style={style.left_icon}
                />
              }
              defaultValue={currentWallet?.desc}
              onChangeText={(value) => {
                setData({
                  ...formData,
                  desc: value,
                });
                delete errors.desc;
              }}
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
                setErrors({});
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
              onPress={() => {
                setErrors({});
                validate();
              }}
            >
              Lưu
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
