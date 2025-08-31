Next.js React Hooks 20250831

React 19 βで追加された新フックとNext.jsでの使い方
React 19 βでは、フォーム処理やサーバーアクションに関連する 新しいHooks が追加されました。
特に Next.js の App Router と組み合わせることで、APIルートを作らずに「シンプルで高速なフォーム処理」が可能になります。
→ フォーム周りが楽になるエコシステムが多く追加された。

1️⃣ React 19 βで追加された新フック
新しく追加されたのは以下の4つです👇

・useFormStatus
・useFormState
・useActionState
・useOptimistic

➡ 特に「フォーム送信の管理」「サーバー処理の結果反映」「楽観的UI更新（Optimistic UI）」といった ユーザー体験（UX）改善 に直結する機能が強化されています。

2️⃣ Next.jsで使う理由

React 単体ではサーバーコンポーネント（RSC）は使えません。
サーバーアクションや新フックを活かすには、**RSCに対応したフレームワーク（Next.jsなど）**が必要です。

🔹 RSC（React Server Components）の基礎
クライアントコンポーネント: ブラウザ側で実行（use client が必要）
サーバーコンポーネント: サーバー側で実行（SSR/SSGもここに含まれる）

👉 Next.js では デフォルトがサーバーコンポーネント。
👉 クライアント側でしか動かないHooks（例: useStateやuseEffect）を使うときだけ、ファイルの先頭に use client を書きます。

3️⃣ サーバーアクション（Server Actions）
React 19 で大きく変わったのがこれ。

🔹 書き方
<form action={formAction}>
  <input type="text" name="username" />
  <input type="email" name="email" />
  <button type="submit">Sign Up</button>
</form>

async function formAction(formData: FormData) {
  "use server"; // ← サーバーで実行される
  const username = formData.get("username");
  const email = formData.get("email");
  console.log("サーバーで実行中", username, email);
}

🔹 メリット

APIルートを作らなくてもOK（fetch不要）
JavaScriptが無効な環境でも動作
レスポンスが速くUXが向上

👉 今までは「APIを作って → fetch で叩いて → state更新」だったのが、
「フォーム送信 → サーバーで処理 → 自動で反映」 という流れになります。

4️⃣ 新フックの使い方
ここからがReact 19 βの本命。サーバーアクションと組み合わせることで、UXをぐっと改善できます。
① useFormState（サーバーアクション版 useState）
useFormState(サーバーアクション, 初期値) の形で呼ぶ
[state, formAction] を返す
サーバー処理の結果を state に反映できる

👉 今までの useState がクライアント用だったのに対し、useFormState はサーバー処理と直結しているのが特徴です。
👉 Redux の Reducer にも似た構造。

例：カートに商品を追加
const addToCart = async (prevState, formData) => {
  "use server";
  const product = formData.get("product");
  return `商品「${product}」をカートに追加しました！`;
};

const [message, formAction] = useFormState(addToCart, "");

<form action={formAction}>
  <input type="text" name="product" />
  <button type="submit">追加</button>
</form>

<p>{message}</p>


➡ 送信するとサーバー側で処理が走り、その結果が message に反映されます。

② useActionState（進化版 useFormState）
React 公式では 今後はこちらに移行予定。
useFormState に加えて ペンディング状態（処理中かどうか） を取得できる。
ボタンを送信中は無効化するなど、UXがさらに改善。

👉 ただし 2025年現在、Next.js 14.2ではまだ完全対応していません。
👉 近い将来、useFormState は廃止され、useActionState に統一される見込みです。

③ useOptimistic（楽観的UI更新）
サーバー処理が終わるのを待たずに 先にUIを更新 できる。
チャットやコメント投稿のような「すぐに反映してほしいUI」に便利。

例：チャットメッセージ
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (current, newMessage) => [
    ...current,
    { text: newMessage, sending: true }
  ]
);

const sendMessage = async (formData) => {
  "use server";
  const message = formData.get("message");
  addOptimisticMessage(message);
  // サーバー保存処理
};

➡ 入力した瞬間に「sending...」が表示され、サーバー保存完了後に正式データへ更新。

5️⃣ 実装フローまとめ
フォーム送信
<form action={サーバーアクション}> で直接サーバー処理

値の取得
FormData から formData.get("name")

状態反映
useFormState / useActionState でサーバーの結果をstateに反映

UX向上
ペンディング中はボタン無効化
useOptimistic で即時UI反映

✅ まとめ

React 19 βの目玉はフォーム処理の改善
Server Actions によりAPIレスでシンプルに書ける
useFormState → useActionState へ進化予定（ペンディング管理つき）
useOptimistic でUXを一気に向上（チャットやコメント投稿に最適）


React19で新登場したHooks19で新登場したReact19で新登場したHooksを分かりやすく解説します【Next.js AppRouterを利用】
 https://www.youtube.com/watch?v=_whls1Kc74c&t=1480s
