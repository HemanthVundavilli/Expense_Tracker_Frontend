import axios from "axios";

// 🔥 Replace with your system IP
const API = axios.create({
  baseURL: "https://expense-tracker-backenddd.onrender.com/api"
});

// Add Expense
export const addExpense = async (data) => {
  return await API.post("/add", data);
};

// Get All Expenses
export const getExpenses = async () => {
  return await API.get("/");
};

// Delete Expense
export const deleteExpense = async (id) => {
  return await API.delete(`/${id}`);
};

// Update Expense
export const updateExpense = async (id, data) => {
  return await API.put(`/${id}`, data);
};