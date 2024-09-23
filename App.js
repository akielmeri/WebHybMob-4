import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import Row from "./components/Row.js";
import Add from "./components/Add.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@items_key";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData(tasks);
  }, [tasks]);

  const add = useCallback(
    (name) => {
      const newItem = {
        id: uuid.v4(),
        name: name,
        completed: false,
      };
      const tempData = [...tasks, newItem];
      setTasks(tempData);
    },
    [tasks]
  );

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      setTasks(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const sortAndSetTasks = (tasksArray) => {
    const sortedTasks = tasksArray.sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      return a.completed ? 1 : -1; // Completed tasks go to the end
    });
    setTasks(sortedTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <Add add={add} />
      <Pressable
        style={[styles.toggleButton, editMode && styles.toggleButtonActive]}
        onPress={toggleEditMode}
      >
        <Text>
          {editMode ? "Done Editing" : "Edit Task List"}
        </Text>
      </Pressable>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        extraData={[selectedId, editMode]}
        renderItem={({ item }) => (
          <Row
            item={item}
            selectedId={selectedId}
            data={tasks}
            select={setSelectedId}
            setData={sortAndSetTasks}
            editMode={editMode}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  toggleButton: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 5,
    marginBottom: 32,
    marginTop: 8,
  },
  toggleButtonActive: {
    backgroundColor: "#ff6347",
  },
});
