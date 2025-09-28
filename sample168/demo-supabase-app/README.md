Supabase Supabase-js tailwindcss TodoList 20250918　20250927

【Supabase入門】Todoアプリを作りながらSupabaseをNext.jsとTypescriptで学んでみよう
https://www.youtube.com/watch?v=CZlZgRo0bZ4

✅ React + Supabase TodoApp 技術懸念事項の事前チェックリスト

📌 React 基礎
 
 JSXの書き方
・HTMLに似ているが class ではなく className を使う
・変数は {} で埋め込む

 コンポーネントの基本
・function ComponentName() { return (...) } の形
・親 → 子へ props を渡す流れ

 stateの使い方
・const [value, setValue] = useState(初期値)
・stateを直接書き換えず、必ずsetValue()を使う

 propsの考え方
・子に渡すとき: <Child data={value} />
・子で受け取るとき: function Child({ data }) { ... }
・「親が持つstateを子に共有する」イメージ

📌 React Hooks

 useState
・値を保持して再レンダリングする仕組み

 useEffect
・「いつ実行するか？」を第二引数で制御する
    ・[] → 初回だけ
    ・[state] → そのstateが変わったとき

 非同期処理との組み合わせ
・useEffect 内では async を直接書けない
・内部で async 関数を定義して呼ぶのが基本

📌 データの流れ

親 → 子へのデータ渡し
・propsを使って渡す

子 → 親へのデータ更新
・親から「更新用関数（例: setTodos）」を渡す
・子はそれを呼ぶだけでOK

 stateの単一管理の原則
・同じデータを複数の場所で持たない
・一番上の親で管理して必要な子に渡す

📌 Supabase 基礎
 プロジェクトの作成とAPIキー取得
 テーブル作成
・例: todos テーブル（id, title, created_at）

 RLS（Row Level Security）の設定確認
・認証なしで使う場合は無効にするか、ポリシーを設定する

 基本操作関数
・getAllTodos() → 全件取得
・addTodo(title) → 新規追加

📌 エラーハンドリング

 try/catch の基本
・Supabase との通信は失敗する可能性がある

例:
try {
  await addTodo(title);
} catch (error) {
  console.error(error);
}

✅ 確認ポイント
・JSX とコンポーネントの書き方
・useStateでフォーム入力を管理
・useEffectで初回処理を実行
・propsで親子コンポーネントをつなぐ
・SupabaseでCRUDを試す

🟦 設計から実装までの流れ（TodoApp を例に）
1. アプリのゴールを決める
・「やりたいこと」を明確にする
👉 今回は「Todo を追加・一覧表示するアプリ」

ゴールを書き出す
・Todoを追加できる
・Todoの一覧を表示できる
・データはSupabaseに保存する

2. 画面の構造をざっくり設計する
例えば：
[タイトル] Supabase Todo App
[入力欄]   [追加ボタン]
------------------------
・Todo 1
・Todo 2
・Todo 3

👉 この時点では「どう見せたいか」だけ意識します（機能は後回し）。

3. 必要なコンポーネントを分ける
・TodoApp … 全体を管理する親
・TodoList … Todo一覧を表示する子
・TodoItem（必要なら）… 1つのTodoを表示する最小単位
👉 React では「UIの部品ごとに分割する」のが基本です。

4. state（アプリの状態）を洗い出す
・Todo一覧 → todos（配列）
・入力欄の値 → title（文字列）
👉 状態はできるだけ親に置く → 子に渡すと管理が楽になります。

5. データの流れを決める
・初回表示時 → Supabase から Todo を取得 → todos にセット
・フォーム送信時 → Supabase に Todo を追加 → 再度取得して todos 更新
👉 ここで「どこで Supabase を呼ぶか」が決まります。

6. 関数の役割を考える
・getAllTodos() → Supabaseから全Todo取得
・addTodo() → SupabaseにTodoを追加
・handlesubmit() → フォーム送信時の処理
・useEffect() → 初回レンダリング時にTodo一覧を読み込む
👉 役割を小分けにすると、コードを書くときに迷いません。

7. まずはUIだけ作る
Supabaseの処理は後回し。とりあえず：

<h3>Supabase Todo App</h3>
<form>
  <input type="text" />
  <button>Add</button>
</form>
<ul>
  <li>仮のTodo</li>
