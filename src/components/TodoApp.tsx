"use client";

import { useEffect, useState, useCallback } from "react";
import { getSupabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Todo } from "@/lib/types";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

interface TodoAppProps {
  user: User;
}

type Filter = "all" | "active" | "completed";

export default function TodoApp({ user }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  const fetchTodos = useCallback(async () => {
    const { data } = await getSupabase()
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setTodos(data ?? []);
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSignOut = async () => {
    await getSupabase().auth.signOut();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.is_complete;
    if (filter === "completed") return todo.is_complete;
    return true;
  });

  const activeCount = todos.filter((t) => !t.is_complete).length;

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Todo App</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <AddTodo userId={user.id} onAdd={fetchTodos} />

        {/* Filters */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1">
            {(["all", "active", "completed"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {activeCount} item{activeCount !== 1 ? "s" : ""} left
          </span>
        </div>

        {/* Todo list */}
        <div className="mt-4 space-y-2">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              {filter === "all"
                ? "No todos yet. Add one above!"
                : `No ${filter} todos.`}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
