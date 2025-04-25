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


【備考】
WordPressのタクソノミー設定によって、カテゴリーが複数選択可能になる場合があります。
通常、標準のカテゴリータクソノミーでは1つの投稿に対して1つのカテゴリーを選択するのが一般的ですが、
カスタムタクソノミーやプラグイン「Custom Post Type UI」）を使用して設定を変更すると、複数選択が可能になります。

なぜ複数選択が可能なのか？
Custom Post Type UIの設定:
「Custom Post Type UI」プラグインでカスタムタクソノミーを作成する際に、タクソノミーの設定オプションで「複数選択を許可する」ように設定されています。
具体的には、タクソノミー作成時に「階層構造（hierarchical）」をfalseに設定すると、タグのように複数選択が可能になります。

タクソノミーのタイプ:
階層型（hierarchical: true）:
通常のカテゴリーのように、親子関係を持ち、1つの投稿に対して1つのカテゴリーを選択する形式。

非階層型（hierarchical: false）:
タグのように複数選択が可能な形式。この設定が適用されている場合、複数のカテゴリーを選択できます。

管理画面のカスタマイズ:
プラグインやテーマによって、管理画面の挙動がカスタマイズされている場合があります。この場合、通常のカテゴリーでも複数選択が可能になることがあります。

確認方法
Custom Post Type UIの設定を確認:
管理画面で「タクソノミーの追加と編集」を開き、該当するタクソノミーの設定を確認してください。
「階層構造（hierarchical）」がfalseになっている場合、複数選択が可能です。

テーマやプラグインの影響:
使用しているテーマや他のプラグインが、カテゴリーの挙動を変更している可能性もあります。

結論
「ニュース」のカテゴリー欄で複数選択が可能なのは、Custom Post Type UIの設定やタクソノミーの構造が「非階層型（hierarchical: false）」に設定されているたです。
もし1つだけ選択可能にしたい場合は、タクソノミーの設定を「階層型（hierarchical: true）」に変更してください。


カスタム投稿を簡単に追加できる！Custom Post Type UIの使い方紹介！カスタムタクソノミーの設定方法も
https://www.youtube.com/watch?v=CwBkqZ7GDt4&t=4s


ワードプレスで投稿の種類を増やす！カスタム投稿（custom-post）を設定・表示させる方法と、詳細ページを作る方法
https://www.youtube.com/watch?v=rJ2cJTp3G-Y