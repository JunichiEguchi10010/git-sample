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


✅ git checkout main の意味
git checkout main

これは簡単に言うと…
👉 「現在作業中の場所（カレントブランチ）を main ブランチへ切り替える」
つまり、
今 feature/header にいても
今 bugfix/login にいても
これを実行すると main ブランチに移動します。

🔍 より正確な説明（概念として）
Git が管理する「作業用のスナップショット」を ブランチ と呼び、
checkout はそのブランチを「切り替える」コマンドです。

checkout = 作業をする場所を切り替える
main = 切り替え先のブランチ名

📌 カレントの意味（Git における “今いる場所”）
Git では「今自分が作業しているブランチ」を カレントブランチ と呼びます。

例：

* main
  feature/header
  feature/contact

この * のついているところがカレント。
ここから別のブランチに移るのが checkout。

🔄 checkout のイメージ図
現在作業中（例：feature/header）
          ↓
 git checkout main
          ↓
main に移動（作業ブランチが main になる）

⚠️ 注意：checkout できないケース
もし未コミットの変更がある場合に、
checkout すると競合しそうな場合、Git が止めることがあります。

その場合は
git add + git commit する
または git stash で一時退避する
などの操作が必要。


✅ ① main と master の違い
● 結論：名前が違うだけで、中身は同じ「メインブランチ」

Git の初期のデフォルト名が

昔：master

今：main

に変わりました。

変更された理由（簡単に）

「master」という言葉の歴史的背景への配慮から、多くのプロジェクトが main へ移行。

どっちが正しい？

→ 新規は main が標準
→ 既存リポジトリは master のままのものも多い

✅ ② ローカル main を最新の origin/main に合わせる方法

GitHub の更新をローカルに取り込む＝同期するやり方。

▼ 通常の同期（推奨）
git checkout main
git pull origin main


これで
GitHub の変更を取り込み

ローカル main が最新になる

◇ 補足（pull = fetch + merge）

内部的には

git fetch origin
git merge origin/main


をまとめてやっているだけ。

▼ ローカルの変更を捨てて、とにかく GitHub に完全に合わせたい場合（強制）
git fetch origin
git reset --hard origin/main

※ これはローカルの未コミット変更がすべて消えるので注意。

✅ ③ main から作業ブランチを切る流れ

Git の基本ワークフロー。
WordPress テーマ制作でも、LP制作でもこのやり方が安全でスタンダード。

▼ ステップ1：main に移動して最新化する
git checkout main
git pull origin main

▼ ステップ2：作業ブランチを作る（例：feature/header）
git checkout -b feature/header

▼ ステップ3：作業する（コードを書く）

変更したら…

git add .
git commit -m "Add header layout"
git push origin feature/header

▼ ステップ4：GitHub 上で PR（プルリクエスト）を作る

GitHub CLI なら

gh pr create

▼ ステップ5：レビュー後、merge（マージ）する
gh pr merge

🎯 まとめ：最小限覚えるべきセット
🔹 main と master

→ カタカナだけ違う。今は main が標準。

🔹 main を最新にする
git checkout main
git pull origin main

🔹 main から作業ブランチを切る
git checkout -b feature/◯◯


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


✅ Git（git コマンド）と GitHub CLI（gh コマンド）の間で “重複するコマンドはほぼありません”

理由はとてもシンプルです。

📌 Git（git）はローカルのバージョン管理ツール

ローカルの変更管理

ブランチ操作

commit / merge

push / pull など

👉 あなたのPC内のリポジトリを操作するためのコマンド

📌 GitHub CLI（gh）は GitHub を操作するツール

Pull Request（PR）の作成・一覧

Issue の作成・管理

GitHub Actions の確認

GitHub リポジトリの作成

PR のレビュー用チェックアウト

👉 GitHub サーバー側の機能を操作するためのコマンド

🔍 つまり役割が違うので、基本的にコマンドは重複しません
目的	                Git（git）	GitHub CLI（gh）
ローカルの変更管理	        ○	        ×
GitHub の PR 作成	       ×	       ○
push/pull	               ○	       ×
Issue 作成	               ×	       ○
ブランチ切り替え	        ○	        △（PR を checkout するときは gh が介入）

❗唯一「似ている動きをする」場面はある
▶ PR をレビュー用に取ってくる時
gh pr checkout 123


これは内部的には Git の以下の動きを自動化しています：

git fetch origin pull/123/head:pr-123
git checkout pr-123


つまり、

Git の複雑な fetch と checkout

を gh が自動でやっている

というだけで、実際の役割は違います。

📝 具体例で比較
▼ リポジトリを clone したい場合

git clone

gh repo clone

両方できるが、目的が違う：

git clone → どんな Git リポジトリでもOK

gh repo clone → GitHub のリポジトリに特化

使い勝手のために似たコマンドが用意されているだけ。

🎯 まとめ

Git = ローカルのバージョン管理ツール

GitHub CLI = GitHub（リモート側）の操作ツール

目的が違うので 基本は重複しない

PR checkout など一部で「似た動きの自動化」があるだけ


✅ 以下のブログ参照関数作成で効率化が可能

GitHub CLIのすヽめ&オレオレ関数で効率化していく
https://zenn.dev/toraco/articles/d6b760fd11bf3a?redirected=1


30分で始めるGitHub CLI 【まだブラウザからプルリク投げてるの？】
https://www.youtube.com/watch?v=p3_vclZcgiA