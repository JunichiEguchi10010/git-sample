WordPress カスタム投稿（Custom Post Type）におけるカテゴリー(カスタムタクソノミー)の一覧ページの作成方法　20250422


✅ カスタム投稿のカテゴリー一覧ページを作る手順まとめ
1. まず確認：カスタム投稿にカテゴリー（タクソノミー）を登録済みか？
まだの場合は「CPT UI」などのプラグインで

カスタム投稿タイプを作成

「タクソノミーの追加・編集」からカテゴリー（例：custom_category）を追加

2. テンプレートファイルの作成
通常の投稿と同様にカテゴリーごとの一覧ページを作るには、専用のテンプレートが必要です。
テンプレートファイル名の構成は：

taxonomy-{タクソノミーのスラッグ}.php
例：
タクソノミースラッグ：custom_category
ファイル名：taxonomy-custom_category.php

さらに、特定のカテゴリー（例：recruit）に限定したページにしたい場合は：

taxonomy-{タクソノミーのスラッグ}-{カテゴリースラッグ}.php
例：
taxonomy-custom_category-recruit.php

3. 投稿記事内でカテゴリーのリンクを出す
single-{post_type}.php の中などで、以下のようにカテゴリーリンクを表示可能：

php
<h4>カテゴリー: 
<?php 
the_terms(get_the_ID(), 'custom_category');
?>
</h4>
get_the_ID()：現在の投稿のIDを取得

'custom_category'：カスタム投稿に紐付けたタクソノミースラッグ
<!-- 、重要：自動的に <a> タグ付きで表示される -->
💡 the_terms() を使うことで、自動的に <a> タグ付きで表示されるため、HTMLタグを書く必要なし！

4. 表示の確認とURL構成の理解
URLは以下のように構成されます：

https://example.com/{タクソノミースラッグ}/{カテゴリースラッグ}/
例：
https://example.com/custom_category/recruit/
このURLで、taxonomy-custom_category-recruit.php が呼び出されます。

5. 注意点
テーマに archive-{post_type}.php がない場合は archive.php や index.php が使われます。
タクソノミーや投稿タイプのスラッグはCPT UIやregister_post_typeの設定時に確認できます。

functions.php で has_archive や rewrite の設定も要チェック。

🧩補足：ファイル命名ルール早見表

用途	                                        ファイル名例
投稿タイプ全体の一覧	                    archive-{post_type}.php
<!-- スタムタクソノミーに属する投稿の一覧ページを表示 -->
カスタムタクソノミー一覧	                taxonomy-{taxonomy}.php
特定カテゴリーの一覧	                    taxonomy-{taxonomy}-{term}.php
投稿単体ページ	                            single-{post_type}.php

✅ WordPress テンプレートファイルの命名ルール早見表（補足付き）

用途	                              ファイル名	                             補足説明
投稿タイプ全体の一覧	           archive-{post_type}.php	           カスタム投稿タイプ（例：news）の一覧ページ。例：archive-news.php
カスタムタクソノミーの一覧	        taxonomy-{taxonomy}.php	           カスタムタクソノミー（例：news_category）のすべてのカテゴリーページ共通のテンプレート。例：taxonomy-news_category.php
特定ターム（カテゴリ）の一覧	    taxonomy-{taxonomy}-{term}.php	　　特定のカテゴリ（例：採用 recruit）のページにだけ使われるテンプレート。例：taxonomy-news_category-recruit.php
投稿単体ページ	                   single-{post_type}.php	          カスタム投稿の個別ページ。例：single-news.php


🔁 テンプレート階層での優先順位（例）
たとえばカスタム投稿 news に属する投稿が news_category というタクソノミーの recruit というタームに属している場合…

アクセスされた URL が：
https://example.com/news_category/recruit/
このとき WordPress が読み込もうとするテンプレートは以下の順番になります：

taxonomy-news_category-recruit.php
↓
taxonomy-news_category.php
↓
taxonomy.php
↓
archive.php
↓
index.php


