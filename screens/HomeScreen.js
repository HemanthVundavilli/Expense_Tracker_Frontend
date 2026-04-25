import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseItem from "../components/ExpenseItem";
import { getExpenses } from "../services/api";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>
        Namrath's Expense Tracker
      </Text>

      <ExpenseForm
        refresh={fetchData}
        selected={selected}
        clearSelection={() => setSelected(null)}
      />

      <Text>Total: ₹{total}</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            refresh={fetchData}
            onEdit={(data) => setSelected(data)}
          />
        )}
      />
    </View>
  );
}