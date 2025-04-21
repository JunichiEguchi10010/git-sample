WordPress カスタム投稿タイプ（例：「お知らせ」）の一覧ページを作成する方法　20250421
【get_post_type_archive_link】

個別投稿ページ（single-news.php）から一覧ページへのリンクを設置し、一覧ページ（archive-news.php）を作成する手順を示しています。​

🧩 主な手順とポイント
1. 個別投稿ページに一覧ページへのリンクを追加
    single-news.php ファイルを開き､一覧ページへのリンクを設置します。​

    リンクのURLは、get_post_type_archive_link() 関数を使用して取得します。​
php
<h3><a href="<?php echo esc_url(get_post_type_archive_link(get_post()->post_type)); ?>">お知らせ一覧</a></h3>

このコードは、現在の投稿タイプのアーカイブページ（一覧ページ）へのリンクを出力しています。
たとえばカスタム投稿タイプ news の個別ページにいる場合、news 一覧ページへのリンクになります。

💡補足解説
get_post()：現在の投稿オブジェクトを取得
->post_type：その投稿のタイプ（例：post, news など）を取得
get_post_type_archive_link()：その投稿タイプのアーカイブページのURLを取得

このコードにより、現在の投稿タイプ（この場合は「news」）のアーカイブページのURLが取得され、リンクとして表示されます。​


2. 一覧ページのテンプレートを作成
テーマディレクトリに archive-news.php ファイルを作成します。​
このファイルは、カスタム投稿タイプ「news」の一覧ページを表示するためのテンプレートです。​
archive.php や index.php をベースにして、必要な部分をカスタマイズします。​


💡 使う場面の例
たとえばカスタム投稿タイプ「お知らせ（post_type = news）」がある場合：

single-news.php にこのコードを入れておくと
単一投稿ページ（1つのお知らせの詳細）から
「お知らせ一覧」ページ（archive-news.php）へ戻るリンクが作れます。



① カスタム投稿の詳細ページ（single-◯◯.php）に一覧へ戻るリンク
使う理由： ユーザーが詳細ページから一覧へ戻りやすくするため。

例：

single-news.php → archive-news.php

single-product.php → archive-product.php

single-voice.php → archive-voice.php（お客様の声など）

② ループ内で各投稿タイプの一覧ページへリンクを出す
使う理由： 「もっと見る」「一覧を見る」ボタンを付けたいとき。

例：トップページやホームに複数の投稿タイプを表示しているとき
php
<section>
  <h2>最新のお知らせ</h2>
  <?php
    $news_query = new WP_Query([
      'post_type' => 'news',
      'posts_per_page' => 3
    ]);
    if ($news_query->have_posts()):
      while ($news_query->have_posts()): $news_query->the_post();
        the_title('<h3>', '</h3>');
      endwhile;
      wp_reset_postdata();
  ?>
    <a href="<?php echo esc_url(get_post_type_archive_link('news')); ?>">お知らせ一覧</a>
  <?php endif; ?>
</section>
③ パンくずリスト（breadcrumbs）に使う
使う理由： 現在地を示すパンくずの「投稿タイプ一覧ページ」リンクに使える。

php
<a href="<?php echo esc_url(get_post_type_archive_link(get_post()->post_type)); ?>">
  <?php echo post_type_archive_title('', false); ?>
</a>
④ 管理画面のカスタムリンクに使う場合（テーマオプションやウィジェット内）
使う理由： 投稿タイプ別の一覧に誘導したい場面で、URLをハードコーディングせず動的に取得したいとき。

🚫 注意点
投稿タイプに アーカイブページがない設定（has_archive => false） の場合は、get_post_type_archive_link() は false を返します。
その場合は、page.php などで独自の一覧ページを作ってリンクさせる必要があります。


3. 投稿のループを設定
archive-news.php 内で、WP_Query を使用して「news」投稿タイプの投稿を取得し、ループで表示します。​

php
  <?php
  $args = array(
      'post_type' => 'news',
      'posts_per_page' => 10,
  );
  $news_query = new WP_Query($args);
  if ($news_query->have_posts()) :
      while ($news_query->have_posts()) : $news_query->the_post();
          <!-- 投稿のタイトルや内容を表示 -->
      endwhile;
      wp_reset_postdata();
  else :
      echo 'お知らせはありません。';
  endif;
  ?>
このコードにより、「news」投稿タイプの最新10件の投稿が一覧表示されます。​


📝 補足情報
カスタム投稿タイプを作成する際は、has_archive パラメータを true に設定することで、アーカイブページ（一覧ページ）を有効にできます。​

php
  register_post_type('news', array(
      'has_archive' => true,
      <!-- その他の設定 -->
  ));
一覧ページが正しく表示されない場合は、WordPressの管理画面で「設定」→「パーマリンク設定」に移動し、「変更を保存」をクリックしてパーマリンクを再設定してください。​
ほう

✅ どこで使うか？（テンプレートでの使いどころ）
① トップページ（front-page.php や home.php）
たとえばトップページに「最新のお知らせ（news）」を3件だけ表示したい場合：

php
<section class="news-preview">
  <h2>最新のお知らせ</h2>
  <?php
    $args = array(
        'post_type' => 'news',
        'posts_per_page' => 3,
    );
    $news_query = new WP_Query($args);
    if ($news_query->have_posts()) :
        while ($news_query->have_posts()) : $news_query->the_post();
            the_title('<h3>', '</h3>');
            the_excerpt();
        endwhile;
        wp_reset_postdata();
    else :
        echo 'お知らせはありません。';
    endif;
  ?>
  <a href="<?php echo esc_url(get_post_type_archive_link('news')); ?>">お知らせ一覧へ</a>
</section>
② 独自のカスタム一覧ページ（page-news.phpなど）
WordPressの「固定ページ（ページスラッグ：news）」にひも付けて、オリジナルのデザインで一覧ページを作りたいときに使います。

③ ウィジェットエリアやサイドバー
サイドバーに「最近のお知らせ」を出すときにも同じようなコードを使います。

🛠 テンプレートにする方法
方法1：template-parts/にパーツ化する
ファイル：template-parts/loop-news.php

php
<?php
$args = array(
    'post_type' => 'news',
    'posts_per_page' => 5,
);
$news_query = new WP_Query($args);
if ($news_query->have_posts()) :
    while ($news_query->have_posts()) : $news_query->the_post();
        echo '<li><a href="' . get_permalink() . '">' . get_the_title() . '</a></li>';
    endwhile;
    wp_reset_postdata();
else :
    echo '<li>お知らせはありません。</li>';
endif;
?>
そして必要なテンプレートで：

php
<ul class="news-list">
  <?php get_template_part('template-parts/loop', 'news'); ?>
</ul>


WordPressのカスタム投稿でsingle.phpページを作る【get_post, post_title】
https://www.youtube.com/watch?v=MqJfFbUXoXQ


WordPressでカスタム投稿の一覧ページを作成する方法【get_post, post_type, get_post_type_archive_link】
https://www.youtube.com/watch?v=wq3ryTG-9dQ


WordPressでカスタム投稿のカテゴリー一覧を作成する方法【post_type, taxonomy, the_terms, get_post_ID】ht
tps://www.youtube.com/watch?v=geQVOAjjFaM