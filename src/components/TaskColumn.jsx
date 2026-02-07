// components/TaskColumn.jsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const colors = {
  "To-Do": "bg-pink-100",
  "In Progress": "bg-pink-200",
  Done: "bg-pink-300",
};

export default function TaskColumn({ status, tasks, editTask, removeTask }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 rounded-lg p-4 min-h-[300px] shadow-md transition-all 
        ${isOver ? "ring-4 ring-pink-400" : colors[status]}`}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-700">{status}</h3>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          editTask={editTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
}