</ul>

👉 UIの「形」を先に作って安心感を得る。

8. stateを組み込む
・useState で title / todos を管理
・onChange で入力と title を同期
・map を使って todos をリスト表示

9. Supabase連携を追加する
・getAllTodos を呼んで state に反映
・addTodo を呼んで Supabase に保存
👉 最後にデータベース接続を追加すると、バグが少なくなります。

✅ 作業を進めるときの意識ポイント
・「UI → state → データ連携」の順番で作る
・いきなり全部作らないで、小さいゴールごとに動かす
・まずUI表示
・次にstateで動かす
・最後にSupabaseとつなげる
迷ったら「この処理の役割は何か？」と紙に書く

📝 まとめ
何もない状態から始めるときは、
・ゴールを決める
・UIをざっくり描く
・コンポーネントを分ける
・stateを決める
・データの流れを整理
・UIだけ先に作る
・stateを組み込む
・最後にSupabase接続

🟥 躓きやすいポイント
1. state の設計（どこに置くか？）
・「todosを子コンポーネントで持たせるのか、親で管理するのか？」で迷う
・React の原則は 「状態はできるだけ親に置いて、子に渡す」
・でも最初は「とりあえず子に書いたら動いたけど、更新できない…」となりやすい
👉 解決のヒント:
「このデータを誰が使う？」「誰が変更できると便利？」と考えると正しい場所が見える。

2. props の受け渡し
<TodoList todos={todos} setTodos={setTodos} />
↑ この「親から子へ渡す仕組み」が最初は分かりにくい
特に todos={todos} のように 同じ名前が2つ並ぶのが混乱ポイント

👉 解決のヒント:
左（props名）は「子に渡すラベル」、右（変数名）は「親のstate」。
同じ名前にしているだけで、実は「ラベル → 値を渡している」だけ。

3. useEffect の使い方
・useEffect(() => { ... }, []); の「第二引数の配列」の意味を誤解しがち
・書き方を間違えると「無限ループでSupabaseにアクセスし続ける」という事故が起きやすい

👉 解決のヒント:
「いつ実行するか？」を口に出して説明できるようにする（例：空配列なら初回だけ）。

4. 非同期処理（async/await）の扱い
・await getAllTodos() のような処理で「エラーが出て画面が真っ白」になることがよくある
特に useEffect 内で非同期処理を直接書こうとして怒られる

👉 解決のヒント:
useEffect の中で非同期処理は「内部に async 関数を定義して呼び出す」書き方が基本。

5. Supabaseとの接続テスト
・UIは完成しているのに「データが出ない」状態でハマる
・原因は APIキーやテーブル名の間違い、RLS（Row Level Security）の設定など

👉 解決のヒント:
UI側の問題か Supabase 側の問題かを切り分ける。
まずは Supabase の SQL エディタで手動で動作確認してからコードに移す。

✅ まとめ
TodoApp の流れで一番つまずきやすいのはstateの設計（親に置くか子に置くか）
props の受け渡し（同じ名前の意味）
useEffect と async/await の正しい書き方
この3つが特に壁になりやすいです。



demo-supabase-app/
├── 📄 FILE_STRUCTURE.md           # 詳細なファイル構成説明
├── 📄 SETUP.md                   # セットアップガイド
├── 📁 app/                       # Next.js App Router
│   ├── favicon.ico
│   ├── globals.css               # Tailwind v4設定
│   ├── layout.tsx                # ルートレイアウト
│   └── page.tsx                  # ホームページ
├── �� components/                # Reactコンポーネント
│   ├── TodoApp.tsx               # メインアプリ
│   └── TodoList.tsx              # Todoリスト
├── 📁 utils/                     # ユーティリティ
│   ├── interface.ts              # 型定義）
│   ├── supabase.ts               # Supabase設定
│   └── supabasefunctions.ts      # CRUD操作
├── 📁 public/                    # 静的ファイル
├── 📄 package.json               # 依存関係
├── 📄 next.config.ts             # Next.js設定
├── 📄 tailwind.config.js         # Tailwind設定
└── 📄 README.md                  # プロジェクト説明

Supabase 公式ドキュメント
https://supabase.com/docs
https://supabase.com/docs/reference/javascript/insert

supabase-js- Supabase用の同型JavaScriptクライアント。
https://www.npmjs.com/package/@supabase/supabase-js
npm install @supabase/supabase-js

