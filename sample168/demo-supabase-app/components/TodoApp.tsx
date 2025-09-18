import React from "react";
import { TodoList } from '../components/TodoList';

export default function TodoApp() {
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
