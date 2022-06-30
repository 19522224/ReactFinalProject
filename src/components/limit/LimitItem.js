import { View, Text, Switch } from "react-native";
import React from "react";
import styles from "../../styles/limit/LimitItemStyle";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import DataContext from "../../hooks/data/DataContext";
import AuthContext from "../../hooks/login-signup/AuthContext";
import { useContext } from "react";
import { Box, useToast } from "native-base";
import axios from "axios";
import * as Progress from "react-native-progress";
import { formatMoney, formatDate } from "src/utils";

const LimitItem = ({ title, item, setShowModal, setLimit, money, amount }) => {
  const { token } = useContext(AuthContext);
  const { setLimits, limits, settings } = useContext(DataContext);
  const toast = useToast();
  // const progress = (item.money / item.total) * 100;
  // if (progress > 100) {
  //   progress = 100;
  // }
  const progress = 0;
  const handleChangeStatus = async (value) => {
    const typ =
      (title === "Trong ngày" && "daily") ||
      (title === "Trong tuần" && "weekly") ||
      (title === "Trong tháng" && "monthly");
    const data = {
      [typ]: {
        isActive: value,
        limit: item.limit,
      },
    };
    setLimit(data);
    setLimits({ ...limits, ...data });
    await axios
      .put(
        "/limits",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.log(err));
  };

  const progressScale =
    item.isActive && item.limit
      ? Math.min(1, Math.abs(amount) / item.limit)
      : 0;
  const progressColor = progressScale >= 0.66 ? "#d3180c" : "#f2b3ae";

  return (
    <View
      style={{
        backgroundColor: progressScale >= 1 ? "#FFE5E5" : "#ECFCE5",
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginVertical: 8,
        borderRadius: 20,
        width: "90%",
        marginHorizontal: "5%",
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          <Switch
            thumbColor={(item.isActive && "#39A0ED") || "#D3D3D3"}
            value={item.isActive}
            marginRight={16}
            onValueChange={handleChangeStatus}
          />
          <Entypo
            name="pencil"
            size={28}
            // color="#198155"
            color="#39A0ED"
            // style={{ marginRight: 16 }}
            onPress={() => {
              setLimit({ ...item, type: title }), setShowModal(true);
            }}
          />
          {/* <FontAwesome
            name="history"
            size={28}
            // color="#198155"
            color="#39A0ED"
          /> */}
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          color: "#198155",
          fontSize: 16,
          marginTop: 12,
          marginBottom: 8,
          color: progressScale >= 1 ? "#D3180C" : "#198155",
        }}
      >
        {item.limit
          ? `${money}/ ${formatMoney(item.limit, settings.currency)}`
          : "Chưa đặt hạn mức"}
      </Text>

      <Progress.Bar
        animated={false}
        progress={progressScale}
        width={null} // automatic flexbox sizing
        height={24}
        borderWidth={0}
        borderRadius={16}
        color={progressColor}
        unfilledColor="#c4c4c4"
        style={{
          marginVertical: 8,
        }}
      />
      <View style={styles.desc}>
        <View style={styles.descItem}>
          <Text style={styles.descTitle}>Trạng thái</Text>
          <Text
            style={[
              styles.time,
              { color: (item.isActive && "green") || "red" },
            ]}
          >
            {item.isActive ? "Đã áp dụng" : "Không áp dụng"}
          </Text>
        </View>
        <View style={styles.descItem}>
          <Text style={styles.descTitle}>Hôm nay</Text>
          <Text style={styles.day}>
            {new Date().getDate()}/{new Date().getMonth() + 1}/
            {new Date().getFullYear()}
          </Text>
        </View>

        <View style={styles.descItem}>
          <Text style={styles.descTitle}>Đã tiêu</Text>
          <Text style={[styles.money, { color: "#d3180c" }]}>{money}</Text>
        </View>
      </View>
    </View>
  );
};

export default LimitItem;
