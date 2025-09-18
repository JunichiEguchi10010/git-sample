Supabase Supabase-js tailwindcss TodoList 20250918

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
・postcss.config.js

が無事に生成されました。
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

公式サイト
https://tailwindcss.com/