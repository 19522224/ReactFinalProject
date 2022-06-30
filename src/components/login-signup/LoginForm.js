import { Text, Alert, View } from "react-native";
import { useContext, useState } from "react";
import { VStack, HStack, FormControl, Input, Spinner } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import LoginButton from "./LoginButton";
import style from "../../styles/login-signup/LoginStyle";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AuthContext from "../../hooks/login-signup/AuthContext";
import DataContext from "../../hooks/data/DataContext";

export default function LoginForm() {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, setAuth, setToken } = useContext(AuthContext);
  // const { setUsername, setProfile, setSettings, setLimits, setWallets, setDebits, setCategories } = useContext(DataContext);

  const validate = async () => {
    if (formData.name === undefined || formData.name == "") {
      setErrors({
        ...errors,
        name: "Chưa có tên đăng nhập",
      });
      return false;
    }

    if (formData.password === undefined || formData.password == "") {
      setErrors({
        ...errors,
        password: "Chưa có mật khẩu",
      });
      return false;
    }
    // server authentication
    // ...
    setLoading(true);
    axios
      .post("/users/login", {
        username: formData.name,
        password: formData.password,
      })
      .then((res) => {
        setToken(res.data.accessToken);
        setAuth(true);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setErrors({
            ...errors,
            name: "Tên đăng nhập không tồn tại",
          });
        } else if (err.response.status === 401) {
          setErrors({
            ...errors,
            password: "Mật khẩu không đúng",
          });
        }
        else {
          // no network
          setAuth(true);
        }
        setLoading(false);
      });

  };

  const navigation = useNavigation();

  return (
    <VStack marginTop="8">
      <FormControl isRequired isInvalid={"name" in errors}>
        <Input
          variant={style.input.variant}
          borderWidth={style.input.borderWidth}
          borderColor={style.input.borderColor}
          fontSize={style.input.fontSize}
          width={style.input.width}
          alignSelf={style.input.alignSelf}
          margin={style.input.margin}
          InputLeftElement={
            <FontAwesome
              name="user"
              size={style.icon.size}
              color={style.icon.color}
              style={style.left_icon}
            />
          }
          placeholder="Tên đăng nhập"
          onChangeText={(value) => {
            setData({
              ...formData,
              name: value,
            });
            delete errors.name;
          }}
        />
        {"name" in errors ? (
          <FormControl.ErrorMessage marginLeft="10" marginTop="0">
            {errors.name}
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={"password" in errors}>
        <Input
          variant={style.input.variant}
          borderWidth={style.input.borderWidth}
          borderColor={style.input.borderColor}
          fontSize={style.input.fontSize}
          width={style.input.width}
          alignSelf={style.input.alignSelf}
          margin={style.input.margin}
          placeholder="Mật khẩu"
          type={show ? "text" : "password"}
          InputLeftElement={
            <FontAwesome
              name="lock"
              size={style.icon.size}
              color={style.icon.color}
              style={style.left_icon}
            />
          }
          InputRightElement={
            <Ionicons
              name={show ? "eye" : "eye-off"}
              size={style.icon.size}
              color={style.icon.color}
              style={style.right_icon}
              onPress={() => setShow(!show)}
            />
          }
          onChangeText={(value) => {
            setData({
              ...formData,
              password: value,
            });
            delete errors.password;
          }}
        />
        {"password" in errors ? (
          <FormControl.ErrorMessage marginLeft="9" marginTop="0">
            {errors.password}
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>

      <LoginButton onPress={validate} />
      {loading && <Spinner size="lg" />}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 52,
          marginBottom: 6,
        }}
      >
        <VStack>
          <Text style={style.text}>Bạn chưa có tài khoản?</Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={[style.text, style.link, { alignSelf: "center" }]}
          >
            Đăng ký
          </Text>
        </VStack>
        <Text
          onPress={() => navigation.navigate("Retrieve")}
          style={[style.text, style.link]}
        >
          Quên mật khẩu?
        </Text>
      </View>
    </VStack>
  );
}
