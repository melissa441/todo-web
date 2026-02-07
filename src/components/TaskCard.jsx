// components/TaskCard.jsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CheckCircle, Edit, Trash2 } from "lucide-react";

export default function TaskCard({ task, editTask, removeTask, completeTask }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 999 : "auto",
  };

  const isDone = task.status === "Done";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`bg-white p-5 mb-4 rounded-xl shadow-sm border border-pink-100 cursor-pointer transition-all group
        ${isDragging ? "scale-105 shadow-xl rotate-1 z-50" : "hover:shadow-md hover:border-pink-200"}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start gap-3">
          <span className={`font-bold text-lg leading-tight transition-all
            ${isDone ? "text-gray-400 line-through" : "text-gray-800"}`}>
            {task.head}
          </span>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            {!isDone && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  completeTask(task.id);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                title="Mark as Done"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                editTask(task.id);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Task"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTask(task.id);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {task.body && (
          <p className={`text-sm leading-relaxed transition-all
            ${isDone ? "text-gray-300" : "text-gray-600"}`}>
            {task.body}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider
            ${isDone ? "bg-gray-100 text-gray-400" : "bg-pink-100 text-pink-600"}`}>
            {task.status}
          </span>
        </div>
      </div>
    </div>
  );
}
