import React, { useState, useContext } from "react";
import { View } from "react-native";

import { 
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup
} from "victory-native";

import { print, getTotalTransactionsAmountInTimeRange, formatAmountOnly, convertCurrencyAmount } from "src/utils";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);



export default function ReportGraph(props) {

  const { transactions, currency, timeRange } = props;

  const thousandModifier = currency === "VND"? 1000 : 1;  

  const tickValues = getTickValues(timeRange);

  const transactionsInBarGroups = getTransactionsInBarGroups(transactions, tickValues, timeRange);
  // print(transactionsInBarGroups, "transactions in bar groups");


  const graphData = {
    in: toGraphData(transactionsInBarGroups, tickValues, "income", timeRange, thousandModifier),
    out: toGraphData(transactionsInBarGroups, tickValues, "expense", timeRange, thousandModifier),
  }

  // fix colors of 2 bars
  graphData.in.unshift({x: 0, y: 0});
  graphData.out.unshift({x: 0, y: 0});

  // print(graphData, "graph data");

  const maxBarHeightDefault = currency === "VND"? 100 : 10;
  const maxBarHeight = getMaxBarHeight(transactionsInBarGroups, currency, thousandModifier);
  const barWidth = getBarWidth(timeRange);

  // print(maxBarHeight, "max bar height");

  // print(getTotalTransactionsAmountInTimeRange(transactions, "day"), "======= UNRELATED ======")


  return (
    <View>
      <VictoryChart
        domain={{
          x: [tickValues[0], tickValues[tickValues.length - 1]],
          y: [0, maxBarHeight? maxBarHeight : maxBarHeightDefault],
        }}
      >
        <VictoryGroup 
          offset={barWidth}
        >
          <VictoryBar
            data={graphData.in}
            x="x"
            y="y"
            barWidth={barWidth}
            style={{ data: { fill: "#009900" } }}
          />
          <VictoryBar
            data={graphData.out}
            x="x"
            y="y"
            barWidth={barWidth}
            style={{ data: { fill: "#bf0000" } }}
          />
        </VictoryGroup>

        {/* time axis */}
        <VictoryAxis
          tickValues={tickValues}
          tickFormat={tickValue => formatTickValue(tickValue, timeRange)}
        />

        {/* amount axis */}
        <VictoryAxis
          dependentAxis
          tickFormat={tickValue => {
            // console.log(`amount tick value = ${tickValue}`);
            return `${convertCurrencyAmount(tickValue, currency)}${currency === "VND"? "k": ""}`;
          }}
        />
      </VictoryChart>
    </View>
  )
}


// --- Functions ---------

/*
  "week": 7 pairs, 1 pair = 1 day
  "month": 5 pairs, 1 pair = 6 days
  "year": 12 pairs, 1 pair = 1 month

*/
// Array of arrays ([[transactions], [transactions], ...])
const getTransactionsInBarGroups = (transactions, tickValues, timeRange) => {
  // console.log("===== getTransactionsInBarGroups ===========");

  const result = [];
  for (let tickValue of tickValues.slice().reverse()) {
    // console.log(tickValue);

    switch (timeRange) {
      case "week": {
        const transaction = transactions?.filter((transaction) => {
          const transactionDate = dayjs(transaction.date);
          return transactionDate.isSame(tickValue, "day");
        });
        if (transaction)
          result.unshift(transaction);
        break;
      }

      case "month": {
        const transaction = transactions?.filter((transaction) => {
          const tRight = tickValue;
          const tLeft = tickValue.subtract(6, "day");
          
          const transactionDate = dayjs(transaction.date);
          return transactionDate.isBetween(tLeft, tRight, "day", "(]");
        });
        if (transaction)
          result.unshift(transaction);
        break;
      }
        
      case "year": {
        const transaction = transactions?.filter((transaction) => {
          const transactionDate = dayjs(transaction.date);
          return transactionDate.isSame(tickValue, "month");
        })
        if (transaction)
          result.unshift(transaction);
        break;
      }
    }
  }
  
  // console.log(result);
  return result;
}

const getTickValues = (timeRange) => {
  const MAX_TICK_VALUES = 5;

  const dateNow = dayjs();
  let datePast;
  switch (timeRange) {
    case "week":
      datePast = dateNow.subtract(7, "day");
      break;
    case "month":
      datePast = dateNow.subtract(1, "month");
      break;
    case "year":
      datePast = dateNow.subtract(1, "year");
      break;
  }


  const tickValues = [];

  switch (timeRange) {
    case "week":
      for (let tickValue = dateNow; tickValue.isAfter(datePast, "day"); tickValue = tickValue.subtract(1, "day"))
        tickValues.unshift(tickValue.startOf("day"));
      break;
        
    case "month":
      for (let tickValue = dateNow; tickValue.isAfter(datePast, "day"); tickValue = tickValue.subtract(6, "day"))
        tickValues.unshift(tickValue.startOf("day"));
      break;

    case "year":
      for (let tickValue = dateNow; tickValue.isAfter(datePast, "day"); tickValue = tickValue.subtract(1, "month"))
        tickValues.unshift(tickValue.startOf("day"));
      break;
  }

  // idk random fix to make it work lmao
  if (timeRange === "month" && tickValues.length > MAX_TICK_VALUES)
    tickValues.shift();

  return tickValues;
}


