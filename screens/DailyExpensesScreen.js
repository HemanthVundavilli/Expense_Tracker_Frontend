import React, { useEffect, useState } from "react";

import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  RefreshControl,
  Alert
} from "react-native";

import { getExpenses } from "../services/api";

import ExpenseItem from "../components/ExpenseItem";
import ExpenseForm from "../components/ExpenseForm";

import { COLORS } from "../constants/styles";

export default function DailyExpensesScreen() {

  const [data, setData] = useState([]);

  const [selected, setSelected] = useState(null);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const fetchData = async () => {

    try {

      const res = await getExpenses();

      const today =
        new Date().toDateString();

      const filtered = res.data.filter(
        (item) =>
          new Date(item.date).toDateString()
          === today
      );

      setData(filtered);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {

    setRefreshing(true);

    await fetchData();

    setRefreshing(false);
  };

  const total = data.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <View style={styles.container}>

      {/* TOTAL */}
      <Text style={styles.total}>
        Daily Total: ₹ {total}
      </Text>

      {/* LIST */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => (

          <ExpenseItem
            item={item}
            refresh={fetchData}
            onEdit={(expense) => {

              setSelected(expense);

              setModalVisible(true);
            }}
          />
        )}
      />

      {/* EDIT MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >

        <View style={styles.modalBg}>

          <View style={styles.modalCard}>

            <ExpenseForm
              selected={selected}
              refresh={() => {

                fetchData();

                setModalVisible(false);

                setSelected(null);
              }}
              clearSelection={() => {

                setSelected(null);

                setModalVisible(false);
              }}
            />

            {/* CLOSE BUTTON */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {

                setModalVisible(false);

                setSelected(null);
              }}
            >
              <Text style={styles.closeText}>
                Close
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16
  },

  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 15
  },

  modalBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  modalCard: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18
  },

  closeBtn: {
    marginTop: 12,
    backgroundColor: "#999",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },

  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }

});