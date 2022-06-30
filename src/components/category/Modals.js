import { View, Text } from "react-native";
import ModalSelector from "react-native-modal-selector";
import React, { useContext, useState } from "react";
import { Center, Modal, Input, Button, useToast, Box } from "native-base";
import styles from "../../styles/category/ModalStyle";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AuthContext from "../../hooks/login-signup/AuthContext";
import { useEffect } from "react";
import DataContext from "../../hooks/data/DataContext";

let index = 0;
const icons = [
  {
    key: index++,
    label: "",
    value: "apps",
    component: <Ionicons name="apps" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "fast-food",
    component: <Ionicons name="fast-food" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "home",
    component: <Ionicons name="home" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "bulb",
    component: <Ionicons name="bulb" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "bicycle",
    component: <Ionicons name="bicycle" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "build",
    component: <Ionicons name="build" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "basket",
    component: <Ionicons name="basket" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "analytics",
    component: <Ionicons name="analytics" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "alert",
    component: <Ionicons name="alert" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "bandage",
    component: <Ionicons name="bandage" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "barbell",
    component: <Ionicons name="barbell" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "beer",
    component: <Ionicons name="beer" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "body",
    component: <Ionicons name="body" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "book",
    component: <Ionicons name="book" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "bus",
    component: <Ionicons name="bus" size={24} color="#198155" />,
  },
  {
    key: index++,
    label: "",
    value: "cafe",
    component: <Ionicons name="cafe" size={24} color="#198155" />,
  },
];

const Modals = ({
  isEdit,
  showAddModal,
  setShowAddModal,
  showDeleteModal,
  setShowDeleteModal,
  category,
  setCategory,
  setCategories,
}) => {
  // const [iconName, setIconName] = useState(category.icon || "fast-food");
  const [initItem, setInitItem] = useState({ ...category });
  const [disable, setDisable] = useState(true);
  const { token } = useContext(AuthContext);
  const { categories } = useContext(DataContext);

  const toast = useToast();
  const handleSubmit = async () => {
    setDisable(true);
    setShowAddModal(false);
    if (isEdit) {
      // update
      console.log(categories);
      console.log(category);
      const index = categories.findIndex(c => c.id == category.id);
      console.log(index);
      let modified = [...categories];
      if (index != -1) modified[index] = category;
      try {
        setCategories(modified);
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
                Cập nhật hạng mục thành công!
              </Box>
            );
          },
          placement: "top-right",
        });
        const res = await axios.put("/categories", modified, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      } catch (error) {
        console.log(error);
      } // offline
    } else {
      try {
        category.id = categories[categories.length - 1].id + 1 || 0;
        setCategories([...categories, category]);
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
                Thêm hạng mục thành công!
              </Box>
            );
          },
          placement: "top-right",
        });
        const res = await axios.put("/categories", [...categories, category], {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      } catch (error) {
        console.log(error)
      } // offline
    }
    // setShowAddModal(false);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    try {
      const deleted = categories.filter(c => c.id != category.id);
      setCategories(deleted);
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
              Xóa hạng mục thành công!
            </Box>
          );
        },
        placement: "top-right",
      });
      const res = await axios.put("/categories", deleted, {
        headers: {
          Authorization: "Bearer " + token,
        }
      });
    } catch (error) { } // offline
  };
  
  return (
    <Center>
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <Modal.Content
          w="90%"
          style={{ backgroundColor: " rgba(236, 252, 229, 1)", padding: 20 }}
          >
          <Modal.Body>
            <Text style={styles.title}>
              {isEdit ? "Sửa hạng mục" : "Thêm hạng mục mới"}
            </Text>
            <Text style={styles.label}>Tên hạng mục</Text>
            <Input
              bg="white"
              borderColor="#4fb286"
              borderWidth={2}
              fontSize="xl"
              mt="1"
              mb="4"
              variant="rounded"
              InputLeftElement={
                <Entypo
                  name="menu"
                  size={24}
                  color="#198155"
                  style={{ marginLeft: 8 }}
                />
              }
              placeholder="Ăn sáng"
              value={category.name}
              onChangeText={(text) => {
                if (isEdit) setDisable(text === initItem.name);
                setCategory((prev) => ({ ...prev, name: text }));
              }}
            />
            <View style={styles.iconSelection}>
              <Text style={styles.iconText}>Icon</Text>
              <ModalSelector
                data={icons}
                scrollViewAccessibilityLabel={"Scrollable options"}
                cancelButtonAccessibilityLabel={"Cancel Button"}
                onChange={(option) => {
                  if (isEdit) setDisable(option.value === initItem.icon);
                  setCategory((prev) => ({ ...prev, icon: option.value }));
                }}
                style={{
                  borderRadius: 24,
                  backgroundColor: "#4FB286",
                  // backgroundColor: "white",
                  // borderWidth: 2,
                  // borderColor: "#4FB286",
                  paddingHorizontal: 12,
                }}
                optionContainerStyle={{
                  backgroundColor: "#ECFCE5",
                  marginHorizontal: 60,
                }}
                cancelContainerStyle={{ marginHorizontal: 60 }}
                cancelStyle={{
                  backgroundColor: "#FF9800",
                }}
                cancelTextStyle={{ color: "#ECFCE5" }}
                optionStyle={{ flexDirection: "row", justifyContent: "center" }}
              >
                <View style={styles.selection}>
                  <Ionicons
                    name={category.icon || "fast-food"}
                    size={28}
                    color="#ECFCE5"
                    style={{ marginRight: 16 }}
                  />
                  <Ionicons name="chevron-down" size={22} color="#ECFCE5" />
                </View>
              </ModalSelector>
            </View>
            <View style={styles.actions}>
              <Button
                py="3"
                px="8"
                style={{
                  backgroundColor: "#D3180C",
                }}
                onPress={() => {
                  setShowAddModal(false);
                }}
                shadow="5"
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
                shadow="5"
                isDisabled={isEdit ? disable : category.name === ""}
              >
                Xác nhận
              </Button>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Content
          w="90%"
          style={{ backgroundColor: " rgba(236, 252, 229, 1)", padding: 20 }}
        >
          <Modal.Body>
            <Text style={styles.title}>Xóa hạng mục</Text>

            <Text style={styles.confirmText}>
              Bạn có chắc chắn muốn xóa hạng mục này không?
            </Text>
            <View style={styles.actions}>
              <Button
                py="3"
                px="8"
                style={{
                  backgroundColor: "#D3180C",
                }}
                onPress={() => setShowDeleteModal(false)}
                shadow="5"
              >
                Hủy bỏ
              </Button>
              <Button
                py="3"
                px="8"
                style={{
                  backgroundColor: "#4FB286",
                }}
                onPress={handleDelete}
                shadow="5"
              >
                Xác nhận
              </Button>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default Modals;
