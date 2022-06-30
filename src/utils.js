import { formatCurrency } from "react-native-format-currency";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);


// HOW TO USE:
// param or output: type (example of param or output)


// --- Debug util ----------
// Faster than typing console.log.....
export const print = (obj, label) => {
  if (typeof label !== "undefined")
    console.log(label);

  console.log(JSON.stringify(obj, null, 2));
}


// --- Transaction utils --------
// Get total amount of all transactions within timeRange
// transactions: Array of transactions
// type: Number ( 0 = all; 1 = income only; -1 = expense only )
// timeRange: String ("day", "week", "month", "year")
// output: Number
export const getTotalTransactionsAmountInTimeRange = (transactions, type, timeRange) => {
  let dateNow = dayjs();
  let datePast;

  switch (timeRange) {
    case "day":
      datePast = dateNow.subtract(1, "day");
      break;
    case "week":
      datePast = dateNow.subtract(1, "week");
      break;
    case "month":
      datePast = dateNow.subtract(1, "month");
      break;
    case "year":
      datePast = dateNow.subtract(1, "year");
      break;
  }

  const transactionsInRange = transactions?.filter(
    (transaction) => {
      const transactionDate = dayjs(transaction.date);

      let isTransactionInRange = transactionDate.isBetween(datePast, dateNow, "day", "(]");
      let isTransactionCorrectType;

      switch (type) {
        case 0:
          isTransactionCorrectType = true;
          break;
        case 1:
          isTransactionCorrectType = transaction.amount > 0;
          break;
        case -1:
          isTransactionCorrectType = transaction.amount < 0;
          break;
      }

      return isTransactionInRange && isTransactionCorrectType;
    }
  );

  let total = transactionsInRange?.reduce(
    (accumulatedTotal, transaction, index) => {
      const transactionAmount = transaction.amount;
      accumulatedTotal += transactionAmount;
      return accumulatedTotal;
    }
    , 0
  );

  if (total)
    return total;
  else
    return 0;
}




// --- Money utils ---------

// Format amount of money and currency into a full "money string" ("100.000 ₫")
// amount: Number
// currency: String ("VND", "USD")
// output: String ("100.000 ₫")
export const formatMoney = (amount, currency) => {
  if (!amount)
    amount = 0;

  const convertedAmount = convertCurrencyAmount(amount, currency);

  const formattedAmount = formatCurrency({
    "amount": convertedAmount, 
    "code": currency
  })[1];

  const formattedCurrency = currency === "VND"? "₫" : "$";

  return formattedAmount + " " + formattedCurrency;
}


// Format amount of money and currency into just the number part of the "money string" ("100.000")
// amount: Number
// currency: String ("VND", "USD")
// output: String ("100.000")
export const formatAmountOnly = (amount, currency) => {
  if (!amount)
    amount = 0;

  const convertedAmount = convertCurrencyAmount(amount, currency);

  const formattedAmount = formatCurrency({
    "amount": convertedAmount, 
    "code": currency
  })[1];

  return formattedAmount;
}


// Format currency into just the symbol part of the "money string" ("₫")
// currency: String ("VND", "USD")
// output: String ("₫", "$")
export const formatCurrencyOnly = (currency) => {
  return currency === "VND"? "₫" : "$";
}

// Convert amount to a specific currency
// amount: Number (100000)
// currency: String ("VND", "USD")
// output: Number (100000 for VND, or 4.35 for USD)
export const convertCurrencyAmount = (amount, currency) => {
  const convertedAmount = 
    currency === "VND"?
    amount :
    parseFloat((amount / 23000).toFixed(2));

  return convertedAmount;
}


// --- Date utils ----------

// dateStr: String ("2022-05-22T06:31:09.969Z")
// format: String ("dd/mm/yyyy", "mm/dd/yyyy"...)
// output: String ("22/5/2022")
export const formatDate = (dateStr, format) => {
  const date = dayjs(dateStr);

  const format1 = format.split("/")[0].toLowerCase();
  const format2 = format.split("/")[1].toLowerCase();

  const dd = date.date();
  const mm = date.month() + 1;
  const yyyy = date.year();

  let result = "";

  if (format1 === "dd" && format2 === "mm")
    result = `${dd}/${mm}/${yyyy}`;
  else if (format1 === "mm" && format2 === "dd")
    result = `${mm}/${dd}/${yyyy}`;

  return result;
}


// dateStr: String ("2022-05-22T06:31:09.969Z")
// timeRange: String ("week", "month", "year")
// output: Boolean (true if date is in range counting from NOW, else false)
export const checkDateInRange = (dateStr, timeRange) => {
  const dateToCheck = dayjs(dateStr);

  const dateNow = dayjs();
  const datePast = ((timeRange) => {
    switch (timeRange) {
      case "week":
        return dateNow.subtract(7, "day");
      case "month":
        return dateNow.subtract(1, "month");
      case "year":
        return dateNow.subtract(1, "year");
    }
  })(timeRange);

  return dateToCheck.isBetween(datePast, dateNow, "day", "(]");
}