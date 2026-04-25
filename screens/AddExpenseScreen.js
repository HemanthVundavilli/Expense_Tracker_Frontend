import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import { COLORS } from "../constants/styles";

export default function AddExpenseScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* HEADER */}
        <Text style={styles.header}>Expense Tracker</Text>

        {/* FORM */}
        <View style={styles.formWrapper}>
          <ExpenseForm />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40   // ✅ fixes top alignment
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.text
  },
  formWrapper: {
    marginTop: 10
  }
});