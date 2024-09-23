import { View, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function Add({ add }) {
  const [task, setTask] = useState("");

  const save = () => {
    if (!task.trim()) {
      return;
    }
    add(task);
    setTask("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Add a task"
      />
      <Button title="Add" onPress={() => save(task)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 300,
  },
});
