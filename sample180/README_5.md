React Next.js shadcn/ui ライブラリ 20251018

公式サイト
https://ui.shadcn.com/

ReactやNext.js向けのモダンなUIコンポーネントライブラリです。

🌿 特徴と設計思想
Tailwind CSSベース スタイリングはTailwindのユーティリティクラスで行うため、デザインの一貫性と柔軟なカスタマイズが可能です。

Radix UIとの統合 アクセシブルで機能的な「ヘッドレスコンポーネント」をRadix UIから活用しています。
つまり、見た目は自由に設計でき、機能だけを提供する構造です。

コピペで使える柔軟さ 必要なコンポーネントだけをプロジェクトに「コピーして使う」形式で、npmパッケージとして一括導入するのではなく、自分のコードベースに組み込むスタイルです。

CLIで簡単導入 例：npx shadcn@latest init でセットアップし、npx shadcn@latest add button などで必要なコンポーネントを追加できます。

🧩 含まれる主なコンポーネント
Button（ボタン）

Input（入力欄）

Dialog（モーダル）

Tabs（タブ）

Table（テーブル）など

🌱 他のUIライブラリとの違い
特徴	            shadcn/ui	              Material UI / Chakra UIなど
スタイリング	    Tailwind CSSベース	      独自のスタイルシステム
導入方法	       コードコピー（柔軟）	       npmパッケージで一括導入
カスタマイズ性	    高い（自分で編集可能）	   テーマで調整
アクセシビリティ	Radix UIベースで高い	   ライブラリによる


✅ shadcn/ui の初期化後に components フォルダが自動生成されなかった原因
「事前に手動で作成していたこと」が原因の可能性が高いです。
shadcn/ui は既存の構成を尊重する設計になっているため、以下のような状況ではフォルダを自動生成しないことがあります：

🧭 状況の整理
components フォルダがすでに存在していた（空でも、中身があっても）。
components.json が作成されたが、コンポーネントはまだ追加していない。
初期化時点では、shadcn/ui は「どこにコンポーネントを置くか」だけを記録し、実際のコンポーネントは add コマンドで追加する。

✅ 解決方法
① components.json を確認する
プロジェクトルートにある components.json を開いて、以下のような設定がされているか確認してください：

json
{
  "components": "components",
  "aliases": {
    "@/components": "./components"
  }
}

この "components" の値が、コンポーネントを追加するフォルダのパスです。ここが components になっていれば、add コマンドで自動的にその中にファイルが作成されます。

② 最初のコンポーネントを追加する
以下のようにコマンドを実行してみてください：

bash
npx shadcn@latest add button
この時点で components フォルダが存在しない場合は、自動的に作成され、button.tsx などのファイルが追加されます。

③ フォルダが作成されない場合の対処
もしそれでも components フォルダが作成されない場合は：
components.json の "components" パスが正しいか再確認
components フォルダを手動で削除してから再度 add コマンドを試す
npx shadcn@latest init を再実行してみる（上書きされることは基本的にありません）

components.json のポイント解説
キー	                    意味	                        内容
style	            コンポーネントのデザインスタイル	    "new-york" はモダンで洗練されたスタイル
rsc	                React Server Components を使うか	  true なので RSC 対応
tsx	                TypeScript を使うか	                  true なので .tsx 形式で生成
tailwind.css	    Tailwind のCSSファイルのパス	       "app/globals.css" に変数などが追加される
baseColor	        テーマカラー	                       "neutral" を選択済み（落ち着いた印象）
iconLibrary	        アイコンライブラリ	                   "lucide"（軽量で美しいSVGアイコン）
aliases	            インポートエイリアス	               @/components など、パスの簡略化

⚠️ components フォルダが作成されない理由
この設定ファイルでは "components": "@/components" というエイリアスが定義されていますが、
実際のフォルダ作成は add コマンドを実行したときに初めて行われます。

つまり、初期化 (init) の段階ではまだコンポーネントが追加されていないため、フォルダは作られません。

✅ 対処法：最初のコンポーネントを追加する
以下のコマンドを実行してみてください：

bash
npx shadcn@latest add button
これにより：
components フォルダが自動生成される
components/ui/button.tsx が追加される
必要な依存パッケージもインストールされる
その後は、add コマンドで他のコンポーネント（input, card, dialog など）を追加していけます。