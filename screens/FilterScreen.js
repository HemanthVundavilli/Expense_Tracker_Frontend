import React, { useState } from "react";
import { View, TextInput, Button, FlatList } from "react-native";
import { filterExpenses } from "../services/api";
import ExpenseItem from "../components/ExpenseItem";

export default function FilterScreen() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState([]);

  const handleFilter = async () => {
    const res = await filterExpenses(start, end);
    setData(res.data);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Start Date (YYYY-MM-DD)" onChangeText={setStart} />
      <TextInput placeholder="End Date (YYYY-MM-DD)" onChangeText={setEnd} />

      <Button title="Apply Filter" onPress={handleFilter} />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ExpenseItem item={item} />}
      />
    </View>
  );
}