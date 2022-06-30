import { Text, Alert } from "react-native";
import { useState } from "react";
import {
  VStack,
  FormControl,
  Input,
  HStack,
  useToast,
  Box,
  Spinner
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import RegisterButton from "./RegisterButton";
import style from "../../styles/login-signup/RegisterStyle";

// Navigation
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function RegisterForm() {
  const navigation = useNavigation();
  const toast = useToast();
  
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    if (formData.name === undefined || formData.name == "") {
      setErrors({
        ...errors,
        name: "Chưa có tên đăng nhập",
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: "Tên đăng nhập phải có ít nhất 3 ký tự",
      });
      return false;
    }

    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (formData.email === undefined || formData.email == "") {
      setErrors({
        ...errors,
        email: "Chưa có email",
      });
      return false;
    } else if (!expression.test(String(formData.email).toLowerCase())) {
      setErrors({
        ...errors,
        email: "Email không hợp lệ",
      });
      return false;
    }

    if (formData.password === undefined || formData.password == "") {
      setErrors({
        ...errors,
        password: "Chưa có mật khẩu",
      });
      return false;
    } else if (formData.password.length < 6) {
      setErrors({
        ...errors,
        password: "Mật khẩu quá ngắn",
      });
      return false;
    }

    if (formData.password_ === undefined || formData.password_ == "") {
      setErrors({
        ...errors,
        password_: "Chưa có mật khẩu",
      });
      return false;
    } else if (formData.password_ != formData.password) {
      setErrors({
        ...errors,
        password_: "Mật khẩu không trùng",
      });
      return false;
    }
    setLoading(true);
    await axios
      .post("/users/register", {
        username: formData.name,
        password: formData.password,
        email: formData.email,
      })
      .then(() => {
        setLoading(false);
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
                Đăng ký thành công!
              </Box>
            );
          },
          placement: "top-right",
        });
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409) {
          setErrors({
            ...errors,
            name: "Tên đăng nhập đã tồn tại",
          });
        } else if (err.response.status === 500) {
          setErrors({
            ...errors,
            name: "Lỗi từ server, vui lòng thử lại sau",
          });
        }
        setLoading(false);
      });
  };

  const onSubmit = () => {
    validate();
  }
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
          <FormControl.ErrorMessage marginLeft="9" marginTop="0">
            {errors.name}
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={"email" in errors}>
        <Input
          variant={style.input.variant}
          borderWidth={style.input.borderWidth}
          borderColor={style.input.borderColor}
          fontSize={style.input.fontSize}
          width={style.input.width}
          alignSelf={style.input.alignSelf}
          margin={style.input.margin}
          InputLeftElement={
            <Ionicons
              name="mail"
              size={style.icon.size}
              color={style.icon.color}
              style={style.left_icon}
            />
          }
          placeholder="Email"
          type="email"
          onChangeText={(value) => {
            setData({
              ...formData,
              email: value,
            });
            delete errors.email;
          }}
        />
        {"email" in errors ? (
          <FormControl.ErrorMessage marginLeft="9" marginTop="0">
            {errors.email}
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
          type={show1 ? "text" : "password"}
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
              name={show1 ? "eye" : "eye-off"}
              size={style.icon.size}
              color={style.icon.color}
              style={style.right_icon}
              onPress={() => setShow1(!show1)}
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

      <FormControl
        isRequired
        isInvalid={"password_" in errors}
        marginBottom="2"
      >
        <Input
          variant={style.input.variant}
          borderWidth={style.input.borderWidth}
          borderColor={style.input.borderColor}
          fontSize={style.input.fontSize}
          width={style.input.width}
          alignSelf={style.input.alignSelf}
          margin={style.input.margin}
          placeholder="Nhập lại mật khẩu"
          type={show2 ? "text" : "password"}
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
              name={show2 ? "eye" : "eye-off"}
              size={style.icon.size}
              color={style.icon.color}
              style={style.right_icon}
              onPress={() => setShow2(!show2)}
            />
          }
          onChangeText={(value) => {
            setData({
              ...formData,
              password_: value,
            });
            delete errors.password_;
          }}
        />
        {"password_" in errors ? (
          <FormControl.ErrorMessage marginLeft="9" marginTop="0">
            {errors.password_}
          </FormControl.ErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>

      <RegisterButton onPress={onSubmit} />
      {loading && <Spinner size="lg" />}
      <HStack alignSelf="center" marginTop="5" marginBottom="5">
        <Text style={style.text}>Bạn đã có tài khoản?</Text>
        <Text
          onPress={() => navigation.navigate("Login")}
          style={[
            style.text,
            style.link,
            { alignSelf: "center", marginLeft: 4, color: "#111" },
          ]}
        >
          Đăng nhập
        </Text>
      </HStack>
    </VStack>
  );
}
