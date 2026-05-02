import React, { useEffect, useState } from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Alert
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Ionicons } from "@expo/vector-icons";

import {
  addExpense,
  updateExpense
} from "../services/api";

import { COLORS } from "../constants/styles";

export default function ExpenseForm({
  refresh,
  selected,
  clearSelection
}) {

  const [name, setName] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [date, setDate] =
    useState(new Date());

  const [showPicker, setShowPicker] =
    useState(false);

  useEffect(() => {

    if (selected) {

      setName(selected.name);

      setAmount(
        selected.amount.toString()
      );

      setCategory(selected.category);

      setDate(
        new Date(selected.date)
      );
    }

  }, [selected]);

  const handleSubmit = async () => {

    if (!name || !amount || !category) {

      Alert.alert(
        "Error",
        "Please fill all fields"
      );

      return;
    }

    const expenseData = {
      name,
      amount: Number(amount),
      category,
      date
    };

    try {

      // UPDATE
      if (selected) {

        await updateExpense(
          selected._id,
          expenseData
        );

        Alert.alert(
          "Success",
          "Expense Updated Successfully"
        );

        if (clearSelection) {
          clearSelection();
        }

      }

      // ADD
      else {

        await addExpense(
          expenseData
        );

        Alert.alert(
          "Success",
          "Expense Added Successfully"
        );
      }

      // RESET FIELDS
      setName("");
      setAmount("");
      setCategory("");
      setDate(new Date());

      // REFRESH
      if (refresh) {
        refresh();
      }

    } catch (err) {

      console.log(err);

      Alert.alert(
        "Error",
        "Something went wrong"
      );
    }
  };

  return (

    <View style={styles.card}>

      {/* HEADING */}
      <Text style={styles.heading}>

        {selected
          ? "Edit Expense"
          : "Add Expense"}

      </Text>

      {/* NAME */}
      <TextInput
        placeholder="Expense Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* AMOUNT */}
      <TextInput
        placeholder="Amount (₹)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* CATEGORY */}
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      {/* DATE BUTTON */}
      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() =>
          setShowPicker(true)
        }
      >

        <Ionicons
          name="calendar-outline"
          size={20}
          color={COLORS.primary}
        />

        <Text style={styles.dateText}>
          {date.toDateString()}
        </Text>

      </TouchableOpacity>

      {/* DATE PICKER */}
      {showPicker && (

        <DateTimePicker
          value={date}
          mode="date"
          display={
            Platform.OS === "ios"
              ? "spinner"
              : "default"
          }
          onChange={(
            event,
            selectedDate
          ) => {

            setShowPicker(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >

        <Ionicons
          name={
            selected
              ? "create-outline"
              : "checkmark-circle"
          }
          size={22}
          color="#fff"
        />

        <Text style={styles.buttonText}>

          {selected
            ? "Update Expense"
            : "Add Expense"}

        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 3
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222"
  },

  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14
  },

  dateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16
  },

  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333"
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600"
  }
});