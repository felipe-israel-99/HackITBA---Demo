"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import LoginForm from "@/components/LoginForm";
import TodoApp from "@/components/TodoApp";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sb = getSupabase();
    sb.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />
      </div>
    );
  }

  if (!user) return <LoginForm />;
  return <TodoApp user={user} />;
}
