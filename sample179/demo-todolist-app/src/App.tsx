// ReactとuseStateフックをインポート
import React, { useState } from "react";

// 外部CSSファイルをインポート（スタイル指定用）
import "./App.css";

// コンポーネントAppを定義（このアプリ全体のメイン部分）
function App() {
  // Todoの型定義：1件のタスクが持つデータ構造を指定
  type Todo = {
    id: number; // 各Todoを識別するためのユニークなID
    inputValue: string; // タスク内容（ユーザーが入力する文字列）
    checked: boolean; // 完了したかどうか（trueなら完了）
  };

  // todos: Todoリスト全体を保持するステート（初期値は空配列）
  // setTodos: todosを更新するための関数
  const [todos, setTodos] = useState<Todo[]>([]);

  // inputValue: 新規Todoを追加するための入力欄の内容を保持
  // setInputValue: 入力値を更新する関数
  const [inputValue, setInputValue] = useState<string>("");

  // 入力欄の内容が変化したときに呼ばれるイベントハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 入力値をステートに反映
  };

  // フォーム送信時（Enterキーまたは「作成」ボタン押下時）に呼ばれる処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページの再読み込み（デフォルト動作）を防止
    setTodos([
      ...todos, // 既存のtodosを展開して保持
      { id: todos.length + 1, inputValue, checked: false }, // 新しいTodoを追加
    ]);
    setInputValue(""); // 入力欄を空にリセット
  };

  // Todo内容を編集したときに呼ばれる関数
  const handleEdit = (id: number, value: string) => {
    // todosを1件ずつmapで処理して、新しい配列を作成
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        // 編集対象のIDと一致するTodoを更新
        return { ...todo, inputValue: value }; // 新しい入力値で上書き
      }
      return todo; // それ以外のTodoはそのまま返す
    });
    setTodos(newTodos); // 新しいTodo配列でステート更新
  };

  // チェックボックスのON/OFF切り替え時に呼ばれる関数
  const handleChecked = (id: number, value: boolean) => {
    // todosをmapで走査して対象のTodoを更新
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked; // 完了状態を反転
      }
      return todo; // 更新したまたはそのままのTodoを返す
    });
    setTodos(newTodos); // ステートを更新
  };

  // Todo削除ボタンが押されたときに呼ばれる関数
  const handleDelete = (id: number) => {
    // filterを使って指定されたID以外のTodoだけ残す
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos); // 新しい配列でステート更新
  };

  // JSX（実際に画面に表示する部分）
  return (
    // アプリ全体を包むdiv（CSSクラスAppを適用）
    <div className="App">
      {/* タイトル見出し */}
      <h2>TodoList App React Typescript</h2>

      {/* 新しいTodoを作成するフォーム */}
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* 入力欄：タスク内容を入力 */}
        <input
          type="text" // 入力タイプ：テキスト
          onChange={(e) => handleChange(e)} // 入力値変更時にhandleChange呼び出し
          className="inputText" // CSSクラス
          value={inputValue} // 現在の入力値を反映
        />
        {/* 送信ボタン */}
        <input type="submit" value="作成" className="submitButton" />
      </form>

      {/* Todoリストの表示部分 */}
      <ul className="todoList">
        {/* todos配列をループして1件ずつ<li>を生成 */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* タスク内容のテキストボックス（編集可能） */}
            <input
              type="text" // テキスト入力
              onChange={(e) => handleEdit(todo.id, e.target.value)} // 入力変更で編集処理
              className="inputText" // CSSクラス
              value={todo.inputValue} // 現在の内容を反映
              disabled={todo.checked} // 完了済みなら編集不可
            />
            {/* チェックボックス（完了・未完了切り替え） */}
            <input
              type="checkbox" // チェックボックス入力
              onChange={(e) => handleChecked(todo.id, todo.checked)} // クリック時に切り替え処理
              checked={todo.checked} // 現在のチェック状態を反映
            />
            {/* 削除ボタン */}
            <button onClick={() => handleDelete(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// コンポーネントAppをエクスポート（他ファイルで使用可能にする）
export default App;



// 元のコード
// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");

//   type Todo = {
//     id: number;
//     inputValue: string;
//     checked: boolean;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setTodos([...todos, { id: todos.length + 1, inputValue, checked: false }]);
//     setInputValue("");
//   };

//   const handleEdit = (id: number, value: string) => {
//     const newTodos = todos.map((todo) => {
//       if (todo.id === id) {
//         return { ...todo, inputValue: value };
//       }
//       return todo;
//     });
//     setTodos(newTodos);
//   };

//   const handleChecked = (id: number, value: boolean) => {
//     const newTodos = todos.map((todo) => {
//       if (todo.id === id) {
//         todo.checked = !todo.checked;
//       }
//       return todo;
//     });
//     setTodos(newTodos);
//   };

//   const handleDelete = (id: number) => {
//     const newTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(newTodos);
//   };

//   return (
//     <div className="App">
//       <h2>TodoList App React Typescript</h2>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <input
//           type="text"
//           onChange={(e) => handleChange(e)}
//           className="inputText"
//         />
//         <input type="submit" value="作成" className="submitButton" />
//       </form>
//       <ul className="todoList">
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <input
//               type="text"
//               onChange={(e) => handleEdit(todo.id, e.target.value)}
//               className="inputText"
//               value={todo.inputValue}
//               disabled={todo.checked}
//             />
//             <input
//               type="checkbox"
//               onChange={(e) => handleChecked(todo.id, todo.checked)}
//               checked={todo.checked}
//             />
//             <button onClick={() => handleDelete(todo.id)}>削除</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// 📝 Todoリストアプリ（疑似コード）
// 初期設定
// まず、Todoというデータの形を決める。
// 　各Todo（タスク）は次の3つの情報を持つ。
// 　- ID（連番）
// 　- 入力されたテキスト（タスク内容）
// 　- 完了しているかどうか（チェック状態）

// アプリの中で使う2つのデータを準備する。
// 　- todos：Todoリスト全体を入れておく（最初は空）
// 　- inputValue：入力欄の中の文字を入れておく（最初は空文字）

// 入力欄の動き

// ユーザーがテキスト入力欄に文字を入力したら、
// 　→ inputValueにその文字を保存する。

// Todoの追加処理

// ユーザーが「作成」ボタンを押す（またはEnterキーを押す）と、フォーム送信が起こる。

// 送信時にはページがリロードされないように止める。

// 入力欄が空（または空白だけ）の場合は何もしない。

// 入力があれば、新しいTodoデータを作る。
// 　- IDは今あるTodoの数 + 1
// 　- 内容は入力欄の文字
// 　- チェック状態は「未完了（false）」

// 既存のリストに新しいTodoを追加する。

// 入力欄を空に戻す。

// Todoの編集処理

// 各Todoの横にあるテキストボックスの内容をユーザーが変更したら、
// 　→ 該当するTodoを探して、入力値を新しい文字に書き換える。

// 他のTodoはそのままにしておく。

// 編集後の新しいリストでtodosを更新する。

// チェックボックスの切り替え

// チェックボックスをクリックすると、
// 　→ 該当するTodoを探して、
// 　　「完了 ⇄ 未完了」を切り替える（trueとfalseを反転）。

// 新しい状態のTodoリストで更新する。

// チェック済みのTodoは編集できないようにする。

// Todoの削除

// 「削除」ボタンを押すと、
// 　→ 該当するTodoをリストから取り除く。

// 残ったTodoだけでリストを更新する。

// 画面表示の流れ

// 画面上部にタイトル「TodoList App React Typescript」を表示。

// その下に入力フォームを表示。
// 　- テキスト入力欄（タスク内容を入力）
// 　- 「作成」ボタン（押すと追加）

// 入力されたTodoをリスト形式で表示。
// 　各行には以下が並ぶ：
// 　- 編集用テキストボックス（完了済みなら無効）
// 　- チェックボックス（完了状態を切り替える）
// 　- 削除ボタン（押すとリストから消える）

// 動作まとめ

// 入力 → 作成 → 編集 → 完了チェック → 削除
// 　という一連のTodo管理がブラウザ上でできる。

// すべてのデータはReactのuseStateで管理され、ページを再読み込みするとリセットされる（ローカル保存はしない）。