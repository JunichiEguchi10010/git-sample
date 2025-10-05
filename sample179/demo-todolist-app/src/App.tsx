import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  type Todo = {
    id: number;
    inputValue: string;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="App">
      <h2>TodoList App React Typescript</h2>
      <form onSubmit={() => {}}>
        <input type="text" onChange={(e) => handleChange(e)} className="inputText" />
        <input type="submit" value="作成" className="submitButton" />
      </form>
    </div>
  );
}

export default App;
