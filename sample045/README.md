WordPress カスタム投稿タイプと「Custom Post Type UI」について　20250424

Custom Post Type UI プラグインでカスタム投稿を簡単に追加
カスタム投稿タイプを追加する方法は、functions.phpにコードを書く方法の他に、プラグイン「Custom Post Type UI（CPT UI）」を使う方方法もあります。
以下は、実際に「ニュース」という投稿タイプを作ります。

① プラグインのインストールと有効化
WordPressの管理画面から「プラグイン > 新規追加」
「Custom Post Type UI」で検索
インストールして「有効化」

② 新しい投稿タイプを作成
左メニューに「CPT UI」が追加されているのでクリック

「投稿タイプの追加」を選択

以下を入力：
投稿タイプスラッグ：news
ラベル：ニュース
複数形：News、単数形：News

必要に応じてオプション（タイトル・エディター・アイキャッチ画像など）を設定
「投稿タイプを追加」で保存！

③ 記事の追加
作成した「ニュース」投稿タイプが左メニューに表示されるので、「新規追加」から記事を作成しましょう。

④ フロントページに表示させる方法（PHPで表示）
投稿取得用クエリ：
php
<?php
$args = array(
  'post_type' => 'news',
  'posts_per_page' => 3, // 表示件数
);
$news_query = new WP_Query($args);
?>
ループ処理：
php
<?php if ($news_query->have_posts()): ?>
  <ul>
  <?php while ($news_query->have_posts()): $news_query->the_post(); ?>
    <li>
      <a href="<?php the_permalink(); ?>">
        <time datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date(); ?></time>
        <h3><?php the_title(); ?></h3>
        <p><?php the_excerpt(); ?></p>
      </a>
    </li>
  <?php endwhile; ?>
  </ul>
<?php endif; wp_reset_postdata(); ?>

⑤ タクソノミー（カテゴリー・タグ）の追加
「CPT UI」>「タクソノミーの追加」

タクソノミー名：news_category
ラベル：ニュースカテゴリー
このタクソノミー「news」に紐づける
作成したカテゴリ（例：イベント、プレスリリース）を追加
※ スラッグは英語にして、SEO対策にも注意！

✅ 最後に
Custom Post Type UI を使うことで、ノーコードでカスタム投稿が作れる
フロントに出すにはPHPのクエリとループが必要
カテゴリー・タグも追加可能で、普通の投稿のように管理できる



カスタム投稿を簡単に追加できる！Custom Post Type UIの使い方紹介！カスタムタクソノミーの設定方法も
https://www.youtube.com/watch?v=CwBkqZ7GDt4&t=4s


ワードプレスで投稿の種類を増やす！カスタム投稿（custom-post）を設定・表示させる方法と、詳細ページを作る方法
https://www.youtube.com/watch?v=rJ2cJTp3G-Y