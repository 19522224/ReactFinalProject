import React, { useContext } from "react";
import { View, Text } from "react-native";
import st from "src/styles/home/ThuChiStyle";
import { formatCurrencyOnly } from "src/utils";

import { print, convertCurrencyAmount } from "src/utils";


export default function ThuChiGraph(props) {
  const { incomeAmount, expenseAmount, currency } = props;

  
  const thuColor = "#198155";
  const chiColor = "#d3180c";
  
  const scaleBarHeights = (incomeAmount, expenseAmount) => {
    const max = Math.max(incomeAmount, expenseAmount);

    let incomeScale;
    let expenseScale;
    if (max === 0)          // both = 0
      return [0.01, 0.01];  // show tiny bars

    // at most 1 is 0
    incomeScale = incomeAmount / max;
    expenseScale = expenseAmount / max;

    if (!incomeAmount) // income = 0
      incomeScale = 0.01;
    else if (!expenseAmount)
      expenseScale = 0.01;
    
    return [incomeScale, expenseScale];
  }
  const [ incomeBarHeight, expenseBarHeight ] = scaleBarHeights(incomeAmount, expenseAmount);

  const formatLabels = (incomeAmount, expenseAmount, currency) => {
    const [convertedIncomeAmount, convertedExpenseAmount] = [
      convertCurrencyAmount(incomeAmount, currency),
      convertCurrencyAmount(expenseAmount, currency)
    ]

    const formattedCurrencyDisplay = formatCurrencyOnly(currency);
    const thousandModifier = currency === "VND"? 1000 : 1;
    const k = thousandModifier === 1000? "k" : "";

    return [
      `${convertedIncomeAmount / thousandModifier}${k} ${formattedCurrencyDisplay}`, 
      `${convertedExpenseAmount / thousandModifier}${k} ${formattedCurrencyDisplay}`
    ];
  }
  const [ incomeLabel, expenseLabel ] = formatLabels(incomeAmount, expenseAmount, currency);


  return (
    <View style={st.thuchiChart}>
      <View style={st.thuchiColumn}>
        <Text style={{...st.thuchiAmountLabel, color: thuColor}}>{incomeLabel}</Text>
        <View style={{
          flex: incomeBarHeight,
          backgroundColor: thuColor
        }} />
      </View>

      <View style={st.thuchiColumn}>
        <Text style={{...st.thuchiAmountLabel, color: chiColor}}>{expenseLabel}</Text>
        <View style={{
          flex: expenseBarHeight,
          backgroundColor: chiColor
        }} />
      </View>

    </View>
  );
}