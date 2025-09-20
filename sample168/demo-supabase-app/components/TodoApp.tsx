"use client";
import React, { useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { getAllTodos } from "../utils/supabasefunctions";

export default function TodoApp() {
  const [todos, setTodos] = useState<any>([]);
  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos);
    };
    getTodos();
  }, []);

  return (
    <section className="text-center mb-2 text-2xl font-medium">
      <h3>Supabase Todo App</h3>
      <form>
        <input type="text" className="mr-2 shadow-lg p-1 outline-none" />
        <button className="shadow-md border-1 py-1 px-1 rounded-lg bg-green-200">
          Add
        </button>
      </form>
      <TodoList />
    </section>
  );
}
