import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { deleteExpense } from "../services/api";

import {
  COLORS,
  SIZES
} from "../constants/styles";

export default function ExpenseItem({
  item,
  refresh,
  onEdit
}) {

  // DELETE WITH CONFIRMATION
  const handleDelete = () => {

    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [

        {
          text: "Cancel",
          style: "cancel"
        },

        {
          text: "Delete",

          style: "destructive",

          onPress: async () => {

            try {

              await deleteExpense(
                item._id
              );

              Alert.alert(
                "Deleted",
                "Expense Deleted Successfully"
              );

              if (refresh) {
                refresh();
              }

            } catch (err) {

              console.log(err);

              Alert.alert(
                "Error",
                "Delete failed"
              );
            }
          }
        }
      ]
    );
  };

  // CATEGORY ICONS
  const getIcon = (category) => {

    switch (
      category?.toLowerCase()
    ) {

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

        <View style={styles.textContainer}>

          {/* NAME */}
          <Text style={styles.name}>
            {item.name}
          </Text>

          {/* CATEGORY */}
          <Text style={styles.category}>
            {item.category}
          </Text>

          {/* DATE */}
          <Text style={styles.date}>
            {new Date(
              item.date
            ).toDateString()}
          </Text>

        </View>

      </View>

      {/* RIGHT */}
      <View style={styles.right}>

        {/* AMOUNT */}
        <Text style={styles.amount}>
          ₹ {item.amount}
        </Text>

        {/* ACTION BUTTONS */}
        <View style={styles.actions}>

          {/* EDIT */}
          <TouchableOpacity
            onPress={() =>
              onEdit(item)
            }
          >

            <Ionicons
              name="create-outline"
              size={22}
              color="green"
            />

          </TouchableOpacity>

          {/* DELETE */}
          <TouchableOpacity
            onPress={handleDelete}
          >

            <Ionicons
              name="trash"
              size={22}
              color={COLORS.danger}
            />

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

    marginBottom: 12,

    elevation: 3
  },

  left: {
    flexDirection: "row",
    alignItems: "center",

    flex: 1
  },

  textContainer: {
    marginLeft: 10
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text
  },

  category: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 2
  },

  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 2
  },

  right: {
    alignItems: "flex-end"
  },

  amount: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.primary
  },

  actions: {
    flexDirection: "row",
    gap: 14
  }
});