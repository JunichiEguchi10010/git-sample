WordPress 'post_type'の種類について 20250408

WordPressのポストタイプは、投稿コンテンツの種類を分類するためのものです。


1. デフォルトのポストタイプ
post: 通常の投稿（ブログ記事など）。

page: 固定ページ（「お問い合わせ」や「会社概要」などの静的なページ）。

attachment: メディアファイル（画像や動画など）。

revision: 投稿のリビジョン（編集履歴）。

nav_menu_item: ナビゲーションメニューのアイテム。


2. カスタムポストタイプ
開発者が独自に追加するポストタイプです。

例えば：
product: 商品データ（Eコマースサイト向け）。

event: イベント情報。

portfolio: ポートフォリオ作品。

testimonial: お客様の声。


カスタムポストタイプを作成することで、特定のニーズに合わせたコンテンツの管理が可能になります。
例えば、以下のコードを使えば新しいポストタイプを登録できます

functions.php ファイルに記述する
// カスタムポストタイプ「イベント」を登録
function create_custom_post_type() {
    register_post_type('event', array(
        'label' => 'イベント',
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
    ));
}
add_action('init', 'create_custom_post_type');

この方法は簡単で、テーマにカスタマイズを追加する場合に適しています。
ただし、テーマを変更するとコードも無効になるため、注意が必要です。


2. プラグイン
テーマに依存しないコードを記述したい場合、独自のプラグインを作成して記述します。

プラグインフォルダを作成: /wp-content/plugins/ 内に新しいフォルダ（例: my-custom-post-type）を作成します。
プラグインファイルを作成: フォルダ内に my-custom-post-type.php というファイルを作成し、以下のように記述します。
<?php

/*
Plugin Name: My Custom Post Type
Description: カスタムポストタイプ「イベント」を作成
Version: 1.0
Author: Junichi
*/

function create_custom_post_type() {
    register_post_type('event', array(
        'label' => 'イベント',
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
    ));
}
add_action('init', 'create_custom_post_type');
?>

３．プラグインを有効化: WordPress 管理画面の「プラグイン」セクションで、このプラグインを有効化します。

どちらを選ぶべき？
functions.php: テーマごとに異なるカスタマイズが必要な場合に便利です。

プラグイン: テーマとは独立して再利用可能なカスタム機能を作成する場合に最適です。