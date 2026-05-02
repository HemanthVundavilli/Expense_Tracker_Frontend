import React, { useEffect, useState } from "react";

import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  RefreshControl
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import ExpenseItem from "../components/ExpenseItem";
import ExpenseForm from "../components/ExpenseForm";

import { getExpenses } from "../services/api";

import { COLORS } from "../constants/styles";

export default function DateExpensesScreen() {

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [showPicker, setShowPicker] =
    useState(false);

  const [data, setData] = useState([]);

  const [selected, setSelected] =
    useState(null);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {

    try {

      const res = await getExpenses();

      const filtered =
        res.data.filter(
          (item) =>
            new Date(item.date)
              .toDateString() ===
            selectedDate.toDateString()
        );

      setData(filtered);

    } catch (err) {

      console.log(err);
    }
  };

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

      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() =>
          setShowPicker(true)
        }
      >
        <Text style={styles.dateText}>
          {selectedDate.toDateString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (

        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={(event, date) => {

            setShowPicker(false);

            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}

      <Text style={styles.total}>
        Total: ₹ {total}
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
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

      {/* MODAL */}
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

  dateBtn: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15
  },

  dateText: {
    fontSize: 16,
    color: "#222"
  },

  total: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 10,
    fontWeight: "bold"
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