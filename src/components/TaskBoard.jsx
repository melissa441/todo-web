// components/TaskBoard.jsx
import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import AddTaskForm from "./AddTaskForm";
import { useAuth } from "../context/AuthContext";

const statuses = ["To-Do", "In Progress", "Done"];

export default function TaskBoard() {
  const { user } = useAuth();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      setTasks([]);
      return;
    }

    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const userTasks = allTasks.filter(t => t.userId === user.id);
    setTasks(userTasks);
    setLoading(false);
  }, [user?.id]);

  // Persist tasks whenever they change
  const saveTasksToLocal = (updatedTasks) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const otherUsersTasks = allTasks.filter(t => t.userId !== user.id);
    localStorage.setItem("tasks", JSON.stringify([...otherUsersTasks, ...updatedTasks]));
  };

  const sensors = useSensors(useSensor(PointerSensor));

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const overContainer = over.id; // Correctly get the column ID

    const updatedTasks = tasks.map((task) =>
      task.id === active.id
        ? { ...task, status: overContainer, updatedAt: new Date().toISOString() }
        : task
    );

    setTasks(updatedTasks);
    saveTasksToLocal(updatedTasks);
  };

  const addTask = () => {
    if (!newTaskTitle.trim() || !user?.id) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status: "To-Do",
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocal(updatedTasks);
    setNewTaskTitle("");
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocal(updatedTasks);
  };

  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle && newTitle.trim() !== task.title) {
      const updatedTitle = newTitle.trim();
      const updatedTasks = tasks.map((t) =>
        t.id === id ? { ...t, title: updatedTitle, updatedAt: new Date().toISOString() } : t
      );
      setTasks(updatedTasks);
      saveTasksToLocal(updatedTasks);
    }
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading your tasks...</div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <AddTaskForm
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        addTask={addTask}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 justify-center">
          {statuses.map((status) => {
            const statusTasks = tasks.filter((t) => t.status === status);
            return (
              <SortableContext
                key={status}
                items={statusTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <TaskColumn
                  status={status}
                  tasks={statusTasks}
                  editTask={editTask}
                  removeTask={removeTask}
                />
              </SortableContext>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}
