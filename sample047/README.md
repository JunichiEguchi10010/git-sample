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

register_post_type 公式ドキュメント
https://developer.wordpress.org/reference/functions/register_post_type/