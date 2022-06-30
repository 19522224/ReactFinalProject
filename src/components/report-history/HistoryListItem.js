import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import Theme from "src/theme/mainTheme";
import Typo from "src/theme/mainTypo";
import { Ionicons } from "@expo/vector-icons";

import { formatMoney, formatDate } from "src/utils";
import DataContext from "src/hooks/data/DataContext";

export function HistoryListItem({ data }) {
  const { settings } = useContext(DataContext);

  return (
    <View style={st.container}>
      <Ionicons name={data.categoryIcon} size={35} color="#198155" style={{ marginVertical: 2 }} />
      <View style={st.midContainer}>
        <Text style={st.categoryName}>{data.categoryName}</Text>
        <Text style={st.description}>{data.desc}</Text>
      </View>
      <View style={st.rightContainer}>
        <Text
          style={{
            color: data.amount < 0? "red" : "green",
            fontSize: 16,
            fontWeight: "700"
          }}
        >
          {formatMoney(data.amount, settings.currency)}
        </Text>
        <Text style={st.timestamp}>{formatDate(data.date, "dd/mm/yyyy")}</Text>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: Theme.lightGreen,
    width: "90%",
  },
  icon: {
    flex: 1,
    margin: 10,
  },
  midContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#555"
  },
  description: {
    fontSize: 16,
    color: "#555"
  },
  rightContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  timestamp: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  }
});
