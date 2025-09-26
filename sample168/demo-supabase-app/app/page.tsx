// app/page.tsx 	ルート (/) ページ
// TodoApp コンポーネントをインポート（ToDoリストの機能を持つ再利用可能な部品）
import TodoApp from '../components/TodoApp';

// このファイルは App Router 構成のページコンポーネント（例: app/page.tsx）
export default function Home() {
  return (
    // 画面全体を使って中央に TodoApp を配置するセクション
    <section className="flex justify-center items-center h-screen">
      {/* ToDoアプリのメインUIを表示 */}
      <TodoApp />
    </section>
  );
}


// 元コード
// import TodoApp from '../components/TodoApp';

// export default function Home() {
//   return (
//     <section className="flex justify-center items-center h-screen">
//       <TodoApp />
//     </section>
//   );
// }

// ✅ よくある誤解との違い
// pages/index.tsx → /（Pages Router構成）
// app/page.tsx → /（App Router構成）
// つまり、Pages Routerでは pages/index.tsx がルート、 App Routerでは app/page.tsx がルートです。