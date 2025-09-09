環境変数 .env とは？ 20250909

environment = 「環境」という意味

✅ 環境変数とは？
プログラムの動作を環境（ローカル開発 / 本番サーバーなど）によって切り替えるための設定値。

例：
ローカルではテスト用の設定を使う
本番では本番用の API を使う
ソースコードに直接書かず、外部ファイルやサーバー設定から読み込む。

✅ そもそも なぜ環境変数（.env）を使うのか？

🌱 環境変数（.env）の必要性とメリット

1. セキュリティのため（コードに秘密情報を残さない）
🟥 APIキーやDBパスワードを ソースコードに直書きすると危険。
GitHubにうっかり上げたら漏洩…。最悪、不正利用される。
.env に書いて .gitignore に入れておけば、コードと一緒に公開されない。

📌 例：
// NG（危険）
const API_KEY = "abcd1234"; 

// OK（.envから読み込む）
const API_KEY = process.env.API_KEY;

2. 環境ごとに設定を切り替えられる
開発用と本番用で使うサービスが違う場合が多い。
例：ローカルでは localhost:3000、本番は https://example.com。

📌 例：
# .env.development
API_URL=http://localhost:3000

# .env.production
API_URL=https://api.example.com

🟥 コードは同じでも、環境によって自動的に切り替わる。

3. コードを汚さない・再利用性が高い
「設定」と「ロジック」を分離できる。
コードは「何をするか」だけに集中 → 設定は外部ファイルで管理。
他の人がプロジェクトを触るときも、.env さえあればすぐ動かせる。

4. チーム開発で便利
各自のPCで違う環境でも、.env.local を使えば自分用設定ができる。
本番用はサーバーに .env.production を置く → セキュリティ確保。
全員が同じコードベースを使える。

5. デプロイサービスと相性が良い
Vercel, Netlify, Heroku, AWS などは 管理画面で環境変数を設定できる。
コードに書かなくても、サービス側が .env 相当を提供してくれる。

🚀 まとめ
セキュリティ → 秘密情報を守る
柔軟性 → 開発・本番で設定を切り替え可能
保守性 → 設定とロジックを分離できる
チーム開発に強い → 個人ごと・環境ごとに .env を使い分けられる
デプロイサービス対応 → クラウド環境でも管理しやすい
WordPress制作 → データベース接続情報 や APIキー を .env で管理する。

✅ Next.js での環境変数の定義方法
1. ローカルでの設定
プロジェクト直下に .env.local ファイルを作成。

TEST=123

🟨 環境変数は 大文字で書くのが一般的な慣習 です。
ただし「ルール（必須）」ではなく「約束事（コンベンション）」です。

参照するとき：

console.log(process.env.TEST) // サーバー側で123と表示 ＝ターミナルやCLIで表示
この出力は、ブラウザではなく、Node.js を実行しているターミナル上で確認できます。

2. 事前に用意されている変数

･process.env.NODE_ENV
値:development（開発）
値:production（本番）
値:test（テスト）

これで環境ごとに処理を分岐できる。

if (process.env.NODE_ENV === "development") {
  console.log("開発環境です")
}

✅ クライアント側で使いたい場合
通常の環境変数はサーバー側専用。クライアントでは undefined になる。
クライアントでも参照したい場合は NEXT_PUBLIC_ を付ける必要がある。

NEXT_PUBLIC_API_URL=https://example.com/api
console.log(process.env.NEXT_PUBLIC_API_URL)

⚠️ 注意：NEXT_PUBLIC_ をつけた変数はブラウザから誰でも確認できるので 秘密情報は絶対入れないこと！
（APIキーやパスワードはNG）

✅ 値の型について
.env の値は 文字列として扱われる。
SKIP_ANIMATION=true
console.log(typeof process.env.SKIP_ANIMATION) // string
使うときは "true" / "false" の文字列比較で判定する。

✅ 本番環境での設定
例：Vercel の場合
プロジェクト → Settings → Environment Variables に登録する。
ローカルとは違う値を設定して切り替え可能。

