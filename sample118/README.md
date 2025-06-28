WordPress引っ越し All in One WP Migrationを使わない方法 20250629


All-in-One WP Migration プラグインが利用規約の変更などで本番環境で使いにくくなってきた。

今回はこのプラグインを使わずに、手動でWordPressのサイトをローカル環境から本番サーバー（Xserver）へ移行する方法を解説。

📝 WordPressサイトの構成要素
WordPressサイトは主に以下の2つの要素で構成されています：

ファイル群（PHPファイル・画像・CSS・JSなど）

データベース（投稿内容・設定・URLなどの情報）

この2つをローカル → 本番サーバーに移動するのが引っ越し作業です。

🔁 引っ越し全体の流れ
ローカルのファイル群をサーバーにアップロード

ローカルのデータベースをエクスポート

本番サーバーにデータベースをインポート

URLの書き換え

接続情報の書き換え（wp-config.php）

✅ Step 1：ファイルをアップロード
● ローカル側
使用アプリ：Local（ローカル開発環境ツール）

サイトの「Site folder」→「app/public」を開く。

この中が WordPress のインストールディレクトリ。

● サーバー側（Xserver）
使用ソフト：FileZilla（FTPソフト）

あらかじめ接続しておき、サーバーの公開ディレクトリを開く。

● 実行内容
サーバー側にすでにあるファイルを削除（必要な接続情報だけ控える）

ローカルの WordPress ファイル一式をドラッグ＆ドロップでアップロード

✅ Step 2：データベースをエクスポート
● ローカル環境のphpMyAdminからエクスポート
Localの管理画面から「Database」タブを選択

「Open phpMyAdmin」をクリック

左メニューから対象のデータベースを選択

上メニューの「エクスポート」をクリック

形式：SQL / デフォルト設定のままで実行 → .sqlファイルがダウンロードされる

✅ Step 3：データベースをインポート
● XserverのphpMyAdminでインポート
Xserverサーバーパネルにログイン

「MySQL設定」→「phpMyAdmin」へアクセス

対象のデータベースを選択

「インポート」タブを選択

エクスポートした .sql ファイルを選択して実行

✅ 成功すると緑色の成功メッセージが表示される

✅ Step 4：接続情報の修正（wp-config.php）
● 修正ポイント
wp-config.php の中の以下の4つの情報をXserver用に書き換える必要があります。

php
コピーする
編集する
define('DB_NAME', 'xxxxx'); // データベース名
define('DB_USER', 'xxxxx'); // ユーザー名
define('DB_PASSWORD', 'xxxxx'); // パスワード
define('DB_HOST', 'xxxxx'); // ホスト名（例: mysql〇〇.xserver.jp）
これはXserver側に元々あった wp-config.php の情報から確認しておく。

✅ Step 5：URLの置換（Search Replace DB）
ローカル環境と本番サーバーではURLが異なるため、データベース内のURLを書き換える必要があります。

● ツールを使う：Search Replace DB
以下のサイトからダウンロード
👉 https://interconnectit.com/products/search-and-replace-for-wordpress-databases/

ダウンロード → 解凍

フォルダごとXserverのWordPressディレクトリ直下にアップロード

本番URLでアクセス：
例）https://example.com/Search-Replace-DB-folder-name/

置換設定：

Search for: ローカルURL（例：http://localhost:10095）

Replace with: 本番URL（例：https://example.com）

接続情報を入力（wp-config.phpと同じ）

テストラン（置換される項目数が表示される）

本番実行（「Do Search & Replace」）

🔚 完了確認
本番サーバーのURLにアクセスして、表示が崩れていないか確認

ダッシュボード（管理画面）にログインできるか確認

💡 補足ポイント
作業前に必ずバックアップを取る（ファイル・DB両方）

URLの書き換え漏れがあると、リンク切れや表示崩れが起きやすい

この方法は**逆方向（本番→ローカル）**にも使える

🔗 まとめ
作業工程	内容
1. ファイル移動	LocalのpublicフォルダをFileZillaでXserverへコピー
2. DBエクスポート	phpMyAdminで.sqlファイルを出力
3. DBインポート	XserverのphpMyAdminでインポート
4. 接続情報修正	wp-config.php をXserver用に編集
5. URL置換	Search Replace DBでURLを一括置換













【WordPress引っ越し】All in One WP Migrationを使わない方法①(手動引っ越し)
https://www.youtube.com/watch?v=LPpv7jctGUQ