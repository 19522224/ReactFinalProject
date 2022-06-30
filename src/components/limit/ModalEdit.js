import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { Modal, Input, Button, useToast, Box } from "native-base";
import styles from "../../styles/limit/ModalStyle";
import { Entypo } from "@expo/vector-icons";
import AuthContext from "../../hooks/login-signup/AuthContext";
import DataContext from "../../hooks/data/DataContext";
import axios from "axios";

const ModalEdit = ({ showModal, setShowModal, limit, setLimit }) => {
  const { token } = useContext(AuthContext);
  const { setLimits, limits } = useContext(DataContext);
  const [disable, setDisable] = useState(true);
  const toast = useToast();

  const handleSubmit = async () => {
    setLimit({});
    setShowModal(false);
    const typ =
      (limit.type === "Trong ngày" && "daily") ||
      (limit.type === "Trong tuần" && "weekly") ||
      (limit.type === "Trong tháng" && "monthly");
    const data = {
      [typ]: {
        isActive: limit.isActive,
        limit: limit.limit,
      },
    };
    try {
      setLimits({ ...limits, ...data });
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
              Cập nhật hạn mức thành công!
            </Box>
          );
        },
        placement: "top-right",
      });
      const res = await axios.put("/limits", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } // offline
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content
        w="90%"
        style={{ backgroundColor: " rgba(236, 252, 229, 1)", padding: 20 }}
      >
        <Modal.Body>
          <Text style={styles.title}>Đặt hạn mức chi</Text>
          <Text style={styles.label}>Nhập hạn mức chi mới</Text>
          <Input
            bg="white"
            borderColor="#4fb286"
            borderWidth={2}
            fontSize="xl"
            mt="1"
            mb="4"
            variant="rounded"
            type="number"
            keyboardType="numeric"
            InputRightElement={
              <Entypo
                name="pencil"
                size={24}
                color="#198155"
                style={{ marginRight: 8 }}
              />
            }
            placeholder="200.000 đ"
            value={(limit.limit && String(limit.limit)) || ""}
            onChangeText={(value) => {
              setDisable(value === "");
              setLimit({ ...limit, limit: Number(value) });
            }}
          />

          <View style={styles.actions}>
            <Button
              py="3"
              px="8"
              style={{
                backgroundColor: "#D3180C",
              }}
              onPress={() => {
                setLimit("");
                setShowModal(false);
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              py="3"
              px="8"
              style={{
                backgroundColor: "#4FB286",
              }}
              onPress={handleSubmit}
              isDisabled={disable}
            >
              Xác nhận
            </Button>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ModalEdit;
