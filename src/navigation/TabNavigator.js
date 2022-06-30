import { View, Animated } from "react-native";
import styles from "../styles/navigation/navigationStyle";
import React from "react";
import Theme from "src/theme/mainTheme";

// Home tab
import HomeScreen from "src/screens/AppScreens/HomeTab/HomeScreen";

// Transaction tab
import IncomeExpenseScreen from "src/screens/AppScreens/TransactionTab/IncomeExpenseScreen";

// Wallet tab
import WalletNavigator from "src/navigation/WalletNavigator";
import WalletScreen from "src/screens/AppScreens/WalletTab/WalletScreen";

// More tab
import MoreNavigator from "src/navigation/MoreNavigator";
import MoreScreen from "src/screens/AppScreens/MoreTab/MoreScreen";

import IonIcon from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const getStyle = (focused, color, size) => {
  return {
    justifyContent: "center",
    alignItems: "center",
    borderColor: color,
    padding: 2,
    borderRadius: size + 4,
    borderWidth: (focused && 2) || 0,
  };
};

const FadeInView = (props, { navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  });


  return (
    <Animated.View // Special animatable View
      style={{
        flex: 1,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const FadeHomeScreen = (props, { navigation }) => (
  <FadeInView>
    <HomeScreen {...props} />
  </FadeInView>
);

const FadeIncomeExpenseScreen = (props, { navigation }) => (
  <FadeInView>
    <IncomeExpenseScreen {...props} />
  </FadeInView>
);

const FadeWalletNavigator = (props, { navigation }) => (
  <FadeInView>
    <WalletNavigator {...props} />
  </FadeInView>
);

const FadeMoreNavigator = (props, { navigation }) => (
  <FadeInView>
    <MoreNavigator {...props} />
  </FadeInView>
);



export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Trang chủ"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#198155",
        tabBarStyle: { position: "absolute", zIndex: 10 },
        tabBarIconStyle: {},
        tabBarLabelStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={FadeHomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={getStyle(focused, color, size)}>
              <IonIcon
                name="home-sharp"
                color={color}
                size={size}
                style={{ lineHeight: size }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Thu - Chi"
        component={FadeIncomeExpenseScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={getStyle(focused, color, size)}>
              <IonIcon
                name="logo-usd"
                color={color}
                size={size}
                style={{ lineHeight: size, marginLeft: 1, marginRight: -1 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Ví"
        component={FadeWalletNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={getStyle(focused, color, size)}>
              <IonIcon
                name="wallet"
                color={color}
                size={size}
                style={{
                  lineHeight: size,
                  marginLeft: 2,
                  marginRight: -1,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Khác"
        component={FadeMoreNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={getStyle(focused, color, size)}>
              <IonIcon
                name="ellipsis-horizontal"
                color={color}
                size={size}
                style={{ lineHeight: size, marginLeft: 1 }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const iconStyle = {
  //   position: "absolute",
  //   zIndex: 10,
};

const options = ({ route }) => ({});
