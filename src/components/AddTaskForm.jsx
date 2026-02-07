// components/AddTaskForm.jsx
import React from "react";

export default function AddTaskForm({
  newTaskHead,
  setNewTaskHead,
  newTaskBody,
  setNewTaskBody,
  addTask
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 mb-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-pink-600 mb-4">Add New Task</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={newTaskHead}
          onChange={(e) => setNewTaskHead(e.target.value)}
          placeholder="Task Title (Head)"
          className="w-full border border-pink-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white transition-all shadow-sm"
        />
        <textarea
          value={newTaskBody}
          onChange={(e) => setNewTaskBody(e.target.value)}
          placeholder="Task Description (Body)..."
          rows="3"
          className="w-full border border-pink-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white transition-all shadow-sm resize-none"
        />
        <button
          onClick={addTask}
          className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition-all shadow-md active:scale-[0.98]"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
