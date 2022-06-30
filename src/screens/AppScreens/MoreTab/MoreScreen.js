import { View, Text, Input, VStack, HStack, FlatList } from "native-base";
import styles from "../../../styles/more_screen/moreScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import AuthContext from "../../../hooks/login-signup/AuthContext";
import DataContext from "../../../hooks/data/DataContext";

export default function MoreScreen() {
  const { logout } = useContext(AuthContext);
  const { profile, username } = useContext(DataContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Xin chào {profile?.fullName || username}!
      </Text>
      {/* <Input
        w={{
          base: "95%",
        }}
        InputRightElement={
          <TouchableHighlight
            style={{ marginRight: 8 }}
            activeOpacity={0.8}
            underlayColor="#ECFCE5"
          >
            <AntDesign name="search1" size={24} color="#198155" />
          </TouchableHighlight>
        }
        placeholder="Tìm kiếm"
        style={styles.search}
        variant="rounded"
        borderColor="#198155"
        mb="28"
      /> */}
      <View style={styles.featureContainer}>
        <Text style={styles.containerTitle}>Tính năng</Text>
        <VStack space={6} alignItems="stretch" mt="4" marginX={8}>
          <HStack space={2} justifyContent="center">
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("Limit", { screen: "LimitScreen" })
              }
              activeOpacity={0.8}
              underlayColor="#ECFCE5"
              style={{
                width: "50%",
              }}
            >
              <View style={styles.featureItem}>
                <FontAwesome5 name="money-bill" size={40} color="#198155" />
                <Text style={styles.featureTitle}>Hạn mức chi</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#ECFCE5"
              onPress={() =>
                navigation.navigate("Category", { screen: "CategoryScreen" })
              }
              style={{
                width: "50%",
              }}
            >
              <View style={styles.featureItem}>
                <MaterialIcons name="category" size={40} color="#198155" />
                <Text style={styles.featureTitle}>Thêm hạng mục</Text>
              </View>
            </TouchableHighlight>
          </HStack>
          <HStack space={2} justifyContent="center">
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#ECFCE5"
              onPress={() =>
                navigation.navigate("ReportHistory", {
                  screen: "ReportHistoryScreen",
                })
              }
              style={{
                width: "50%",
              }}
            >
              <View style={styles.featureItem}>
                <FontAwesome name="bar-chart" size={40} color="#198155" />
                <Text style={styles.featureTitle}>Thống kê</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#ECFCE5"
              onPress={() =>
                navigation.navigate("Setting", { screen: "SettingScreen" })
              }
              style={{
                width: "50%",
              }}
            >
              <View style={styles.featureItem}>
                <Ionicons name="settings" size={40} color="#198155" />
                <Text style={styles.featureTitle}>Cài đặt chung</Text>
              </View>
            </TouchableHighlight>
          </HStack>
          <HStack space={2} justifyContent="center">
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#ECFCE5"
              onPress={() =>
                navigation.navigate("Account", { screen: "AccountScreen" })
              }
              style={{
                width: "50%",
              }}
            >
              <View style={styles.featureItem}>
                <FontAwesome name="user" size={40} color="#198155" />
                <Text style={styles.featureTitle}>Tài khoản</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#ECFCE5"
              onPress={logout}
              style={{
                width: "50%",
              }}
            >
              <View style={styles.featureItem}>
                <MaterialIcons name="logout" size={40} color="#198155" />
                <Text style={styles.featureTitle}>Đăng xuất</Text>
              </View>
            </TouchableHighlight>
          </HStack>
        </VStack>
      </View>
    </View>
  );
}
