import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginUser } from "../services/api";
import { COLORS } from "../constants/styles";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {

  // VALIDATION
  if (!email || !password) {

    Alert.alert(
      "Error",
      "Please enter email and password"
    );

    return;
  }

  try {

    const res = await loginUser({
      email,
      password
    });

    if (res.data.token) {

      await AsyncStorage.setItem(
        "token",
        res.data.token
      );

      navigation.replace("Main");

    } else {

      Alert.alert(
        "Login Failed",
        res.data.message
      );
    }

  } catch (err) {

    console.log(err);

    Alert.alert(
      "Error",
      "Invalid credentials"
    );
  }
};

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
      />

      <View style={styles.container}>

        {/* TOP */}
        <View style={styles.topSection}>

          <Text style={styles.title}>
            Expense Tracker
          </Text>

          <Text style={styles.subtitle}>
            Welcome back 👋
          </Text>

        </View>

        {/* CARD */}
        <View style={styles.card}>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Register")
            }
          >
            <Text style={styles.link}>
              Don’t have an account?
              {" "}
              Register
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: "#F4F7FB"
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24
  },

  topSection: {
    alignItems: "center",
    marginBottom: 30
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222"
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 6
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 3
  },

  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    color: "#222"
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600"
  },

  link: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600"
  }

});