✅ 実用例
開発中はアニメーションをスキップする
本番だけ Google Analytics を有効化する
API のエンドポイントをローカル用 / 本番用で切り替える

🎯 まとめ
環境変数は「環境ごとに設定を切り替える仕組み」。
.env.local でローカル設定、本番はデプロイ先で設定。
process.env.NODE_ENV で環境判定。
クライアント側では NEXT_PUBLIC_ をつけたものだけ使える。
セキュリティ情報は必ずサーバー側のみで扱う。


✅ .env と .env.local の違い

✅ Next.js（一般的な Node.js 環境）における環境変数ファイルの種類
1. .env
共通の環境変数を書くファイル。
開発でも本番でも使いたい「基本設定」を書く。

例：
API_VERSION=v1

2. .env.local
ローカル開発専用の環境変数を書くファイル。
Git には コミットしないのが基本（機密情報を書くため）。

例：
API_KEY=local-secret-123

3. その他のバリエーション
Next.js では環境ごとにファイルを分けられる：
.env.development → 開発環境専用
.env.production → 本番環境専用
.env.test → テスト環境専用
.env.local → どの環境でも優先される（個人用の上書き設定）

✅ 優先順位（Next.js公式）
次の順番で 下にあるほど優先される（同じキーがあれば上書きされる）
.env
.env.development / .env.production / .env.test
.env.local
👉 つまり .env.local が一番強い。

✅ 実務での使い分けイメージ
.env
→ プロジェクト全体の共通設定（誰でも共有してOK → ローカル開発環境で複数人が使っても問題ない内容の .env ファイルという意味です。）
API_VERSION=v1


.env.local
→ 自分のPCだけの秘密設定（APIキーや個人の調整値）
API_KEY=xxxxxxxxxxxxx


.env.production
→ 本番サーバーでだけ使う設定
API_URL=https://api.example.com

🎯 まとめ
.env → 共通（共有OK）
.env.local → 個人用（秘密にしたい情報、Gitに入れない）
.env.development / .env.production → 環境ごとに使い分け

優先順位は .env.local が最強

例えば：
.env → 共通の WordPress API のバージョンや URL
.env.local → ローカルの DB パスワードやテスト用の APIキー
.env.production → 本番サーバーの APIエンドポイント


✅  process.env.NODE_ENV の使い方

🌱 process.env.NODE_ENV とは？
Node.js やフロントエンド（Next.js, React など）でよく出てくる 環境変数
NODE_ENV は アプリの実行モード を表します。
process.env は Node.js が提供するオブジェクトで、OSレベルの環境変数を読み込めます。

⚙️ よく使われる値
"development" → 開発モード（デバッグ・ホットリロードなど有効）
"production" → 本番モード（最適化・デバッグ無効）
"test" → テスト実行時（JestやMochaなど）
👉 これ以外の文字列も入れられますが、基本はこの3種類で運用されます。

📌 使い方の例

1. 条件分岐に使う
if (process.env.NODE_ENV === "production") {
  console.log("本番モードで動作しています");
} else {
  console.log("開発モードで動作しています");
}

2. ライブラリの挙動切り替え（例: React）
if (process.env.NODE_ENV !== "production") {
  console.log("開発中なのでデバッグログを出力します");
}

3. ビルド設定（例: Next.js）
Next.js では内部的に NODE_ENV を自動で設定してくれます。
next dev → development
next build && next start → production
jest 実行時 → test

⚠️ 注意点
process.env.NODE_ENV は文字列。=== で比較する。
.env ファイルに定義してもよいけど、多くのフレームワークは 自動的に設定してくれる。
（Next.js, Create React App, Vite などはビルド時に勝手にセット）

✅ まとめ
process.env.NODE_ENV = 実行環境（開発 / 本番 / テスト）を示す環境変数
コード内で条件分岐や最適化に使うのが定番
Next.js などでは自動で設定されるから、自分で書くことは少ない


✅ NEXT_PUBLIC_ プレフィックス
環境変数がクライアントサイド（＝ブラウザ）からアクセス可能になるかどうかを決定する重要な仕組みです。
以下に、構造的に整理して解説します。

