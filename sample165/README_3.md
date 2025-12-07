GitHub CLI について 20251206

GitHub CLI公式サイト
https://cli.github.com/

マニュアル
https://cli.github.com/manual/

GitHub をブラウザではなく、ターミナル（コマンドライン）から操作できる公式ツールです。

🔍 GitHub CLI でできること
通常、GitHub ではブラウザを開いて行う操作（リポジトリ作成、PR 作成など）を、
すべて コマンドだけで 実行できるようになります。

代表的にできること
リポジトリの作成：gh repo create

リポジトリのクローン：gh repo clone

Issue の作成：gh issue create

Pull Request の作成：gh pr create

PR のレビュー・マージ：gh pr review / gh pr merge

GitHub Actions の確認：gh run list など

🔧 GitHub CLI のメリット
1. ブラウザ不要で作業が高速になる
ターミナルに慣れている人はマウス操作より速い。
2. 対話型で手順を覚える必要がない

例えば gh pr create を打つと
ターミナルが「タイトルは？」「本文は？」など聞いてくれる。

3. スクリプトで自動化できる
リポジトリ作成 → push → PR 作成まで
ワンコマンドで自動化できる。

4. Git と GitHub の橋渡しがスムーズ
Git（ローカル操作）と GitHub（リモート操作）が一体化して使えるようになる。

🧩 Git と GitHub の違い（理解の補助）
Git：ソースコードをローカルでバージョン管理するツール
GitHub：Git のリポジトリをクラウド上で共有する Web サービス
GitHub CLI：その GitHub を CLI で操作するためのツール

✔ つまり一言でいうと…
GitHub CLI = GitHub のブラウザ操作を全部コマンドだけでできるようにする便利ツール
使うと開発効率がかなり上がります。

✅ gh auth login コマンド
gh auth login は GitHub CLI (gh) の認証コマンドです。
このコマンドを実行すると、ターミナル上で GitHub アカウントにログインし、リポジトリ操作や Issue 管理などを CLI 経由で行えるようになります。

CLIで実行するとone-time code:●●●●ｰ●●●●が表示されるのでenterを押して、githubが起動するのでワンタイムワスワードを張り付けて承認する。→アカウントとCLIを接続する作業

📝 コマンドの意味
gh → GitHub CLI の実行プログラム

auth → 認証関連のサブコマンド

login → ログイン処理を開始するアクション

つまり「GitHub CLI を使って GitHub アカウントにログインする」という意味になります。

🔑 実行すると何が起きるか
GitHub.com か GitHub Enterprise Server かを選択

HTTPS か SSH どちらで接続するかを選択
→基本HTTPS

認証方法を選択（ブラウザ経由、Personal Access Token、SSHキーなど）

成功すると CLI 内に認証情報が保存され、以降の操作で毎回ログイン不要になります

✅ 確認・関連コマンド
現在のログイン状態を確認

bash
gh auth status
ログアウト

bash
gh auth logout

✅ origin = あなたのローカルPCとつながっている GitHub 上のリポジトリ（リモートリポジトリ）の“名前”


✅ 動画の中で解説されているコマンド

Git と GH（GitHub CLI）の各行解説
✅git remote -v（補正）:

意図: 現在のリポジトリに設定されているリモート一覧（URL含む）を確認したい。

挙動: origin などのリモート名ごとに fetch/push の URL が表示されます。
リモート設定の確認や誤設定の発見に役立ちます。

git checkout -b develop（補正）:

意図: 新規ブランチ develop を作成して、そのブランチに切り替えたい。

正しい書式: git checkout -b develop（先頭に git を付ける）

挙動: ローカルに develop ブランチが作成され、現在の作業ブランチが develop になります。以後のコミットは develop に積み上がります。

gh repo view --web:

意図: 現在のリポジトリの GitHub ページをブラウザで開きたい。

正しい書式: gh repo view --web

挙動: 既定ブラウザが起動し、対象リポジトリのトップページ（または詳細情報）を表示します。CLI から GUI に素早く切り替える時に便利です。

gh issue create --title "タイトル" --body "本文"（補正）:

意図: 新しい Issue を作成したい。

正しい書式: gh issue create --title "タイトル" --body "本文"（オプションの前にスペースを入れる）

挙動: 指定したタイトルと本文で Issue が作成されます。未指定項目は対話プロンプトで補えます。--web を付けるとブラウザで作成画面へ。

gh pr create:

意図: 現在のブランチから Pull Request（PR）を作成したい。

正しい書式: gh pr create（必要に応じて --title や --body、--draft、--base を追加）

挙動: ベースブランチとの差分から PR を作成します。対話形式でタイトルや説明、ベースブランチを確認・指定できます。--web でブラウザへ。

gh diff（要確認）:

意図（推定）: 差分を確認したい（PR かローカル変更か）。

注意点: 公式コマンドは通常 gh pr diff [番号|URL|ブランチ]。gh diff は独自エイリアスや拡張がない限り認識されません。

補正例:

PR の差分表示なら gh pr diff 3（PR 番号 3 の差分）

ブラウザで見たいなら gh pr diff 3 --web

ローカル差分なら Git の git diff を使用

gh co 3（要確認）:

意図（推定）: PR 番号 3 をローカルにチェックアウトしたい。

注意点: 公式は gh pr checkout 3。gh co はユーザーが作成したエイリアスである可能性が高いです。

補正例: gh pr checkout 3 により、PR の変更内容をローカルブランチとして取得・切り替えできます。

ひとこと整理（安全な運用のための補足）
リモート確認: git remote -v で URL をまず確認。HTTPS/SSH のどちらか統一しておくとトラブルが減ります。

PR 操作: 差分は gh pr diff、チェックアウトは gh pr checkout と覚えると混乱しません。

エイリアス整備: よく使う短縮（例: co = pr checkout や diff = pr diff）は gh alias set で定義すると運用が速くなります。

もし gh diff や gh co が既に動作しているなら、あなたの環境にエイリアスや拡張が入っています。その場合は gh alias list の出力を共有していただければ、現在の環境に合わせて最適な使い方に整えます。



ブランチを取り込むとはどういう意味なのか？

✅ 以下のブログ参照関数作成で効率化が可能

GitHub CLIのすヽめ&オレオレ関数で効率化していく
https://zenn.dev/toraco/articles/d6b760fd11bf3a?redirected=1


30分で始めるGitHub CLI 【まだブラウザからプルリク投げてるの？】
https://www.youtube.com/watch?v=p3_vclZcgiA