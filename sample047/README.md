WordPress register_post_type()について 20250425

register_post_type() は、WordPress でカスタム投稿タイプ（Custom Post Type） を作成するための関数です。
標準の「投稿」や「固定ページ」とは別に、独自の投稿タイプ（例：「お知らせ」「商品」「イベント」など）を追加して、管理や表示することができます。

🌟 基本構文
register_post_type( $post_type, $args );

【第一引数】$post_type: 投稿タイプのスラッグ（英数字で）例：'news'、'product'
【第二引数】$args: 投稿タイプの設定をまとめた連想配列（配列形式）

🛠 よく使うオプション一覧
ここでは register_post_type() の引数 $args によく使われるものを紹介します。

<!-- 第一引数'news', 第二引数$args -->
register_post_type( 'news', [
  'labels' => [
    'name' => 'お知らせ',
    'singular_name' => 'お知らせ',
    'add_new' => '新規追加',
    'add_new_item' => '新しいお知らせを追加',
    'edit_item' => 'お知らせを編集',
    'new_item' => '新しいお知らせ',
    'view_item' => 'お知らせを見る',
    'search_items' => 'お知らせを検索',
    'not_found' => 'お知らせが見つかりません',
    'menu_name' => 'お知らせ'
  ],
  'public' => true,
  'has_archive' => true,
  'menu_position' => 5, // 「投稿」のすぐ下
  'menu_icon' => 'dashicons-megaphone', // 管理画面でのアイコン
  'supports' => [ 'title', 'editor', 'thumbnail' ],
  'rewrite' => [ 'slug' => 'news' ],
  'show_in_rest' => true, // Gutenberg対応
] );

🔍 各項目の意味
項目名	            説明
labels	            管理画面で表示される日本語名など
public	            一般公開するかどうか（false にすると非公開投稿）
has_archive	        アーカイブページ（一覧ページ）を持つか
menu_position	    管理画面でのメニューの位置
menu_icon	        メニューアイコン（dashicons）
supports	        利用する編集機能（タイトル・本文・アイキャッチなど）
rewrite	            パーマリンク（URL）のスラッグ設定
show_in_rest	    Gutenberg ブロックエディタや REST API 対応

🧪 実際の使い方（functions.php）
php
function my_custom_post_type() {
  register_post_type( 'news', [
    'labels' => [ 'name' => 'お知らせ', 'singular_name' => 'お知らせ' ],
    'public' => true,
    'has_archive' => true,
    'supports' => [ 'title', 'editor', 'thumbnail' ],
    'show_in_rest' => true,
  ]);
}
add_action( 'init', 'my_custom_post_type' );

✅ カスタム投稿タイプを使うメリット
投稿と別に管理できる
固定ページのように自由なテンプレートを使える
タクソノミー（カテゴリやタグ）も独自で作れる
検索や一覧で混在せず、整理しやすい



✅ カスタム投稿タイプ × カスタムタクソノミー × カスタムフィールド のよくあるパターン


①「お知らせ」投稿（基本系）
投稿タイプ：news
使い方：会社の「お知らせ」や「更新情報」の管理

特徴：
タイトル・本文だけ
カテゴリやタグは不要（静的な一覧でOK）

register_post_type( 'news', [
  'labels' => [ 'name' => 'お知らせ' ],
  'public' => true,
  'has_archive' => true,
  'supports' => [ 'title', 'editor' ],
  'show_in_rest' => true,
] );


②「商品」投稿（カスタムタクソノミー＋カスタムフィールドあり）
投稿タイプ：product
タクソノミー：product_category（例：食品、文房具）

カスタムフィールド：
値段（price）
商品コード（product_code）

// カスタム投稿タイプ
register_post_type( 'product', [
  'labels' => [ 'name' => '商品' ],
  'public' => true,
  'has_archive' => true,
  'supports' => [ 'title', 'editor', 'thumbnail' ],
  'show_in_rest' => true,
] );

// カスタムタクソノミー（商品カテゴリ）
register_taxonomy( 'product_category', 'product', [
  'labels' => [ 'name' => '商品カテゴリ' ],
  'public' => true,
  'hierarchical' => true, // 階層化（カテゴリー型）
  'show_in_rest' => true,
] );

💡 カスタムフィールド（値段など）は Advanced Custom Fields (ACF) プラグインでUIから管理するのが便利

③「イベント」投稿（開催日付き）
投稿タイプ：event

カスタムフィールド：
開催日（event_date）
会場名（venue）

register_post_type( 'event', [
  'labels' => [ 'name' => 'イベント' ],
  'public' => true,
  'has_archive' => true,
  'supports' => [ 'title', 'editor', 'thumbnail' ],
  'show_in_rest' => true,
] );

🔧 イベント一覧ページで event_date を使って「開催日順ソート」をするのが定番です。


④「スタッフ紹介」投稿（人物情報）
投稿タイプ：staff

カスタムフィールド：
名前（name）
役職（position）
一言コメント（comment）

使い方：企業サイトでよくある「スタッフ紹介」

register_post_type( 'staff', [
  'labels' => [ 'name' => 'スタッフ' ],
  'public' => true,
  'has_archive' => false,
  'supports' => [ 'title', 'editor', 'thumbnail' ],
  'show_in_rest' => true,
] );

🔧 タクソノミー追加のコード例（カテゴリ型 or タグ型）
register_taxonomy( 'custom_category', 'your_post_type', [
  'labels' => [ 'name' => 'カスタムカテゴリ' ],
  'public' => true,
  'hierarchical' => true, // true=カテゴリ型 / false=タグ型
  'show_in_rest' => true,
] );


📦 おすすめプラグイン
Advanced Custom Fields (ACF)：カスタムフィールドの王道。ノーコードで設定可。
Custom Post Type UI：投稿タイプやタクソノミーの管理が簡単に。
Search & Filter：絞り込み検索のUIを作るのに便利。



register_post_type 公式ドキュメント
https://developer.wordpress.org/reference/functions/register_post_type/