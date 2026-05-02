import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "https://expense-tracker-backenddd.onrender.com/api"
});

API.interceptors.request.use(
  async (req) => {

    const token =
      await AsyncStorage.getItem("token");

    if (token) {
      req.headers.authorization = token;
    }

    return req;
  }
);

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getProfile = () =>
  API.get("/auth/profile");

export const updateProfile = (data) =>
  API.put("/auth/profile", data);

export const addExpense = (data) =>
  API.post("/expenses/add", data);

export const getExpenses = () =>
  API.get("/expenses");

export const deleteExpense = (id) =>
  API.delete(`/expenses/${id}`);

export const updateExpense = (id, data) =>
  API.put(`/expenses/${id}`, data);

export default API;