初期設定

Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- @tailwindcss/postcss
- tailwindcss
- eslint
- eslint-config-next
- @eslint/eslintrc


Supabaseで新しいプロジェクトを作成
https://supabase.com

カレントディレクトリ npm run dev
(http://localhost:3000) 

 npx tailwindcss init -p
 → Tailwind CSSのバージョン4系以降で発生する仕様変更に起因するエラーが発生

 コマンドが使えないので以下のコードを入力
npm install -D tailwindcss-cli
npx tailwindcss-cli init -p

→ CLIの初期化は正常に完了した。

Tailwind CSS v4系の構成ファイル2つ：
・tailwind.config.js
・postcss.config.js。→ 古いversionの時の物で不要の可能性が高い
が無事に生成されました

警告（deprecated inflight や glob）はnpmの依存パッケージに関するもので、Tailwindの動作には直接影響しません。
現時点では無視して問題ありませんが、将来的にCI/CD環境や教育テンプレートに組み込むなら、依存関係の整理も含めてメンテナンス方針を明示しておくと安心です。

🟥 
1. Tailwind v4 の推奨構成
v4 からは PostCSS プラグインとして動かすのが公式の推奨。
@import "tailwindcss"; を CSS に書くだけで、postcss.config.js 経由でコンパイルされます。
tailwindcss-cli は v2/v3 の時代の方法で、v4 では基本不要です。

@tailwindcss/cliとは？
@tailwindcss/cli は、Tailwind CSS v4以降で推奨される公式のコマンドラインツール（CLI）パッケージです。従来の npx tailwindcss コマンドが使えなくなったため、Tailwindのビルド処理を行うための新しいエントリポイントとして登場しました。

🧠 何が変わったのか？
Tailwind CSS v4では、CLIが本体から分離され、@tailwindcss/cli という別パッケージとして提供されるようになりました。これにより、Tailwind本体は純粋なCSSフレームワークとして、CLIはビルドツールとして役割を明確に分担しています。

⚙️ 主な機能と使い方
機能	説明
-i	入力CSSファイル（例：input.css）を指定
-o	出力CSSファイル（例：output.css）を指定
--watch	ファイル変更を監視して自動ビルド
--minify	出力CSSを圧縮
例：
bash
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch
このコマンドは、input.css に書かれた @tailwind base; などの指示を元に、HTMLファイル内で使われているクラスだけを抽出し、最小限のCSSを output.css に生成します。

Supabaseでテーブルを作成
Supabase-jsライブラリをインストールする

/直下にutilsフォルダを作成 > 直下にsupabese.tsファイルを作成Supabase管理画面 >左中　> APIドキュメント 
初期化
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hvpavoepmpcycbaxfdch.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

✅ NEXT_PUBLICと！接頭辞を付ける

supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl!, supabaseKey!)

.env.local
NEXT_PUBLIC_SUPABASE_URL=https://hvpavoepmpcycbaxfdch.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

🔍 !（非nullアサーション演算子）の意味
TypeScriptでは、環境変数のように「値があるかどうかわからないもの」を使うときに、型エラーが出ることがあります。たとえば：
ts
const key: string = process.env.MY_KEY // ← これはエラーになる可能性あり
そこで ! を使うことで：
ts
const key: string = process.env.MY_KEY!
と書くと、「この値は絶対に null や undefined ではない」と TypeScript に伝えることができます。


/直下に.env.localファイルを作成 > supabeseのURLやAPIキーを格納
Supabase管理画面 >左下 project settings > データーAPI > プロジェクトURL ＝ SUPABESE_URL

Supabase管理画面 >左下 project settings > APIキー > レガシー API キー =
SUPABASE_ANON_KEY（正式には anon public key）

ANON_KEY（正式には anon public key）とは、Supabase における クライアント側のアクセス用APIキーです。名前の通り「匿名（anonymous）」ユーザー向けのキーで、ログイン前のユーザーや一般公開データへのアクセスに使われます。

v2.57.4: 最新版だが Next.js 15 + Turbopack で問題があり404が多発
npm install @supabase/supabase-js@^2.39.0にダウングレードする。→ tailwindcss node.js typescriptとのversionの整合性を確認すること。

公式サイト
https://tailwindcss.com/

