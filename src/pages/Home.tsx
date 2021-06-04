import React, { useState } from "react";
import { Alert } from "react-native";
import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle == "") {
      return Alert.alert("O campo está vazio");
    }

    const insertData = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false,
    };
    setTasks((prev) => [...prev, insertData]);
  }

  function handleMarkTaskAsDone(id: number) {
    const editTask = tasks.find((item) => item.id === id);
    if (editTask) {
      editTask.done = !editTask?.done;
      setTasks((prev) => [...new Set([...prev, editTask])]);
    }
  }

  function handleRemoveTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}