以下は、カスタム投稿タイプ news の中から、カスタムタクソノミー custom-category のスラッグが recruit の投稿を3件、新しい順に取得・表示する完全なテンプレートコード。
php
<div class="cards">
  <?php
  $args = [
    'orderby'          => 'date',
    'order'            => 'DESC',
    'posts_per_page'   => 3,
    'post_type'        => 'news',
    'tax_query'        => [
      [
        'taxonomy' => 'custom-category', // タクソノミースラッグ
        'field'    => 'slug',            // 'slug' または 'term_id'
        'terms'    => 'recruit',         // 表示したいカテゴリーのスラッグ
      ],
    ],
  ];

  $news_query = new WP_Query($args);

  if ($news_query->have_posts()) :
    while ($news_query->have_posts()) : $news_query->the_post();
  ?>
      <article class="card">
        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        <p class="date"><?php echo get_the_date(); ?></p>
        <div class="excerpt">
          <?php the_excerpt(); ?>
        </div>
      </article>
  <?php
    endwhile;
    wp_reset_postdata();
  else :
    echo '<p>該当するお知らせはありません。</p>';
  endif;
  ?>
</div>
🔍 解説
post_type：対象のカスタム投稿（ここでは news）。

tax_query：カスタムタクソノミー（ここでは custom-category）で絞り込み。

terms：表示したいタクソノミーのスラッグ（ここでは recruit）。

get_the_date()：投稿日時を表示。

the_excerpt()：投稿の抜粋を表示。


the_post_thumbnail() などでサムネイルの追加バージョン
以下は、サムネイル付きのカスタム投稿（news）一覧を表示するテンプレートコードです。
カスタムタクソノミー custom-category のスラッグ recruit に属する投稿3件を、日付順に取得して表示します。

✅ サムネイル付きテンプレートコード（the_post_thumbnail()使用）
php
<div class="cards">
  <?php
  $args = [
    'orderby'          => 'date',
    'order'            => 'DESC',
    'posts_per_page'   => 3,
    'post_type'        => 'news',
    'tax_query'        => [
      [
        'taxonomy' => 'custom-category',
        'field'    => 'slug',
        'terms'    => 'recruit',
      ],
    ],
  ];

  $news_query = new WP_Query($args);

  if ($news_query->have_posts()) :
    while ($news_query->have_posts()) : $news_query->the_post();
  ?>
      <article class="card">
        <a href="<?php the_permalink(); ?>">
          <?php if (has_post_thumbnail()) : ?>
            <div class="thumbnail">
              <?php the_post_thumbnail('medium'); // mediumサイズのアイキャッチ ?>
            </div>
          <?php endif; ?>
          <div class="content">
            <h3><?php the_title(); ?></h3>
            <p class="date"><?php echo get_the_date(); ?></p>
            <div class="excerpt">
              <?php the_excerpt(); ?>
            </div>
          </div>
        </a>
      </article>
  <?php
    endwhile;
    wp_reset_postdata();
  else :
    echo '<p>該当するお知らせはありません。</p>';
  endif;
  ?>
</div>
📝 補足ポイント
has_post_thumbnail()：アイキャッチがある投稿だけ the_post_thumbnail() を表示。
'medium' の代わりに 'thumbnail', 'large' などWordPress標準サイズに変更可能。カスタムサイズを作成して指定することもできます。
<a> タグで article 全体を囲んで、クリックしやすいUIに。


✅ カードレイアウト用CSS
css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 40px 0;
  padding: 0;
  list-style: none;
}

.card {
  width: calc(33.333% - 16px);
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.card a {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.thumbnail img {
  width: 100%;
  height: auto;
  display: block;
}

.content {
  padding: 16px;
}

.card h3 {
  font-size: 1.1rem;
  margin: 0 0 8px;
}

.card .date {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 12px;
}

.card .excerpt {
  font-size: 0.95rem;
  color: #333;
}
💡レスポンシブ対応を加えたい場合はこちら：
css
@media screen and (max-width: 768px) {
  .card {
    width: 100%;
  }
}
🔧 使用のヒント
このCSSは WordPress テーマの style.css にそのまま追加できます。

投稿数を3件にしているので、3列表示を前提に width: calc(33.333% - 16px); としています。投稿数を変更する場合は調整してください。




WordPressのカスタム投稿でsingle.phpページを作る【get_post, post_title】
https://www.youtube.com/watch?v=MqJfFbUXoXQ


WordPressでカスタム投稿の一覧ページを作成する方法【get_post, post_type, get_post_type_archive_link】
https://www.youtube.com/watch?v=wq3ryTG-9dQ


WordPressでカスタム投稿のカテゴリー一覧を作成する方法【post_type, taxonomy, the_terms, get_post_ID】
https://www.youtube.com/watch?v=geQVOAjjFaM