"use client";
import React, { useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { addTodo, getAllTodos } from "../utils/supabasefunctions";

export default function TodoApp() {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos);
    };
    getTodos();
  }, []);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await addTodo(title);
        setTitle(""); // フォームをクリア
        // Todo一覧を再取得
        const todos = await getAllTodos();
        setTodos(todos);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  return (
    <section className="text-center mb-2 text-2xl font-medium">
      <h3>Supabase Todo App</h3>
      <form onSubmit={(e) => handlesubmit(e)}>
        <input
          type="text"
          value={title}
          className="mr-2 shadow-lg p-1 outline-none"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="shadow-md border-1 py-1 px-1 rounded-lg bg-green-200">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </section>
  );
}
