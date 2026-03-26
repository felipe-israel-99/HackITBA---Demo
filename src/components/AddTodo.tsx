"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface AddTodoProps {
  userId: string;
  onAdd: () => void;
}

export default function AddTodo({ userId, onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    const { error } = await getSupabase()
      .from("todos")
      .insert({ title: title.trim(), user_id: userId });

    if (!error) {
      setTitle("");
      onAdd();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}
