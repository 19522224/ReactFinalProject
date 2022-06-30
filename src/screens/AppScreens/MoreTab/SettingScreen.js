import { Box, Button, HStack, Select, VStack } from "native-base";
import { View, Text, ScrollView, Switch } from "react-native";
import styles from "../../../styles/more_screen/settingSceenStyle";
import { AntDesign } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useContext, useEffect } from "react";
import DataContext from "../../../hooks/data/DataContext";
import { useState } from "react";
import { useToast } from "native-base";
import AuthContext from "../../../hooks/login-signup/AuthContext";
import axios from "axios";

const SettingScreen = () => {
  const { token } = useContext(AuthContext);
  const { settings, setSettings } = useContext(DataContext);
  const [data, setData] = useState({ ...settings });
  const [disable, setDisable] = useState(true);
  const toast = useToast();
  const toggleSwitch = (typ) =>
    setData((previousState) => ({
      ...previousState,
      [typ]: !previousState[typ],
    }));

  const tabBarHeight = useBottomTabBarHeight();

  const changeHandle = (value, typ) => {
    disable && value !== settings[typ] && setDisable(false);
    setData((prev) => ({ ...prev, [typ]: value }));
  };
  const updateSettings = async () => {
    try {
      setSettings(data);
      setDisable(true);
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
              Cập nhật thành công!
            </Box>
          );
        },
        placement: "top-right",
      });
      const res = await axios.put("/settings", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
    } // offline
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cài đặt</Text>
        <Button
          colorScheme="success"
          isDisabled={disable}
          onPress={updateSettings}
        >
          Cập nhật
        </Button>
      </View>
      <ScrollView
        style={{
          width: "100%",
          marginBottom: tabBarHeight,
        }}
      >
        <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#888",
              paddingBottom: 2,
            }}
          >
            <Text style={styles.itemTitle}>Chung</Text>
          </View>
          <VStack
            space={2}
            alignItems="stretch"
            px="4"
            // justifyContent="space-between"
          >
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text style={styles.subItemTitle}>Ngôn ngữ</Text>
              <Select
                selectedValue={data.language}
                w="120"
                placeholder="Ngôn ngữ"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <AntDesign name="down" size={2} color="white" />,
                }}
                mt={1}
                onValueChange={(value) => changeHandle(value, "language")}
                borderRadius="full"
                borderColor="transparent"
                backgroundColor="#39A0ED"
                color="white"
                // fontSize="sm"
                style={{ height: 38 }}
              >
                <Select.Item label="Tiếng Việt" value="Tiếng việt" />
              </Select>
            </HStack>
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text style={styles.subItemTitle}>Kiểu thời gian</Text>
              <Select
                selectedValue={data.dateFormat}
                w="120"
                placeholder="Thời gian"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <AntDesign name="down" size={2} color="white" />,
                }}
                onValueChange={(value) => changeHandle(value, "dateFormat")}
                borderRadius="full"
                borderColor="transparent"
                backgroundColor="#39A0ED"
                color="white"
                style={{ height: 38 }}
              >
                <Select.Item label="dd/mm/yyyy" value="dd/mm/yyyy" />
                {/* <Select.Item label="mm/dd/yyyy" value="mm/dd/yyyy" /> */}
              </Select>
            </HStack>
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text style={styles.subItemTitle}>Đơn vị tiền</Text>
              <Select
                selectedValue={data.currency}
                w="120"
                placeholder="Đơn vị"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <AntDesign name="down" size={2} color="white" />,
                }}
                onValueChange={(value) => changeHandle(value, "currency")}
                borderRadius="full"
                borderColor="transparent"
                backgroundColor="#39A0ED"
                color="white"
                style={{ height: 38 }}
              >
                <Select.Item label="VND (đ)" value="VND" />
                <Select.Item label="USD ($)" value="USD" />
              </Select>
            </HStack>
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              {/* <Text style={styles.subItemTitle}>Ẩn số tiền</Text>
              <Switch
                size="lg"
                value={data.hideMoney}
                thumbColor="#39A0ED"
                onValueChange={() => toggleSwitch("hideMoney")}
              /> */}
            </HStack>
          </VStack>
        </View>
        {/* <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#888",
              paddingBottom: 2,
            }}
          >
            <Text style={styles.itemTitle}>Nhắc nhở</Text>
          </View>
          <VStack
            space={1}
            // alignItems="center"
            px="4"
            justifyContent="space-between"
          >
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text style={styles.subItemTitle}>Nhắc nhở nhập liệu</Text>
              <Switch
                size="lg"
                thumbColor="#39A0ED"
                value={data.reminder}
                onValueChange={() => toggleSwitch("reminder")}
              />
            </HStack>
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text style={styles.subItemTitle}>Thời gian nhắc</Text>
              <Select
                selectedValue={data.reminderTime || "0"}
                w="120"
                placeholder="Thời gian"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <AntDesign name="down" size={2} color="white" />,
                }}
                onValueChange={(value) => {
                  changeHandle(value, "reminderTime");
                }}
                borderRadius="full"
                borderColor="transparent"
                color="white"
                backgroundColor="#39A0ED"
                style={{ height: 38, color: "white" }}
              >
                {[...Array(24).keys()].map((x, index) => (
                  <Select.Item
                    label={String(x) + ":00"}
                    value={String(x)}
                    key={x}
                  />
                ))}
              </Select>
            </HStack>
          </VStack>
        </View> */}
        {/* <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#888",
              paddingBottom: 2,
            }}
          >
            <Text style={styles.itemTitle}>Báo cáo</Text>
          </View>
          <VStack space={4} justifyContent="center">
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text style={styles.subItemTitle}>Bắt đầu trong tuần</Text>
              <Select
                selectedValue={data.weekStart}
                w="120"
                placeholder="Ngày bắt đầu"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <AntDesign name="down" size={2} color="white" />,
                }}
                mt={1}
                onValueChange={(value) => changeHandle(value, "weekStart")}
                borderRadius="full"
                borderColor="transparent"
                backgroundColor="#39A0ED"
                color="white"
                style={{ height: 38 }}
              >
                <Select.Item label="Thứ 2" value={1} />
                <Select.Item label="Chủ Nhật" value={0} />
              </Select>
            </HStack>
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text style={styles.subItemTitle}>Bắt đầu trong tháng</Text>
              <Select
                selectedValue={data.monthStart}
                w="120"
                placeholder="Ngày bắt đầu"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <AntDesign name="down" size={2} color="white" />,
                }}
                mt={1}
                onValueChange={(value) => changeHandle(value, "monthStart")}
                borderRadius="full"
                borderColor="transparent"
                backgroundColor="#39A0ED"
                color="white"
                style={{ height: 38 }}
              >
                <Select.Item label="Thứ 2" value={1} />
                <Select.Item label="Chủ Nhật" value={0} />
              </Select>
            </HStack>
            <HStack
              space={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text style={styles.subItemTitle}>Bắt đầu trong năm</Text>
              <Select
                selectedValue={data.yearStart}
                w="120"
                placeholder="Ngày bắt đầu"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <AntDesign name="down" size={2} color="white" />,
                }}
                mt={1}
                onValueChange={(value) => changeHandle(value, "yearStart")}
                borderRadius="full"
                borderColor="transparent"
                backgroundColor="#39A0ED"
                color="white"
                style={{ height: 38 }}
              >
                <Select.Item label="Thứ 2" value={1} />
                <Select.Item label="Chủ Nhật" value={0} />
              </Select>
            </HStack>
          </VStack>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
