React useId(Hooks) 20250508

React 18 で導入された 一意な ID を生成するためのフック です。
主に、クライアントとサーバーで一貫性のある ID を生成したい場面や、フォーム要素とラベルを結びつけるために使われます。
（アクセシビリティ対応）

✅ 基本構文
jsx
import { useId } from 'react';

function MyComponent() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>名前:</label>
      <input id={id} type="text" />
    </div>
  );
}
🔍 特徴・使いどころ
項目	                        説明
🌐 SSR対応	                   サーバーサイドレンダリングで生成される ID とクライアントでの ID が一致します。
🧠 ユニーク保証	                複数コンポーネント内でも一意な ID を生成できます。
🔄 再レンダリング安全	        コンポーネントが再レンダリングされても ID は変わりません。
🧩 主な用途	                    <label htmlFor=...>と<input id=...>のようなアクセシビリティ対応、ARIA属性、SVG要素の ID など。

⚠️ 注意点
useId はプレフィックス付きの ID（例: :r0:）を返すため、CSS セレクタなどで直接使うのには向いていません。
useId は 副作用（サイドエフェクト）を持たないので、どこでも安全に呼び出せます。

🆚 useId vs ランダムID生成
項目	                    useId	                    ランダムID（uuid, Math.random()など）
再レンダリング	            IDが変わらない	              毎回変わる可能性あり
SSR対応	                       〇	                     ×（一致しない可能性がある）
シンプルさ                     〇（React標準）	         外部ライブラリやカスタムロジックが必要