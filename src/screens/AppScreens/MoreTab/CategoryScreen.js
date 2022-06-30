import { View, Text } from "react-native";
import React, { useState } from "react";
import styles from "src/styles/category/MainStyle";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "native-base";
import CategoryItem from "src/components/category/CategoryItem";
import Modals from "src/components/category/Modals";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import DataContext from "../../../hooks/data/DataContext";

const CategoryScreen = () => {
  const { categories, setCategories } = useContext(DataContext);
  const [isEdit, setIsEdit] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [category, setCategory] = useState({ name: "", icon: "fast-food", id: categories[categories.length - 1] + 1 || 0 });
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={{ ...styles.container, marginBottom: tabBarHeight }}>
      <View style={styles.header}>
        <Text style={styles.title}>Thêm hạng mục</Text>
        <View style={styles.addIcon}>
          <Ionicons
            name="add-circle"
            size={48}
            color="#198155"
            onPress={() => {
              setCategory({ name: "", icon: "fast-food" });
              setIsEdit(false);
              setShowAddModal(true);
            }}
          />
        </View>
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            setIsEdit={setIsEdit}
            setShowAddModal={setShowAddModal}
            setShowDeleteModal={setShowDeleteModal}
            setCategory={setCategory}
          />
        )}
        keyExtractor={(item, index) => index}
      />
      <Modals
        isEdit={isEdit}
        showAddModal={showAddModal}
        showDeleteModal={showDeleteModal}
        setIsEdit={setIsEdit}
        setShowAddModal={setShowAddModal}
        setShowDeleteModal={setShowDeleteModal}
        category={category}
        setCategory={setCategory}
        setCategories={setCategories}
      />
    </View>
  );
};

export default CategoryScreen;
