WordPress引っ越し All in One WP Migrationを使わない方法 20250629

ローカル環境の WordPress サイトを、本番公開用の Xサーバーに手動で移す作業（手動デプロイ）

🟥重要🟥
作業前に必ずバックアップを取る（ファイル・DB両方）


All-in-One WP Migration プラグインが利用規約の変更などで本番環境で使いにくくなってきた。(ビジネス利用は有料)
このプラグインを使わずに、手動でWordPressのサイトをローカル環境から本番サーバー（Xserver）へ移行する方法を解説。

 All-in-One WP Migrationとは？（Migration：移行）
WordPressサイトのバックアップ・移行・復元を簡単にできるプラグインです。

📝 WordPressサイトの構成要素
WordPressサイトは主に以下の2つの要素で構成されています：

🔵ファイル群（PHPファイル・画像・CSS・JSなど）

🔵データベース（投稿内容・設定・URLなどの情報）

この2つをローカル → 本番サーバーに移動するのが引っ越し作業です。

🔁 引っ越し全体の流れ
１．ローカルのファイル群をサーバーにアップロード

２．ローカルのデータベースをエクスポート

３．本番サーバーにデータベースをインポート

４．URLの書き換え

５．接続情報の書き換え（wp-config.php）

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
形式：SQL / デフォルト設定のままで実行
 → .sqlファイルがダウンロードされる

✅ Step 3：データベースをインポート
● XserverのphpMyAdminでインポート
Xserverサーバーパネルにログイン
「MySQL設定」→「phpMyAdmin」へアクセス
対象のデータベースを選択
「インポート」タブを選択
エクスポートした .sql ファイルを選択して実行
成功すると緑色の成功メッセージが表示される

✅ Step 4：接続情報の修正（wp-config.php）
● 修正ポイント
wp-config.php の中の以下の4つの情報をXserver用に書き換える必要があります。
(20行目位にある)
php
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
この方法は逆方向（本番→ローカル）にも使える

🔗 まとめ
作業工程	                    内容
1. ファイル移動	    LocalのpublicフォルダをFileZillaでXserverへコピー
2. DBエクスポート	phpMyAdminで.sqlファイルを出力
3. DBインポート	    XserverのphpMyAdminでインポート
4. 接続情報修正	    wp-config.php をXserver用に編集
5. URL置換	       Search Replace DBでURLを一括置換

🔍 通常の「ホームページ制作後のデプロイ」と何が違うのか？
ホームページ制作後にファイルをアップロードする「普通のデプロイ」と、このWordPressの「引っ越し」の違いについて

以下に違いを整理します：
項目	                通常のHTML/CSSサイトのデプロイ	        WordPressサイトの引っ越し
✅ 扱うもの	        ファイルだけ（HTML, CSS, JS, 画像）	     ファイル + データベース
✅ 手順の複雑さ	    比較的シンプル	                         複雑（DBのエクスポート・インポートが必要）
✅ URLの扱い	        URLはコード内で手動指定	                 DB内にURLが埋まっているため書き換え必要
✅ CMSかどうか	    静的サイト、CMSではない	                 CMS（WordPress）なので動的
✅ 必要な知識	    FTP/SFTPの使い方	                    FTP + データベース + WordPress内部構造の知識
✅ 設定ファイル	    .env などに環境変数を分けてる	          wp-config.php でDB接続情報を設定
✅ サーバーとの連携	ファイルをアップすればOK	              DB接続・ドメインURLの書き換えが必要


🟥重要🟥
🔧 WordPressサイト引っ越し時の作業概要
ローカルの WordPress ファイルを取得
Xサーバーに FTP でファイルをアップ
ローカルのデータベースをエクスポート（SQLファイル）
Xサーバーの phpMyAdmin でインポート
wp-config.php の DB接続情報を書き換え
DB内部のURLを書き換え（ローカル → 本番URL）
専用のツール（Search Replace DBなど）で一括置換

✨ なぜ All-in-One WP Migration を使わないのか？
最近のバージョンで「テスト環境→本番環境」への移行制限が加わった
無料版ではデータ容量制限あり（512MB）
プラグインに依存せず、WordPressの構造理解が深まるため手動引っ越しを推奨

【WordPress引っ越し】All in One WP Migrationを使わない方法①(手動引っ越し)
https://www.youtube.com/watch?v=LPpv7jctGUQ