WordPressの独自テーマでアイキャッチ・サムネイル画像を出力する方法(2種類)

【1つ目】the_post_thumbnailでimgタグ出力する方法

基本的な表示	　　　　　　　　　<?php the_post_thumbnail(); ?>
サイズ指定　　　　　　　　　　　<?php the_post_thumbnail('medium'); ?>
カスタムサイズ	　　　　　　　　　add_image_size('custom-size', 400, 300, true); → <?php the_post_thumbnail('custom-size'); ?>
クラスや alt を追加	　　　　　<?php the_post_thumbnail('large', ['class' => 'custom-img', 'alt' => get_the_title()]); ?>
画像URLを取得して手動で　　　　 <img> を出力	get_the_post_thumbnail_url(get_the_ID(), 'full');
画像がない場合の代替画像	　　　if (has_post_thumbnail()) { the_post_thumbnail(); } else { echo '<img src="代替画像">'; }

1. アイキャッチ画像を有効化する
デフォルトでは、アイキャッチ画像の機能は無効になっています。
以下のコードを functions.php に追加して、アイキャッチ画像を有効化します。

// アイキャッチ画像を有効化
add_theme_support('post-thumbnails');

2. the_post_thumbnail() でアイキャッチ画像を表示する
the_post_thumbnail() を使用すると、投稿のアイキャッチ画像を <img> タグとして出力できます。

基本的な使い方
<?php the_post_thumbnail(); ?>
このコードをループ (while (have_posts()) など) の中に入れると、現在の投稿のアイキャッチ画像が表示されます。

3. the_post_thumbnail() のサイズ指定
the_post_thumbnail() は、引数に指定したサイズでアイキャッチ画像を出力できます。

WordPressで用意されているサイズ
サイズ名　　 説明
thumbnail	　サムネイルサイズ（デフォルト: 150x150px）
medium	　　中サイズ（デフォルト: 300x300px）
large　　　 大サイズ（デフォルト: 1024x1024px）
full	　　　元の画像サイズ

例: サイズを指定する
<?php the_post_thumbnail('medium'); ?>

4. カスタムサイズを登録して出力する
デフォルトのサイズではなく、オリジナルのサイズを登録して使うことも可能です。

カスタムサイズを登録 (functions.php)
// 幅400px、高さ300pxのサイズを追加（トリミングあり）
add_image_size('custom-size', 400, 300, true);

カスタムサイズで出力
<?php the_post_thumbnail('custom-size'); ?>

5. the_post_thumbnail() の属性をカスタマイズ
デフォルトでは、<img> タグに class="attachment-サイズ名" というクラスが付与されます。
追加のクラスや alt 属性を設定する場合は、array でオプションを渡します。

例: カスタムクラスを追加
<?php the_post_thumbnail('large', ['class' => 'custom-img', 'alt' => get_the_title()]); ?>
class : custom-img というクラスを追加
alt : 投稿のタイトルを alt 属性に設定

6. the_post_thumbnail() の画像URLを取得して <img> タグを手動で出力
the_post_thumbnail() は直接 <img> タグを出力しますが、URLだけを取得してカスタマイズしたい場合は get_the_post_thumbnail_url() を使います。

例: get_the_post_thumbnail_url() を使ってカスタマイズ

<?php 
$thumbnail_url = get_the_post_thumbnail_url(get_the_ID(), 'full'); 
if ($thumbnail_url): ?>
    <img src="<?php echo esc_url($thumbnail_url); ?>" alt="<?php the_title_attribute(); ?>" class="custom-img">
<?php endif; ?>

・get_the_post_thumbnail_url(get_the_ID(), 'full') : 投稿のアイキャッチ画像のURLを取得
・esc_url() : URLを安全に出力
・the_title_attribute() : alt に投稿タイトルを設定

7. アイキャッチ画像がない場合の処理
アイキャッチ画像が設定されていない場合、代替画像を表示したいときは has_post_thumbnail() を使います。

例: 代替画像を表示
<?php if (has_post_thumbnail()): ?>
    <?php the_post_thumbnail('medium'); ?>
<?php else: ?>
    <img src="<?php echo get_template_directory_uri(); ?>/images/no-image.png" alt="No Image">
<?php endif; ?>

has_post_thumbnail() : アイキャッチ画像の有無を判定
画像がない場合、no-image.png を表示

【2つ目】wp_get_attachment_url・get_post_thumbnail_idを使って、background-imageとして出力する方法
