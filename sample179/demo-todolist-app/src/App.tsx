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
           placeholder="新しいタスクを入力してください"
         />
        {/* 送信ボタン */}
        <input type="submit" value="作成" className="submitButton" />
      </form>

       {/* Todoリストの表示部分 */}
       {todos.length === 0 ? (
         <div className="empty-message">
           <p>📝 まだタスクがありません</p>
           <p>上のフォームから新しいタスクを追加してください</p>
         </div>
       ) : (
         <ul className="todoList">
           {/* todos配列をループして1件ずつ<li>を生成 */}
           {todos.map((todo) => (
             <li key={todo.id} className={todo.checked ? 'completed' : ''}>
               {/* チェックボックス（完了・未完了切り替え） */}
               <input
                 type="checkbox" // チェックボックス入力
                 onChange={(e) => handleChecked(todo.id, todo.checked)} // クリック時に切り替え処理
                 checked={todo.checked} // 現在のチェック状態を反映
               />
               {/* タスク内容のテキストボックス（編集可能） */}
               <input
                 type="text" // テキスト入力
                 onChange={(e) => handleEdit(todo.id, e.target.value)} // 入力変更で編集処理
                 className="inputText" // CSSクラス
                 value={todo.inputValue} // 現在の内容を反映
                 disabled={todo.checked} // 完了済みなら編集不可
                 placeholder="タスクを入力してください"
               />
               {/* 削除ボタン */}
               <button onClick={() => handleDelete(todo.id)}>削除</button>
             </li>
           ))}
         </ul>
       )}
    </div>
  );
}

// コンポーネントAppをエクスポート（他ファイルで使用可能にする）
export default App;





// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   type Todo = {
//     id: number;
//     inputValue: string;
//     checked: boolean;
//   };

//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setTodos([
//       ...todos,
//       { id: todos.length + 1, inputValue, checked: false },
//     ]);
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
//           value={inputValue}
//           placeholder="新しいタスクを入力してください"
//         />
//         <input type="submit" value="作成" className="submitButton" />
//       </form>

//       {todos.length === 0 ? (
//         <div className="empty-message">
//           <p>📝 まだタスクがありません</p>
//           <p>上のフォームから新しいタスクを追加してください</p>
//         </div>
//       ) : (
//         <ul className="todoList">
//           {todos.map((todo) => (
//             <li key={todo.id} className={todo.checked ? "completed" : ""}>
//               <input
//                 type="checkbox"
//                 onChange={(e) => handleChecked(todo.id, todo.checked)}
//                 checked={todo.checked}
//               />
//               <input
//                 type="text"
//                 onChange={(e) => handleEdit(todo.id, e.target.value)}
//                 className="inputText"
//                 value={todo.inputValue}
//                 disabled={todo.checked}
//                 placeholder="タスクを入力してください"
//               />
//               <button onClick={() => handleDelete(todo.id)}>削除</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default App;

// 🧩 Todoリストアプリ（疑似コード）
// 
// 【アプリ全体の流れ】
// 1. ReactとuseStateを使えるようにする
// 2. スタイル(App.css)を読み込む
// 3. Todoアプリ(App)を定義する

// 【データ構造の定義】
// Todo型を定義：
//   各タスクは
//     id（番号）
//     inputValue（内容）
//     checked（完了かどうか）
//   の3つの情報を持つ

// 【状態(State)の用意】
// todos：すべてのタスクを管理する配列（初期値：空）
// inputValue：入力フォームに入力された文字列（初期値：空）

// 【処理の流れ】
// ▼ 入力欄の文字が変わったとき
//   handleChange(イベント):
//     入力された文字をinputValueに保存する

// ▼ フォームを送信したとき（タスク追加）
//   handleSubmit(イベント):
//     ページのリロードを止める
//     新しいタスクを作成
//       id = 現在の件数 + 1
//       inputValue = 入力された文字
//       checked = false（未完了）
//     todosに新しいタスクを追加
//     入力欄を空にする

// ▼ タスクの内容を編集したとき
//   handleEdit(id, 新しい文字):
//     todosを1件ずつ調べる
//     idが一致するタスクのinputValueを更新
//     更新した配列をtodosに保存する

// ▼ チェックボックスをクリックしたとき
//   handleChecked(id, 現在の状態):
//     todosを1件ずつ調べる
//     idが一致するタスクのcheckedを反転（true⇔false）
//     更新した配列をtodosに保存する

// ▼ 削除ボタンを押したとき
//   handleDelete(id):
//     idが一致するタスクを配列から除外
//     更新した配列をtodosに保存する

// 【画面表示（JSXのイメージ）】
// 画面全体を<div className="App">で囲む

// タイトルを表示：
//   「TodoList App React Typescript」

// フォームを表示：
//   - テキスト入力欄（inputValueと連動）
//   - 「作成」ボタン

// もしタスクが1件もなければ：
//   「📝 まだタスクがありません」
//   「上のフォームから新しいタスクを追加してください」
//   というメッセージを表示

// もしタスクが1件以上あれば：
//   <ul>でタスク一覧を表示
//   各タスク（li）は次の内容を持つ：
//     ① チェックボックス → 完了/未完了を切り替える
//     ② テキスト入力欄 → 内容を編集できる（完了済みは入力不可）
//     ③ 削除ボタン → タスクを削除
//   完了したタスクには「completed」クラスが付く

// 【アプリの終了処理】
// Appコンポーネントを外部に公開（export default App）

// 【全体の動きまとめ】
// ユーザーが入力 → タスク追加  
// 　↓  
// リストに表示 → 編集・完了チェック・削除ができる  
// 　↓  
// 状態（todos）が更新されるたびに画面が再描画される