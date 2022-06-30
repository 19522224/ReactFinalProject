import { View, Text } from "react-native";
import React from "react";
import styles from "../../styles/category/ItemStyle";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CategoryItem = ({
  item,
  setIsEdit,
  setShowAddModal,
  setShowDeleteModal,
  setCategory,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name={item.icon} size={30} color="#0065D0" />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.actions}>
        <Entypo
          name="pencil"
          size={24}
          color="#198155"
          style={{ marginRight: 16 }}
          onPress={() => {
            setCategory(item);
            setIsEdit(true);
            setShowAddModal(true);
          }}
        />
        <Entypo
          name="trash"
          size={24}
          color="#D3180C"
          onPress={() => {
            setShowDeleteModal(true);
            setCategory(item);
          }}
        />
      </View>
    </View>
  );
};

export default CategoryItem;
