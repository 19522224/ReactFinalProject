import { Text, Alert, View } from "react-native";
import { useState } from "react";
import { VStack, FormControl, Input, useToast, Box, Spinner } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import RetrieveButton from "./RetrieveButton";
import style from "../../styles/login-signup/RetrieveStyle";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const navigation = useNavigation();
  const validate = async () => {
    if (formData.name === undefined || formData.name == "") {
      setErrors({
        ...errors,
        name: "Chưa có tên đăng nhập",
      });
      return false;
    }

    // server authentication
    setLoading(true);
    await axios
      .post('/users/retrieve', { username: formData.name })
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
                Kiểm tra Email để nhận mật khẩu mới của bạn!
              </Box>
            );
          },
          placement: "top-right",
        });
        return true
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status == 404) {
          setErrors({
            ...errors,
            name: "Tên đăng nhập không tồn tại",
          });
          return false;
        }
      })
  };

  const onSubmit = () => validate();

  return (
    <VStack marginTop="16">
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
          <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText marginLeft="9" marginTop="0">
            Nhận mật khẩu mới qua email của bạn
          </FormControl.HelperText>
        )}
      </FormControl>

      <RetrieveButton onPress={onSubmit} />
      {loading && <Spinner size="lg" />}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-end",
          marginTop: 12,
          marginRight: 4,
        }}
      >
        <AntDesign name="back" size={16} color="black" />
        <Text
          style={[
            style.text,
            style.link,
            {
              marginRight: "5%",
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          Quay lại
        </Text>
      </View>
    </VStack>
  );
}
