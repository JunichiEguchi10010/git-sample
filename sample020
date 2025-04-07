WordPress メインクエリについて 20250406


WordPressのメインクエリとは？
WordPressには「メインクエリ」という仕組みがあって、
ページを表示するときに「何の記事を表示すべきか」を決める役割をします。
(URLに基づいてBDより取得してくる投稿データ)

例えば：
投稿一覧ページ（ブログ）なら → 投稿を複数取得して一覧表示

固定ページなら → その1ページだけを取得

カテゴリーページなら → 特定のカテゴリの記事一覧

というように、「ページの種類」によってクエリの内容が変わるのが基本です。


クエリとテンプレートの関係
ページ種別	                    メインクエリの種類	                使用されるテンプレート例
ホームページ（TOP）	        固定ページのクエリ	                front-page.php または page.php
投稿ページ（News）	        投稿一覧のクエリ（Main Query）	    home.php または index.php



<div class="news blContainer">
  <div class="news_heading">News</div>
;  have_posts() 投稿があればtrueを返す関数
  <?php if (have_posts()) : ?>
    <ul class="news_list">
    ; 投稿がある間、繰り返し処理(処理する投稿データを処理対象としてセットした後、処理対象を1つ先に進める)
      <?php while (have_posts()) : the_post(); ?>
    ;   投稿がある間ループされる部分 ↓
        <li class="news_item">
          <a class="news_link" href="<?php the_permalink() ?>">
            <div class="news_date"><?php echo get_the_date() ?></div>
            <div class="news_title"><?php the_title() ?></div>
          </a>
        </li>
        ; 投稿がある間ループされる部分 ↑
      <?php endwhile; ?>
    </ul>
  <?php endif; ?>
</div>



ワードプレスの管理画面の「設定」 > 「表示設定」 > 「ホームページの表示」について

「どのページがメインクエリで投稿一覧を表示するページになるか」を設定するところです。

「最新の投稿」：デフォルト設定。トップページに投稿記事の一覧が表示されます（ブログ形式）。
投稿一覧ページ（is_home & is_front_page）

「固定ページ（以下で選択）」：トップページと投稿一覧ページを指定した固定ページに変更できます。

【テンプレート階層】とは？
WordPressはページを表示するときに、「どのテンプレートファイルを使うか」を自動で判断します。
この優先順位のルールのことを「テンプレート階層（Template Hierarchy）」と呼びます。

設定画面で「固定ページをホームページに設定」しているとき：
優先順位：
1. front-page.php （あれば最優先！）
2. page-{スラッグ}.php（例:page-top.php）
3. page.php
4. index.php

設定画面で「投稿ページ」に News を指定しているとき：
優先順位：
1. home.php(メインクエリ)
2. index.php



 WordPressの is_home() と is_front_page() の違い図解（テキスト版）
① [「表示設定」で「最新の投稿」に設定している場合]

   ┌─────────────┐
   │ ホームページ │ ← トップページ（投稿一覧）
   └─────────────┘
      ↑
  is_home() = true
  is_front_page() = true

→ つまりトップページが投稿一覧になる場合、
   両方 true になる。

──────────────────────────

② [「表示設定」で「固定ページ」に設定している場合]
 
   ┌────────────┐        ┌────────────┐
   │ ホームページ：TOP │        │ 投稿ページ：News │
   └────────────┘        └────────────┘
        ↑                         ↑
  is_front_page() = true     is_home() = true

→ トップページ（TOP）は「静的な固定ページ」
→ 投稿一覧（News）は別ページになっている



よくある勘違い
is_home() = トップページではないことがある！
→ WordPressでの「home」は「投稿一覧」の意味

is_front_page() = 投稿一覧になることもある！



💡 home.php は「投稿一覧用」のテンプレート
でも表示される場所は、以下のように**「ホームページの表示」設定に左右される**：

🔷 【設定：ホームページの表示 → 最新の投稿】
👉 このとき home.php が トップページとして使われる

優先順位：front-page.php → home.php → index.php

実際の内容：投稿の一覧（ブログ）

🔶 【設定：ホームページの表示 → 固定ページ＋投稿ページを別で指定】
👉 このとき home.php は 投稿ページ（お知らせページなど）に使われる

トップページ側は：front-page.php や page.php

投稿ページ側は：home.php

📌 つまり home.php は「投稿一覧を表示するページ」に使われるが、
そのページが「トップ」になるか「別ページ」になるかは、管理画面の設定次第！






確認用デバッグコード：
php
<?php
global $wp_query;

if (is_home()) {
  echo 'これは投稿ページです<br>';
}

if (is_front_page()) {
  echo 'これはフロントページです<br>';
}

echo '<pre>';
print_r($wp_query->query);
echo '</pre>';




WordPress、テーマ開発に必要なメインクエリとサブクエリを徹底解説
https://www.youtube.com/watch?v=_7Chp0Bze6k