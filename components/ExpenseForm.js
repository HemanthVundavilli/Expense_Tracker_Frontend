import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addExpense, updateExpense } from "../services/api";
import { COLORS, SIZES } from "../constants/styles";

export default function ExpenseForm({ refresh, selected, clearSelection }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (selected) {
      setName(selected.name || "");
      setAmount(selected.amount ? selected.amount.toString() : "");
      setCategory(selected.category || "");
    }
  }, [selected]);

  const handleSubmit = async () => {
    if (!name || !amount) {
      alert("Enter name and amount");
      return;
    }

    try {
      if (selected && selected._id) {
        // UPDATE
        await updateExpense(selected._id, {
          name,
          amount: Number(amount),
          category: category || "Other"
        });
      } else {
        // ADD
        await addExpense({
          name,
          amount: Number(amount),
          category: category || "Other",
          date: new Date()
        });
      }

      // Reset
      setName("");
      setAmount("");
      setCategory("");

      refresh && refresh();
      clearSelection && clearSelection(); // closes modal
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {selected ? "Edit Expense" : "Add Expense"}
      </Text>

      <TextInput
        placeholder="Expense Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount (₹)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Category (Food, Travel...)"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      {/* UPDATE / ADD */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          {selected ? "Update Expense" : "Add Expense"}
        </Text>
      </TouchableOpacity>

      {/* CANCEL */}
      {selected && (
        <TouchableOpacity
          onPress={() => {
            setName("");
            setAmount("");
            setCategory("");
            clearSelection(); // closes modal
          }}
          style={styles.cancelBtn}
        >
          <Text style={styles.cancelText}>Cancel Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginTop: 10,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6
  },
  cancelBtn: {
    marginTop: 10,
    alignItems: "center"
  },
  cancelText: {
    color: COLORS.danger,
    fontWeight: "600"
  }
});