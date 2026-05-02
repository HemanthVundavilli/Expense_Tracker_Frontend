import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DailyExpensesScreen from "../screens/DailyExpensesScreen";
import WeeklyExpensesScreen from "../screens/WeeklyExpensesScreen";
import MonthlyExpensesScreen from "../screens/MonthlyExpensesScreen";
import DateExpensesScreen from "../screens/DataExpensesScreen";

import { COLORS } from "../constants/styles";

const Tab = createMaterialTopTabNavigator();

export default function ViewExpensesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Text style={styles.header}>
          Expense Tracker
        </Text>

        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: COLORS.primary,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.primary
            },
            tabBarLabelStyle: {
              fontWeight: "600"
            }
          }}
        >
          <Tab.Screen
            name="Daily"
            component={DailyExpensesScreen}
          />

          <Tab.Screen
            name="Weekly"
            component={WeeklyExpensesScreen}
          />

          <Tab.Screen
            name="Monthly"
            component={MonthlyExpensesScreen}
          />

          <Tab.Screen
            name="By Date"
            component={DateExpensesScreen}
          />
        </Tab.Navigator>

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
    paddingTop: 40
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 10
  }
});