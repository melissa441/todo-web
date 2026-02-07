// components/TaskColumn.jsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const colors = {
  "To-Do": "bg-pink-100",
  "In Progress": "bg-pink-200",
  Done: "bg-pink-300",
};

export default function TaskColumn({ status, tasks, editTask, removeTask, completeTask }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 rounded-2xl p-5 min-h-[400px] shadow-sm transition-all border-2
        ${isOver ? "bg-pink-50 border-pink-400 border-dashed" : colors[status] + " border-transparent"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{status}</h3>
        <span className="bg-white/50 text-gray-600 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
          {tasks.length}
        </span>
      </div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          editTask={editTask}
          removeTask={removeTask}
          completeTask={completeTask}
        />
      ))}
    </div>
  );
}
