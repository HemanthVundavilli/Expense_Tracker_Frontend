import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import AddExpenseScreen from "./screens/AddExpenseScreen";
import ViewExpensesScreen from "./screens/ViewExpensesScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainTabs() {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarActiveTintColor: "#4A90E2",

        tabBarIcon: ({ color, size }) => {

          let iconName;

          if (route.name === "Add Expense") {

            iconName = "add-circle";

          } else if (route.name === "Reports") {

            iconName = "wallet";

          } else {

            iconName = "person";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        }
      })}
    >

      {/* ADD EXPENSE */}
      <Tab.Screen
        name="Add Expense"
        component={AddExpenseScreen}
      />

      {/* REPORTS */}
      <Tab.Screen
        name="Reports"
        component={ViewExpensesScreen}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  );
}

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        {/* LOGIN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        {/* REGISTER */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        {/* MAIN APP */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}