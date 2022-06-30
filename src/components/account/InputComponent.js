import { View, Text } from "react-native";
import styles from "../../styles/more_screen/inputComponentStyle";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Input } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const InputComponent = ({ label, value, handleChange, type = "text" }) => {
  const [show, setShow] = useState(false);
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {type === "text" ? (
        <Input
          w="100%"
          placeholder={label}
          value={value}
          variant="rounded"
          backgroundColor="white"
          borderWidth={2}
          borderColor="#4fb286"
          fontSize="md"
          onChangeText={handleChange}
        />
      ) : (
        <Input
          w="100%"
          type={show ? "text" : "password"}
          InputRightElement={
            <Ionicons
              name={(show && "eye-off") || "eye"}
              size={24}
              color="#198155"
              onPress={() => setShow(!show)}
              style={{ marginRight: 8 }}
            />
          }
          placeholder={label}
          value={value}
          variant="rounded"
          backgroundColor="white"
          borderWidth={2}
          borderColor="#4fb286"
          fontSize="md"
          onChangeText={handleChange}
        />
      )}
    </View>
  );
};

export default InputComponent;
