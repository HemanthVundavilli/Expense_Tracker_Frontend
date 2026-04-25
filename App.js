import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AddExpenseScreen from "./screens/AddExpenseScreen";
import ViewExpensesScreen from "./screens/ViewExpensesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Add") iconName = "add-circle";
            else if (route.name === "Expenses") iconName = "list";

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Add" component={AddExpenseScreen} />
        <Tab.Screen name="Expenses" component={ViewExpensesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}