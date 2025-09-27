// SupabaseのTodoテーブルを操作するための関数をまとめたファイル「データ操作用のサービスファイル」
// supabaseクライアントをインポート
// supabaseはデータベースと通信するためのオブジェクトです
import { supabase } from "../utils/supabase";

// Todo型のインポート（型安全のために使用）
import { Todo } from "./interface";

// すべてのTodoを取得する関数
// 型定義（TypeScriptの型）がなくても JavaScriptとしては動くので必須ではありません
export const getAllTodos = async () => {
    // Supabaseの "todo" テーブルから全ての行を取得
    const todos = await supabase.from("todo").select("*");
    
    // 取得したデータだけを返す（rowsの配列）
    return todos.data;
};

// 新しいTodoを追加する関数
// title: 追加するTodoのタイトル
export const addTodo = async (title: string) => {
    // "todo" テーブルに新しい行を追加
    // insertは配列でデータを渡す必要があります
    await supabase
        .from('todo')
        .insert([{ title }]);
};

// Todoを削除する関数
// id: 削除したいTodoのID
export const deleteTodo = async (id: number) => {
    // "todo" テーブルからidが一致する行を削除
    // eq('id', id) は "idカラムがidと等しい行" を指定
    await supabase
        .from('todo')
        .delete()
        .eq('id', id);
};

// 💡 補足説明
// supabase.from("todo") は「todoテーブルを操作する準備」という意味です。
// .select("*") は「すべてのカラムを取得する」という意味です。
// .insert([{ title }]) は「配列で渡したオブジェクトをテーブルに追加する」という意味です。
// .delete().eq('id', id) は「idが一致する行を削除する」という意味です。


// import { supabase } from "../utils/supabase";
// import { Todo } from "./interface";

// export const getAllTodos = async () => {
//     const todos = await supabase.from("todo").select("*");
//     return todos.data;
// };

// export const addTodo = async (title: string) => {
//     await supabase
//         .from('todo')
//         .insert([{ title }]);
// };

// export const deleteTodo = async (id: number) => {
//     await supabase
//         .from('todo')
//         .delete()
//         .eq('id', id);
// };