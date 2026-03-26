"use client";

import { getSupabase } from "@/lib/supabase";
import { Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

export default function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const toggleComplete = async () => {
    await getSupabase()
      .from("todos")
      .update({ is_complete: !todo.is_complete })
      .eq("id", todo.id);
    onUpdate();
  };

  const deleteTodo = async () => {
    await getSupabase().from("todos").delete().eq("id", todo.id);
    onUpdate();
  };

  return (
    <div className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md">
      <button
        onClick={toggleComplete}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          todo.is_complete
            ? "border-green-500 bg-green-500 text-white"
            : "border-gray-300 hover:border-indigo-400"
        }`}
      >
        {todo.is_complete && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 text-sm ${
          todo.is_complete ? "text-gray-400 line-through" : "text-gray-900"
        }`}
      >
        {todo.title}
      </span>

      <button
        onClick={deleteTodo}
        className="shrink-0 rounded p-1 text-gray-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