🧠 Next.jsの環境変数の基本構造
プレフィックス	     アクセス可能な場所	        用途例	                セキュリティ
HOGE（なし）	     サーバーサイドのみ	        DBパスワード、APIキー	🔒 非公開
NEXT_PUBLIC_HOGE	サーバー＆クライアント両方	サイト名、公開APIのURL	🌐 公開OK

🔍 どう使うのか？
① .env.local に記述する
env
# サーバー専用（クライアントからは見えない）
SECRET_API_KEY=abcdef123456

# クライアントでも使える
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_NAME=My Cool Site

② コード内で参照する
tsx
// クライアントサイド（Reactコンポーネントなど）
console.log(process.env.NEXT_PUBLIC_API_URL); // → https://api.example.com

// サーバーサイド（getServerSidePropsやAPI Routesなど）
console.log(process.env.SECRET_API_KEY); // → abcdef123456

🚨 なぜ分ける必要があるのか？
Next.jsはビルド時に環境変数を静的に埋め込むため、NEXT_PUBLIC_ が付いている変数はブラウザに露出します。
つまり、誰でも開発者ツールで見られるということ。

そのため：
🔐 秘密情報（APIキー、DBパスワードなど）は絶対に NEXT_PUBLIC_ を付けない
🌐 公開しても問題ない情報だけ NEXT_PUBLIC_ を付ける


ファイル名	         共有の可否	        用途	                備考
.env.local	        ❌ 非共有	    個人の開発環境用	    APIキーや秘密情報を含むことが多い
.env.development	✅ 共有OK	    開発環境用の共通設定	公開しても問題ない変数のみ
.env.production	    ✅（条件付き）	本番環境用	            CI/CDで使うが、秘密情報は別管理が望ましい

🟥 注意点
.env.local は Gitに含めない（.gitignore に追加）
NEXT_PUBLIC_ が付いている変数は クライアントに露出するので、秘密情報は絶対に使わない
チームで共有する .env は、「何を公開してよいか」ルールを明確にしておくと安心です


✅ 「OSレベルの環境変数と .env ファイルの違い」
混同しやすいポイントです。

✅ OSレベルの環境変数
定義場所: OS（Windows, macOS, Linux）のシステム設定
スコープ: そのPC全体、または特定のユーザーアカウントで有効
使い方: ターミナルやアプリを起動した時、自動的に読み込まれる

例
Windows: setx PATH "C:\MyApp\bin"
macOS/Linux: export NODE_ENV=production

特徴
PC全体に影響する
.env ファイルがなくても動作する
CI/CD環境（GitHub Actions、Vercel など）ではよく使われる

✅ .env ファイル
定義場所: プロジェクト直下に置くファイル
スコープ: そのプロジェクト内だけで有効（Next.js, Node.js などが起動時に読み込む）
使い方: dotenv などのライブラリやフレームワークが読み込んで process.env.XXX に反映

例
DATABASE_URL=mysql://user:pass@localhost:3306/mydb
NEXT_PUBLIC_API_URL=https://api.example.com


特徴
チームごとに環境差分を簡単に管理できる
.gitignore で除外すれば安全に秘密情報を共有できる
「ローカル用」「本番用」でファイルを分けられる（.env.local など）

🔑 違いのまとめ
項目	    OSレベル環境変数	        .env ファイル
定義場所	OS設定	                   プロジェクト直下のファイル
影響範囲	PC全体 / ユーザー全体	    そのプロジェクトのみ
読み込み	OSが自動で反映	            dotenv や Next.js が読み込む
用途	    システム全体で共通する値	プロジェクトごとに異なる設定

💡 実務的な使い分け
OSレベル環境変数 → PC全体で共通のもの（PATH, JAVA_HOME など）
.envファイル → プロジェクトごとの設定（DB接続情報、APIキーなど）

Next.jsやNode.jsでサイトを作る → .env 管理が基本
CI/CDやサーバー（VercelやAWSなど）にデプロイ → OSレベル（サービス側の環境変数設定画面）


環境変数について解説！ローカルと本番環境で処理を分ける
https://www.youtube.com/watch?v=SE7ORjB6gZg