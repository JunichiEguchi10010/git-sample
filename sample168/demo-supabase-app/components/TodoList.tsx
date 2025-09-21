import React from "react";
import { Todo } from "../utils/interface";

type Props = {
  todos: Todo[];
};

export const TodoList = (props: Props) => {
  const { todos } = props;

  return (
    <div>
      <ul className="mx-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between"
          >
            <li className="font-medium">✅ {todo.title}</li>
            <span className="cursor-pointer">×</span>
          </div>
        ))}
      </ul>
    </div>
  );
};
