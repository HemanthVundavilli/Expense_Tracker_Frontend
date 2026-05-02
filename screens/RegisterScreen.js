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

import { registerUser } from "../services/api";
import { COLORS } from "../constants/styles";

export default function RegisterScreen({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

  // VALIDATION
  if (!name || !email || !password) {

    Alert.alert(
      "Error",
      "Please fill all fields"
    );

    return;
  }

  if (password.length < 6) {

    Alert.alert(
      "Error",
      "Password must be at least 6 characters"
    );

    return;
  }

  try {

    const res = await registerUser({
      name,
      email,
      password
    });

    Alert.alert(
      "Success",
      res.data.message
    );

    navigation.navigate("Login");

  } catch (err) {

    console.log(err);

    Alert.alert(
      "Error",
      "Registration failed"
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
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Start tracking your expenses
          </Text>

        </View>

        {/* CARD */}
        <View style={styles.card}>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#888"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

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
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Login")
            }
          >
            <Text style={styles.link}>
              Already have an account?
              {" "}
              Login
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