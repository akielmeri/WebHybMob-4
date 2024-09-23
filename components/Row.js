import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Row({ item, data, select, setData, editMode }) {
  const remove = () => {
    const newData = data.filter((i) => i.id !== item.id);
    setData(newData);
    select(null);
  };

  const toggleComplete = () => {
    const newData = data.map((i) => {
      if (i.id === item.id) {
        i.completed = !i.completed;
      }
      return i;
    });
    setData(newData);
  };

  return (
    <Pressable
      style={styles.row}
      onPress={toggleComplete}
    >
      <Text
        style={[
          styles.rowText,
          item.completed && styles.completedText,
        ]}
      >
        {item.name}
      </Text>
      {editMode && (
        <Ionicons name="trash" size={24} color="red" onPress={remove} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
    row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    width: 350,
  },
  rowText: {
      fontSize: 18,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
