import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity
} from "react-native";
import { getExpenses } from "../services/api";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseForm from "../components/ExpenseForm";
import { COLORS } from "../constants/styles";

export default function MonthlyExpensesScreen() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    const res = await getExpenses();
    const now = new Date();

    const filtered = res.data.filter((item) => {
      const d = new Date(item.date);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });

    setData(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = data.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={styles.container}>

      <Text style={styles.total}>Monthly Total: ₹ {total}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            refresh={fetchData}
            onEdit={(d) => {
              setSelected(d);
              setModalVisible(true);
            }}
          />
        )}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>Edit Expense</Text>

            <ExpenseForm
              selected={selected}
              refresh={() => {
                fetchData();
                setModalVisible(false);
              }}
              clearSelection={() => {
                setSelected(null);
                setModalVisible(false);
              }}
            />

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeBtn}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  total: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 10
  },
  modalBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  closeText: { color: "#fff" }
});