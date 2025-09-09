Next.js サーバーアクション（Server Actions） React Hooks 20250831 20250909


Server Actionsとは？
"use server"ディレクティブを使って非同期関数を定義し、サーバー側で実行される処理として使えます。
フォーム送信や、UIと同じコード上でのデータ更新ロジックが、より簡潔に記述できるようになっています。
Next.js 14～採用済み

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

🟥 React 単体ではサーバーコンポーネント（RSC）は使えません。
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

② useActionState（旧： useFormState）
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


✅ Next.jsのサーバーアクション（Server Actions）とは？
フォーム送信やボタンクリックなどのユーザー操作に応じてサーバー側で処理を実行するための仕組みです。
従来のAPIルートを使ったやり方よりも、コードがシンプルで直感的になります。


🧠 サーバーアクションの本質
非同期関数として定義され、サーバー上で実行される

クライアントコンポーネントから直接呼び出せる

use serverというディレクティブを関数の冒頭に書くことで、Next.jsに「これはサーバーアクションだよ」と伝える

tsx
// actions.ts
'use server';

export async function updateUserAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // サーバー側でDB更新などの処理
  await updateUser({ name, email });
}
tsx
// edit-profile.tsx
import { updateUserAction } from './actions';

export default function EditProfileForm() {
  return (
    <form action={updateUserAction}>
      <input name="name" type="text" />
      <input name="email" type="email" />
      <button type="submit">更新</button>
    </form>
  );
}
✅ サーバーアクションのメリット
特徴	          内容
🔄 API不要	  APIエンドポイントを作らずに直接処理を呼び出せる
🧩 型安全	    TypeScriptと相性が良く、型安全に処理できる
🔐 セキュア	  APIキーなどの秘密情報をクライアントに漏らさず扱える
🧼 シンプル	  UIイベントとサーバー処理が密に連携でき、コードが整理される

🧭 Server Componentsとの違い
項目	           Server Components	      Server Actions
目的	          データを表示する	        データを変更する
実行タイミング	 ページ読み込み時	         ユーザー操作時（submitなど）
合言葉	        なし（デフォルト）	       'use server'
よく使う場面	  DBから取得して表示	        フォーム送信、DB更新、削除など

構造的な理解を重視する方には、Server Actionsは「UIイベント → サーバー処理 → 状態更新」という明快な流れを提供してくれる仕組みです。
APIルートの煩雑さを減らし、インセンティブ設計やUX改善にも貢献できます。


✅ Next.jsの「従来のAPIルート（API Routes）」は、サーバーレス関数（Serverless Functions）として動作する仕組みで、Next.jsアプリ内にバックエンドの処理を直接組み込める便利な機能です。これは、App Router以前の構成（pagesディレクトリベース）でよく使われていました。

🛠 基本構造
APIルートは、pages/apiディレクトリ内にファイルを作成することで定義されます。ファイル名がそのままエンドポイントになります。

ts
// pages/api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API Route!' });
}
この例では、/api/hello にアクセスすると {"message": "Hello from API Route!"} が返されます。

📦 特徴と仕組み
特徴	                    内容
📍 ルーティング	        pages/api/以下のファイルが自動的にAPIエンドポイントになる
🧠 実行環境	          サーバーサイドでのみ実行される（クライアントからは直接呼び出せない）
🧪 HTTPメソッド対応	  req.method を使って GET, POST, PUT, DELETE などを分岐できる
🔐 セキュリティ	      APIキーやDB接続など、クライアントに見せたくない処理を安全に記述可能
☁️ デプロイ           	Vercelなどにデプロイすると自動的にサーバーレス関数として扱われる

🧭 App Routerとの違い
項目	        従来のAPIルート	                  App RouterのRoute Handlers
ディレクトリ	pages/api	                          app/api
ファイル構成	1ファイルに複数メソッドを記述     	メソッドごとに関数を分けて定義
型	          req, res（Express風）	            NextRequest, NextResponse（より抽象的）
柔軟性	      シンプルで分かりやすい	            より細かい制御が可能（params, bodyなど）

🧠 補足：インセンティブ構造と設計視点
従来のAPIルートは、フロントとバックを同一コードベースで管理できるという点で、開発者のインセンティブに合致しています。
特に小規模プロジェクトやプロトタイピングでは、外部APIや別サーバーを立てるコストを削減できるため、リソース配分の最適化に貢献します。

ただし、状態管理やキャッシュ制御が分離されているため、UX設計やパフォーマンス最適化には追加の工夫が必要です。
App RouterやServer Actionsはこのギャップを埋める進化形と言えます。


Next.jsには現在、3つの主要な「サーバーサイド処理の方法」が存在しています。それぞれの役割と使い方が異なり、目的や設計思想に応じて使い分けることが重要です。Junichiさんのように構造的に理解したい方には、以下のような整理が役立つはずです。

✅ 3つのサーバーサイド処理方式の比較
名称	            使用場所	              主な用途	                                          特徴	                  利用対象
API Routes	    pages/api/*	          REST APIのような外部公開用エンドポイント	            従来型。Express風の記述。	  Page Router（旧構成）
Route Handlers	app/api/*	            App RouterでのAPI処理	HTTPメソッドごとに関数を分離。  より柔軟。	                App Router（新構成）
Server Actions	Reactコンポーネント内	 フォーム送信やボタン操作などのアクション処理	'         use server'で宣言。         UIと密結合。	App Router（Next.js 14以降）

🧠 それぞれの思想とインセンティブ構造
1. API Routes（旧式）
思想: クライアントとサーバーを明確に分離
利点: 外部アプリやモバイルからも呼び出せる汎用API
欠点: UIとの連携がやや煩雑。状態管理は別途必要

2. Route Handlers（App Router用API）
思想: API Routesの進化形。HTTPメソッドごとに関数を分離
利点: 柔軟なレスポンス制御。NextRequest / NextResponseで抽象化
欠点: UIとの結合は弱く、依然としてAPI設計が必要

3. Server Actions（新機能）
思想: UIイベントとサーバー処理を密結合し、コードを簡潔に
利点: フォーム送信やDB更新などを直接コンポーネント内で記述可能
欠点: 他アプリからの呼び出し不可。Next.js内で閉じた処理に限定

🧩 向け補足：戦略的な使い分け
API Routes / Route Handlersは、ゼロサム的な外部連携や認証処理に向いています（例：OAuth、Webhook、外部DB連携）

Server Actionsは、UX最適化や内部的なインセンティブ設計に強く、フォーム送信 → DB更新 → UI再描画の流れを最小コードで実現できます
この3つの構造は、Next.jsの進化とともに「UIとロジックの距離をどう設計するか」という問いに対する答えでもあります。


React19で新登場したHooks19で新登場したReact19で新登場したHooksを分かりやすく解説します【Next.js AppRouterを利用】
 https://www.youtube.com/watch?v=_whls1Kc74c&t=1480s