const formatTickValue = (tickValue, timeRange) => {
  let tickLabel;

  switch (timeRange) {
    case "week":
      tickLabel = `${tickValue.date()}/${tickValue.month() + 1}`;
      break;

    case "month":
      const tickEnd = dayjs(tickValue);
      const tickStart = tickEnd.subtract(5, "day");

      tickLabel = `${tickStart.date()}-${tickEnd.date()}/${tickValue.month()+1}`;
      break;

    case "year":
      tickLabel = `${tickValue.month()+1}`;
      break;
  }

  return tickLabel;
}


// Array of array ([[transactions], [], [transactions], ...])
// tickValues = array of dates (of the endpoint, subtract from it to get the startpoint)
// typeOfTransaction = String ("income", "expense")
// timeRange = String ("week", "month", "year")
// thousandModifier = 1000 or 1
// Output: [[{}], [], [{}, {}], ...]             NO
// Output: [{}, {}, {}, {}, ...]
// where {} = { x: tickValue, y: totalAmountForGroup }
const toGraphData = (transactionsInBarGroups, tickValues, typeOfTransaction, timeRange, thousandModifier) => {
  // console.log("======= toGraphData ==========================");
  const result = [];

  // console.log("  tickValues = ");
  // print(tickValues);

  for (let barGroup of transactionsInBarGroups) {
    for (let transaction of barGroup) {
      if ((typeOfTransaction === "income" && transaction.amount < 0) ||
          (typeOfTransaction === "expense" && transaction.amount > 0))
        continue;

      // if data point already exists...
      let graphDataIndexIfExists;
      switch (timeRange) {
        case "week":
          graphDataIndexIfExists = result.findIndex(graphDataEntry => {
            const result = dayjs(graphDataEntry.x).date() === dayjs(transaction.date).date();
            // console.log(`${dayjs(graphDataEntry.x).date()} === ${dayjs(transaction.date).date()}? ${result}`);
            return result;
          });
          break;
          
        case "month":
          graphDataIndexIfExists = result.findIndex(graphDataEntry => {
            const endDate = dayjs(graphDataEntry.x);
            const startDate = endDate.subtract(5, "day");
            
            const actualDate = dayjs(transaction.date);

            const result = actualDate.isBetween(startDate, endDate, "day", "[]");
            // console.log(`    ${actualDate.toISOString()} is between ${startDate.toISOString()} ~ ${endDate.toISOString()}? ${result}`);
            return result;
          });
          break;  
          
        case "year":
          graphDataIndexIfExists = result.findIndex(graphDataEntry => {
            const result = dayjs(graphDataEntry.x).month() === dayjs(transaction.date).month();
            // console.log(`${dayjs(graphDataEntry.x).month()} === ${dayjs(transaction.date).month()}? ${result}`);
            return result;
          });
          break;
      }

      // ... then add to it
      if (graphDataIndexIfExists !== -1) {
        const graphDataAddAmount = Math.abs(transaction.amount) / thousandModifier;
        // result[graphDataIndexIfExists].y += convertCurrencyAmount(graphDataAddAmount, currency);
        result[graphDataIndexIfExists].y += graphDataAddAmount;

        continue;
      }

      // ... else, add a data point
      let graphDataEntry;
      switch (timeRange) {
        case "week":
          graphDataEntry = {
            x: dayjs(transaction.date).startOf("day"),
            y: Math.abs(transaction.amount) / thousandModifier
          };
          break;

        case "month":
          const actualDataEntryX = dayjs(transaction.date).startOf("day");

          // find index of tickValue that this entry belongs to (endpoint) -> this entry X is BEFORE that endpoint
          // then index-1 is the startpoint, EXCLUSIVE
          // reminder that the range is 6 days (e.g: 23-28/5), but only subtract 5 (28 - 5 = 23)
          const endDate = tickValues.find(tickValue => !actualDataEntryX.isAfter(tickValue));
          const startDate = endDate.subtract(5, "day");

          // console.log(`  graphX = ${actualDataEntryX.toISOString()} |  startDate = ${startDate.toISOString()} |  endDate = ${endDate?.toISOString()}`);

          graphDataEntry = {
            x: endDate,
            y: Math.abs(transaction.amount) / thousandModifier
          };
          break;

        case "year":
          graphDataEntry = {
            x: dayjs(transaction.date).startOf("month"),
            // x: dayjs(transaction.date).endOf("month"),
            y: Math.abs(transaction.amount) / thousandModifier
          };
          break;
      }

      // graphDataEntry.y = convertCurrencyAmount(graphDataEntry.y, currency);
      result.push(graphDataEntry);
    }
  }

  return result;
}

const getMaxBarHeight = (transactionsInBarGroups, currency, thousandModifier) => {
  const maxBarHeights = [100 * thousandModifier];

  for (let barGroup of transactionsInBarGroups) {
    let incomeSumOfBarGroup = 0;
    let expenseSumOfBarGroup = 0;

    for (let transaction of barGroup) {
      if (transaction.amount > 0)
        incomeSumOfBarGroup += transaction.amount;
        // incomeSumOfBarGroup += convertCurrencyAmount(transaction.amount, currency);
      else
        expenseSumOfBarGroup += -transaction.amount;
        // expenseSumOfBarGroup += -convertCurrencyAmount(transaction.amount, currency);
    }

    maxBarHeights.push(Math.max(incomeSumOfBarGroup, expenseSumOfBarGroup));
  }


  return Math.max(...maxBarHeights) / thousandModifier;
  // return (Math.max(...maxBarHeights) / thousandModifier) / (currency === "USD"? 5 : 1);
}

const getBarWidth = (timeRange) => {
  switch (timeRange) {
    case "week":
      return 12;
    
    case "month":
      return 10;

    case "year":
      return 8;
  }
}
