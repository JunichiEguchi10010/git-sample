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

/直下にutilsフォルダを作成 > 直下にsupabese.tsファイルを作成

/直下に.env.localファイルを作成 > supabese格納


公式サイト
https://tailwindcss.com/
