// React を使うための基本インポート
import React from "react";
// Todo型を使うために、interface（型定義）を読み込み
import { Todo } from "../utils/interface";
// Supabaseでデータ操作をする関数を読み込み（削除と全件取得）
import { deleteTodo, getAllTodos } from "../utils/supabasefunctions";

// コンポーネントが受け取る props の型定義
type Props = {
  // 表示する todo の配列
  todos: Todo[];
  // todo の配列を更新するための関数（Reactのstate更新関数）
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

// Todoリストを表示するコンポーネント
export const TodoList = (props: Props) => {
  // props から todos と setTodos を取り出す
  const { todos, setTodos } = props;

  // 削除ボタンを押したときに呼ばれる関数
  // 引数 id は削除する todo のID
  const handleDelete = async (id: number) => {
    // Supabase の削除処理を呼び出す
    await deleteTodo(id);
    // 最新の todo 一覧を再取得する
    let todos = await getAllTodos();
    // state を更新して、画面に反映
    setTodos(todos || []); // nullの可能性があるので空配列にフォールバック
  };

  // 実際に画面に表示する部分（JSX）
  return (
    <div>
      {/* Todoのリストを表示する領域 */}
      <ul className="mx-auto">
        {/* todos 配列を map で繰り返し処理し、1件ずつ表示 */}
        {todos.map((todo) => (
          <div
            key={todo.id} // React がリストを管理するために一意のキーを指定
            className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between"
          >
            {/* Todo のタイトルを表示する部分 */}
            <li className="font-medium">✅ {todo.title}</li>
            {/* 削除ボタン（× をクリックすると handleDelete が実行される） */}
            <span
              className="cursor-pointer" // マウスカーソルを手の形（クリック可能）にするスタイル
              onClick={() => handleDelete(todo.id)} // クリックされたときに「削除処理」を実行する。対象はこの todo の id
            >
              × {/* 実際に表示されるのはバツ印（削除ボタンの見た目） */}
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};

// 補足
// props → 親コンポーネントから渡されるデータ。
// useState で作られた setTodos → 画面を再描画するための更新関数。
// map → 配列を繰り返して JSX を生成。
// key → React がリストを管理するために必須。
// async/await → 非同期処理（Supabaseの通信）が終わるまで待つ。

// onClick={...} → クリックイベントを設定する。
// () => handleDelete(todo.id) → 無名関数で包むことで「クリックされたときだけ関数を実行」するようにしている。
// （直接 onClick={handleDelete(todo.id)} と書くと、レンダリング時に勝手に実行されてしまうので注意！）
// todo.id → 削除したい対象を区別するための番号。

// 「空配列にフォールバック」とは？
// ある処理や関数が期待したデータを取得できなかった場合に、
// 代わりに空の配列（[]）を返すことで、エラーや不具合を防ぐという設計パターンです。
// これは特に、配列操作やループ処理を行う場面でよく使われます。


// 元コード
// import React from "react";
// import { Todo } from "../utils/interface";
// import { deleteTodo, getAllTodos } from "../utils/supabasefunctions";

// type Props = {
//   todos: Todo[];
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// };

// export const TodoList = (props: Props) => {
//   const { todos, setTodos } = props;

//   const handleDelete = async (id: number) => {
//     await deleteTodo(id);
//     let todos = await getAllTodos();
//     setTodos(todos || []);
//   };

//   return (
//     <div>
//       <ul className="mx-auto">
//         {todos.map((todo) => (
//           <div
//             key={todo.id}
//             className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between"
//           >
//             <li className="font-medium">✅ {todo.title}</li>
//             <span
//               className="cursor-pointer"
//               onClick={() => handleDelete(todo.id)}
//             >
//               ×
//             </span>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };


// 疑似コード
// ■ TodoListコンポーネント（Todo一覧を表示する役割）

// 入力（propsとして受け取るもの）:
//     - todos: Todoのリスト（配列）
//     - setTodos: Todoリストを更新するための関数

// 処理内容:
//     - todosの内容を画面にリスト形式で表示する
//     - 各Todoの横に「削除ボタン（×）」を表示する
//     - 削除ボタンを押したときに以下の処理を行う:
//         1. Supabaseに削除処理を依頼する（対象は選ばれたTodoのid）
//         2. Supabaseから最新のTodo一覧を再取得する
//         3. setTodosを使って親の状態を更新する（画面も自動で更新される）

// 表示内容:
//     - 画面に todos を1つずつ表示
//         → 「✅ タイトル」と「×（削除ボタン）」を横並びで出す
//     - 削除ボタンを押すと handleDelete 関数が呼ばれる

// 🔰 簡単に言うと
// 親コンポーネントから渡されたTodo一覧を表示する
// 削除ボタンを押すと、データベースから削除してリストを更新する