import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deleteExpense } from "../services/api";
import { COLORS, SIZES } from "../constants/styles";

export default function ExpenseItem({ item, refresh, onEdit }) {
  const handleDelete = async () => {
    try {
      await deleteExpense(item._id);
      refresh();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // Category icon mapping
  const getIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "food":
        return "fast-food";
      case "travel":
        return "car";
      case "shopping":
        return "cart";
      case "bills":
        return "document-text";
      default:
        return "wallet";
    }
  };

  return (
    <View style={styles.card}>
      {/* LEFT */}
      <View style={styles.left}>
        <Ionicons
          name={getIcon(item.category)}
          size={26}
          color={COLORS.primary}
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>

      {/* RIGHT */}
      <View style={styles.right}>
        <Text style={styles.amount}>₹ {item.amount}</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(item)}>
            <Ionicons name="create-outline" size={20} color="green" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash" size={20} color={COLORS.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: 10,
    elevation: 2
  },
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text
  },
  category: {
    fontSize: 13,
    color: COLORS.subtext
  },
  right: {
    alignItems: "flex-end"
  },
  amount: {
    fontWeight: "bold",
    marginBottom: 5
  },
  actions: {
    flexDirection: "row",
    gap: 12
  }
});