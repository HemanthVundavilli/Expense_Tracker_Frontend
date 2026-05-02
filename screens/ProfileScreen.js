import React, {
  useEffect,
  useState
} from "react";

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
import { COLORS } from "../constants/styles";

import {
  getProfile,
  updateProfile
} from "../services/api";

export default function ProfileScreen({
  navigation
}) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  // LOAD PROFILE
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await getProfile();

      setName(res.data.name);

      setEmail(res.data.email);

    } catch (err) {

      console.log(err);

      Alert.alert(
        "Error",
        "Failed to load profile"
      );
    }
  };

  // UPDATE PROFILE
  const handleUpdate = async () => {

    try {

      await updateProfile({
        name,
        email
      });

      Alert.alert(
        "Success",
        "Profile Updated"
      );

    } catch (err) {

      console.log(err);

      Alert.alert(
        "Error",
        "Update failed"
      );
    }
  };

  // LOGOUT
  const handleLogout = async () => {

    await AsyncStorage.removeItem("token");

    navigation.replace("Login");
  };

  return (

    <SafeAreaView style={styles.safe}>

      <StatusBar
        barStyle="dark-content"
      />

      <View style={styles.container}>

        {/* TOP SECTION */}
        <View style={styles.topSection}>

          <View style={styles.avatar}>

            <Text style={styles.avatarText}>
              {name ? name[0].toUpperCase() : "U"}
            </Text>

          </View>

          <Text style={styles.title}>
            My Profile
          </Text>

          <Text style={styles.subtitle}>
            Manage your account details
          </Text>

        </View>

        {/* CARD */}
        <View style={styles.card}>

          {/* NAME */}
          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* EMAIL */}
          <Text style={styles.label}>
            Email Address
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* UPDATE BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleUpdate}
          >
            <Text style={styles.buttonText}>
              Update Profile
            </Text>
          </TouchableOpacity>

          {/* LOGOUT BUTTON */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>
              Logout
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

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 4
  },

  avatarText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold"
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

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    marginLeft: 3,
    fontWeight: "500"
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

  logoutBtn: {
    marginTop: 14,
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },

  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600"
  }

});