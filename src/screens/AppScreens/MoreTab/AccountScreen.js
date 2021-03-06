import {
  Button,
  Collapse,
  HStack,
  VStack,
  Alert,
  IconButton,
  CloseIcon,
  Box,
} from "native-base";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../../../styles/more_screen/accountScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import InputComponent from "../../../components/account/InputComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "native-base";
import { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import AuthContext from "../../../hooks/login-signup/AuthContext";
import DataContext from "../../../hooks/data/DataContext";
import Moment from "moment";
import axios from "axios";
import { useToast } from "native-base";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const AccountScreen = () => {
  const { logout, token } = useContext(AuthContext);
  const { profile, setProfile } = useContext(DataContext);
  const [data, setData] = useState({ ...profile });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  console.log(profile);

  const tabBarHeight = useBottomTabBarHeight();
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disable1, setDisabled1] = useState(true);
  const [disable2, setDisabled2] = useState(true);
  const toast = useToast();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    // setDate(currentDate);
    handleChange(currentDate, "birthday");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleChange = (value, typ) => {
    if (typ === "oldPassword" || typ === "newPassword")
      setPasswords((prev) => ({ ...prev, [typ]: value }));
    else setData((prev) => ({ ...prev, [typ]: value }));
  };

  const updateProfile = async () => {
    try {
      setProfile(data);
      setDisabled1(true);
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
              C???p nh???t th??ng tin th??nh c??ng!
            </Box>
          );
        },
        placement: "top-right",
      });
      const res = await axios.put("/account/profile", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
      // offline
    }
  };

  const changePassword = async () => {
    if (passwords.newPassword.length < 6) {
      toast.show({
        render: () => {
          return (
            <Box
              bg="#eab308"
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
              M???t kh???u qu?? ng???n! M???t kh???u c?? t???i thi???u 6 k?? t??? ????? ?????m b???o an
              to??n
            </Box>
          );
        },
        placement: "top-right",
      });
    } else {
      try {
        const res = await axios.put("/account/password", passwords, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setPasswords({ oldPassword: "", newPassword: "" });
        setDisabled2(true);
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
                Thay ?????i m???t kh???u th??nh c??ng!
              </Box>
            );
          },
          placement: "top-right",
        });
      } catch (error) {
        toast.show({
          render: () => {
            return (
              <Box
                bg="red.600"
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
                {error.response.status === 401
                  ? "M???t kh???u c?? kh??ng ????ng!"
                  : "L???i h??? th???ng! Vui l??ng th??? l???i."}
              </Box>
            );
          },
          placement: "top-right",
        });
      }
    }
  };

  useEffect(() => {
    setDisabled1(
      profile?.fullName === data.fullName &&
        profile?.phoneNumber === data.phoneNumber &&
        profile?.birthday === data.birthday
    );
  }, [data.fullName, data.phoneNumber, data.birthday]);

  useEffect(() => {
    setDisabled2(passwords.newPassword === "" || passwords.oldPassword === "");
  }, [passwords.newPassword, passwords.oldPassword]);

  return (
    <SafeAreaView style={styles.container}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        style={styles.header}
      >
        <Text style={styles.title}>T??i kho???n</Text>
        <Button
          colorScheme="warning"
          endIcon={<AntDesign name="logout" size={16} color="white" />}
          onPress={logout}
        >
          ????ng xu???t
        </Button>
      </HStack>
      <ScrollView
        style={{
          width: "100%",
          marginBottom: tabBarHeight,
        }}
      >
        <View style={styles.itemContainer}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            borderColor="black"
            borderBottomWidth="1"
            pb="1"
          >
            <Text style={styles.itemTitle}>Chung</Text>
            <Button
              colorScheme="success"
              isDisabled={disable1}
              onPress={updateProfile}
            >
              C???p nh???t
            </Button>
          </HStack>
          <VStack space={2} alignItems="stretch" px="4" mt="2">
            <InputComponent
              label="H??? v?? T??n"
              value={data.fullName}
              handleChange={(value) => handleChange(value, "fullName")}
            />
            {/* <InputComponent
              label="Email"
              value={data.email}
              handleChange={(value) => handleChange(value, "email")}
            /> */}
            <InputComponent
              label="S??? ??i???n tho???i"
              value={data.phoneNumber}
              handleChange={(value) => handleChange(value, "phoneNumber")}
            />
            <View>
              <Text style={{ fontSize: 16 }}>Sinh nh???t</Text>
              <TouchableOpacity onPress={showDatepicker}>
                <Input
                  fontSize="md"
                  my="2"
                  bg="white"
                  borderColor="#4fb286"
                  borderWidth={2}
                  w={{
                    md: "100%",
                  }}
                  variant="rounded"
                  type="date"
                  InputRightElement={
                    <AntDesign
                      name="calendar"
                      size={24}
                      color="#198155"
                      onPress={showDatepicker}
                      style={{
                        marginRight: 8,
                      }}
                    />
                  }
                  placeholder="Th???i gian"
                  value={
                    // (date && date.toLocaleString()) ||
                    // new Date().toLocaleString()
                    // data.birthday
                    !data.birthday
                      ? ""
                      : Moment(data.birthday).format("DD/MM/YYYY")
                  }
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </VStack>
        </View>
        <View style={styles.itemContainer}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            borderColor="black"
            borderBottomWidth="1"
            pb="1"
          >
            <Text style={styles.itemTitle}>B???o m???t</Text>
            <Button
              colorScheme="success"
              isDisabled={disable2}
              onPress={changePassword}
            >
              Thay ?????i m???t kh???u
            </Button>
          </HStack>
          <VStack space={1} alignItems="stretch" px="4" mt="2">
            <InputComponent
              label="M???t kh???u c??"
              value={passwords.oldPassword}
              type="pwd"
              handleChange={(value) => handleChange(value, "oldPassword")}
            />
            <InputComponent
              label="M???t kh???u m???i"
              value={passwords.newPassword}
              type="pwd"
              handleChange={(value) => handleChange(value, "newPassword")}
            />
          </VStack>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

export default AccountScreen;
