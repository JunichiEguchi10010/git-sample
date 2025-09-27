"use client"; // このコンポーネントをクライアント側で実行する指定（Next.js App Router）

import React, { useEffect, useState } from "react"; // React本体とフック（useState, useEffect）をインポート
import { TodoList } from "./TodoList"; // Todoリスト表示用の子コンポーネントをインポート
import { addTodo, getAllTodos } from "../utils/supabasefunctions"; // Supabase操作用の関数をインポート
import { Todo } from "../utils/interface"; // Todo型のインターフェースをインポート

export default function TodoApp() { // Todoアプリのメインコンポーネントを定義
  const [todos, setTodos] = useState<Todo[]>([]); // Todo一覧を保持するstateを定義（初期値は空配列）
  const [title, setTitle] = useState<string>(""); // 入力フォームの値を保持するstateを定義（初期値は空文字）

  useEffect(() => { // コンポーネント初回マウント時に実行する処理
    const getTodos = async () => { // 非同期関数を定義（Todoを取得する処理）
      const todos = await getAllTodos(); // ← Supabaseから全てのTodoを取得して、ローカル変数todosに格納する
      setTodos(todos); // setTodos(todos); // 取得したTodo（変数todosに格納済）をuseStateで定義済みのsetTodos関数を使いstateに反映
      console.log(todos); // デバッグ用に取得したTodoをコンソールに出力
    };
    getTodos(); // 定義した関数を呼び出して実行
  }, []); // 第二引数に空配列 → 初回レンダリング時のみ実行

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => { // フォーム送信時に呼ばれる関数を定義
    e.preventDefault(); // フォーム送信時のデフォルト動作（ページリロード）を防止
    if (title.trim()) { // 入力が空白でない場合のみ処理を実行
      try { // エラーが発生する可能性がある処理をtryで囲む
        await addTodo(title); // Supabaseに新しいTodoを追加
        setTitle(""); // 入力欄をクリア（初期化）
        const todos = await getAllTodos(); // 最新のTodo一覧を再取得
        setTodos(todos); // stateを更新して画面を再レンダリング
      } catch (error) { // エラー発生時の処理
        console.error("Error adding todo:", error); // エラー内容をコンソールに表示
      }
    }
  };

  return ( // JSXの返り値を記述
    <section className="text-center mb-2 text-2xl font-medium"> {/* 全体を囲むセクション。中央寄せ＆余白・文字スタイル */}
      <h3>Supabase Todo App</h3> {/* アプリタイトル */}

      <form onSubmit={handlesubmit}> {/* Todo追加用フォーム。送信時にhandlesubmitを実行 */}
        <input
          type="text" // 入力タイプはテキスト
          value={title} // 入力値をstateと同期
          className="mr-2 shadow-lg p-1 outline-none" // 見た目用のTailwindクラス
          onChange={(e) => setTitle(e.target.value)} // 入力が変わるたびにstateを更新
        />
        <button className="shadow-md border-1 py-1 px-1 rounded-lg bg-green-200">
          Add {/* ボタンラベル */}
        </button>
      </form>

      <TodoList todos={todos} setTodos={setTodos} /> {/* Todoリストを表示する子コンポーネントにpropsを渡す */}
    </section>
  );
}

// TodoList todos={todos} setTodos={setTodos}の解説
// 左側 = propsの名前（子にどう見せるかのラベル）右側 = 親の変数（実際に渡すデータ）
// 名前は同じでも別物だが、分かりやすさのために合わせているだけ

// 元コード
// "use client";
// import React, { useEffect, useState } from "react";
// import { TodoList } from "./TodoList";
// import { addTodo, getAllTodos } from "../utils/supabasefunctions";
// import { Todo } from "../utils/interface";

// export default function TodoApp() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [title, setTitle] = useState<string>("");

//   useEffect(() => {
//     const getTodos = async () => {
//       const todos = await getAllTodos();
//       setTodos(todos);
//       console.log(todos);
//     };
//     getTodos();
//   }, []);

//   const handlesubmit = async (e: any) => {
//     e.preventDefault();
//     if (title.trim()) {
//       try {
//         await addTodo(title);
//         setTitle(""); // フォームをクリア
//         // Todo一覧を再取得
//         const todos = await getAllTodos();
//         setTodos(todos);
//       } catch (error) {
//         console.error('Error adding todo:', error);
//       }
//     }
//   };

//   return (
//     <section className="text-center mb-2 text-2xl font-medium">
//       <h3>Supabase Todo App</h3>
//       <form onSubmit={(e) => handlesubmit(e)}>
//         <input
//           type="text"
//           value={title}
//           className="mr-2 shadow-lg p-1 outline-none"
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button className="shadow-md border-1 py-1 px-1 rounded-lg bg-green-200">
//           Add
//         </button>
//       </form>
//       <TodoList todos={todos} setTodos={setTodos} />
//     </section>
//   );
// }


// 疑似コード
// コンポーネント TodoApp を作る
//   - todos という配列を用意（Todo一覧を保持）
//   - title という文字列を用意（入力フォームの値を保持）

//   コンポーネントが表示されたら
//     - Supabase から全ての Todo を取得
//     - 取得した Todo を todos に入れる
//     - デバッグ用にコンソールに表示

//   フォームが送信されたら
//     - ページのリロードを防ぐ
//     - title が空白でなければ
//         - Supabase に新しい Todo を追加
//         - 入力フォームを空にする
//         - 最新の Todo 一覧を取得
//         - todos に反映する
//     - エラーが発生したらコンソールに表示

//   表示内容
//     - セクションを作る（中央寄せ、余白、文字サイズなど）
//     - タイトル「Supabase Todo App」を表示
//     - 入力フォームを表示
//         - 入力内容を title と同期
//         - 送信ボタン「Add」を表示
//     - TodoList コンポーネントを表示
//         - todos と setTodos関数 を渡す


// TodoApp の動作の流れ
// 初期化
// ・Todo一覧を格納する todos 配列と、入力フォームの値 title を用意する。

// 初回表示時
// ・Supabase から全ての Todo を取得して todos に反映。

// Todo 追加
// ・ユーザーがフォームに入力して送信すると、以下を実行：
//      ページリロードを防ぐ
//      入力が空でなければ、新しい Todo を Supabase に追加
//      入力フォームをクリア
//      最新の Todo 一覧を取得して todos に反映

// 表示
// ・タイトルと入力フォームを表示
// ・Todo 一覧を TodoList コンポーネントで表示

// つまり、 「初期取得 → ユーザー追加 → 表示更新」 という流れになっています。