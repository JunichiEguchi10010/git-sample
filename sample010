WordPressの独自テーマで、アイキャッチ・サムネイル画像を表示する方法【2種類】


1. the_post_thumbnail()を使った方法（imgタグを用いる）●基本的にこちらを使う
2. background-imageを使った方法（CSSを用いる）

適切な使い分け
the_post_thumbnail() はSEOの観点からalt属性を容易に設定できるため、検索エンジン対策を重視する場合に有効。
background-image はデザインやレイアウトが複雑な場合、特にカード型のデザインで便利。



1. the_post_thumbnail()を使った方法（imgタグを用いる）

add_theme_support('post-thumbnails')をfunctions.phpに追加することで、アイキャッチ画像機能が有効になります。
投稿またはページでアイキャッチ画像を設定している場合のみ、表示されます。

以下のコードをfunction.phpに追加します。

<?php
// アイキャッチ画像を有効化する。 add_theme_supportは、WordPressのテーマに新しい機能を追加するための関数です。独自テーマを作成する際に利用され、特定の機能を有効化することで、テーマがその機能をサポートできるようになります。
?>
<!-- アイキャッチ画像を出力する -->
<?php if ( has_post_thumbnail() ) : ?>
    <?php the_post_thumbnail('thumbnail', ['class' => 'custom-class', 'alt' => '代替テキスト']); ?>
<?php endif; ?>


以下のコードをhtmlに記述します。

<ul class="postslist">
<?php if (have_posts()): while(have_posts()): the_post(); ?>
<li>
<a href="<?php the_permalink(); ?>">
<!-- アイキャッチ画像を出力する ここでは、the_post_thumbnail()関数を使用して、投稿のアイキャッチ画像を出力しています。 -->
<?php the_post_thumbnail(); ?>
<h3><?php the_title(); ?></h3>
<time datetime="<?php echo get_the_date('Y-m-d'); ?>">
<p><?php the_excerpt(); ?></p>
</a>
<?php the_category(); ?>
</li>
<?php endwhile; endif; ?>
</ul>


特徴:
the_post_thumbnail()はシンプルな構文で、直接HTMLのimgタグを生成します。

サイズ指定（thumbnail, medium, largeなど）やクラスを簡単に追加できます。

デフォルトの画像サイズでレンダリングされ、画像にalt属性なども付けやすいです。(SEO対策)




2. background-imageを使った方法（CSSを用いる）

<div class="thumbnail"
    style="background-image: url(<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>)">
</div>

特徴:

get_post_thumbnail_id()関数で投稿に関連付けられた画像IDを取得し、wp_get_attachment_url()でそのURLを生成します。

背景画像として表示するため、CSSでサイズや位置を調整可能です。

デザインの自由度が高く、カスタマイズが容易です。

スタイル例（CSS）:
.thumbnail {
    width: 100%;          /* 横幅を指定 */
    height: 300px;        /* 縦幅を指定 */
    background-size: cover;    /* 画像を全体にフィット */
    background-position: center; /* 画像を中央寄せ */
    background-repeat: no-repeat; /* 繰り返さない */
    background-size: cover; /* 背景画像を要素全体を覆うように拡大・縮小します。アスペクト比を保ちながら要素に収める設定です。 */
}


独自テーマで、アイキャッチ・サムネイル画像を表示する方法！imgタグとbackground-imageで出力する手順を紹介！
https://www.youtube.com/watch?v=tx1_dS6TcTM

20250331作成