WordPressをサブディレクトリに置いたまま、URLはルート（トップ）で表示する方法 20251216

通常のWordPress構成（よくある形）
普通はこんな構成です。

example.com/
 ├ wp-admin
 ├ wp-content
 ├ wp-includes
 ├ index.php
 └ wp-config.php

WordPressのファイルは ドメイン直下（ルートディレクトリ）
URLも https://example.com/ で表示

今回やりたい構成（動画のテーマ）

WordPressのファイルは サブディレクトリ に置くけど、

example.com/
 ├ index.php
 ├ .htaccess
 └ wordpress/
     ├ wp-admin
     ├ wp-content
     ├ wp-includes
     └ wp-config.php


URLはそのまま

https://example.com/

で表示したい、という構成です。


なぜこんなことをするのか？

動画内でも触れられていましたが、理由は例えば：

🔐 セキュリティ対策
→ WordPressの場所を分かりにくくする

🧹 ルートディレクトリをスッキリさせたい

🛠 後から別のシステムをルートに置きたい

実務でも意外とよく使う構成です。

全体の作業の流れ（ざっくり）

やることは大きく 5ステップ だけです。

手順① サブディレクトリを作る

例：/wordpress というフォルダを作成

example.com/wordpress/


ここに WordPress本体を置く 準備をします。

手順② WordPressのURL設定を変更する

WordPress管理画面
設定 → 一般 を開きます。

変更するのはこの2つ
① WordPressアドレス（URL）
https://example.com/wordpress


👉 実際にWordPressが置かれる場所

② サイトアドレス（URL）
https://example.com


👉 表示させたいURL（ルート）

💡
この時点で 404エラーが出ても正常
（動画でも「気にしなくていい」と言っています）

手順③ WordPressのファイルを移動する

ルートにある WordPress関連ファイルを 全部
/wordpress フォルダへ移動します。

wp-admin
wp-content
wp-includes
wp-config.php
など全部


👉 ドラッグ＆ドロップでOK

手順④ index.php と .htaccess をコピーする
コピーするファイル
/wordpress/index.php
/wordpress/.htaccess

コピー先
example.com/（ルート）


⚠️ 移動ではなく「コピー」

手順⑤ index.php を書き換える（重要）

ルートにコピーした index.php を編集します。

修正前
require( dirname( __FILE__ ) . '/wp-blog-header.php' );

修正後（サブディレクトリ名を追加）
require( dirname( __FILE__ ) . '/wordpress/wp-blog-header.php' );

👉「WordPress本体は /wordpress にあるよ」と教えてあげる処理です。

手順⑥ 新しいURLで管理画面にログイン
https://example.com/wordpress/wp-admin


ログインできればOK。

手順⑦ パーマリンクを「保存」する

設定 → パーマリンク設定
→ 何も変更せず 保存

🔧
これで .htaccess が正しい状態に再生成されます。

（404が直る定番対処法）

動作確認
https://example.com/


にアクセスして、

サイトが表示される

管理画面も問題なく使える

👉 これで作業完了 🎉

よくあるつまずきポイント
❌ 404が出て焦る

→ 途中では 正常な挙動

❌ index.php の書き換え忘れ

→ ほぼこれが原因

❌ パーマリンク保存を忘れる

→ 表示されない原因No.1

この動画のポイントまとめ

WordPressの 設置場所 と 表示URL は別にできる

手順は多そうに見えて実際はシンプル

実務・セキュリティ面でも役立つ知識

困ったら「パーマリンク保存」を試す

WordPress公式サイト サブディレクトリ設定
https://developer.wordpress.org/advanced-administration/server/wordpress-in-directory/?utm_source=chatgpt.com

【WordPress】example com／wordpressのWPをexample comで表示する方法
https://www.youtube.com/watch?v=VnVS8ZCBsP4