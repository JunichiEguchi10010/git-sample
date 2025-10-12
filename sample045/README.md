WordPress カスタム投稿タイプと「Custom Post Type UI」について 20250424 sample029 README.md参照

Custom Post Type UI プラグインでカスタム投稿を簡単に追加
カスタム投稿タイプを追加する方法は、functions.phpにコードを書く方法の他に、
プラグイン「Custom Post Type UI（CPT UI）」を使う方方法もあります。

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


✅ WordPress における 「カスタム投稿タイプ (Custom Post Type)」 と
プラグイン 「Custom Post Type UI」 は密接に関係していますが、正確には 別のもの です。
それぞれの意味と関係を整理すると、次のようになります 👇

🧩 ① カスタム投稿タイプ（Custom Post Type）とは？

WordPress の標準機能のひとつで、
通常の「投稿（post）」や「固定ページ（page）」以外に、
独自の投稿タイプ（記事の分類） を作る仕組みです。

例：
「お知らせ（news）」
「制作実績（works）」
「商品情報（products）」
「スタッフ紹介（staff）」など

これにより、サイトを「ブログ記事」だけでなく
「実績ページ」や「商品カタログ」など構造的に整理できるようになります。

👉 つまり「投稿の種類を増やす」ための仕組みです。

⚙️ ② Custom Post Type UI（CPT UI）とは？
これは、上の「カスタム投稿タイプ」を
コードを書かずに簡単に作れるようにするプラグイン です。

普通なら functions.php に次のような PHP コードを書きます：

function create_post_type() {
  register_post_type('works', [
    'label' => '制作実績',
    'public' => true,
    'menu_position' => 5,
    'supports' => ['title', 'editor', 'thumbnail'],
  ]);
}
add_action('init', 'create_post_type');

↑これをプラグインの管理画面からクリック操作で設定できるのが
「Custom Post Type UI」です。

🪄 ③ 両者の関係まとめ
項目	                  説明
カスタム投稿タイプ	    WordPress のコア機能。独自の投稿種別を追加する仕組み。
Custom Post Type UI	  そのカスタム投稿タイプを GUI で作成・管理できる補助プラグイン。
使う理由	             コードを書かずに誰でもカスタム投稿タイプを作成できるから。
💡 補足：よく一緒に使われるプラグイン

Advanced Custom Fields (ACF)
→ カスタム投稿タイプに「追加の項目（カスタムフィールド）」をつけるときに使います。
（例：「制作実績」に“クライアント名”や“制作年月日”などを追加）


✅「Custom Post Type UI + ACF」で 「制作実績（works）」 のカスタム投稿タイプを作る
具体的な手順＋おすすめ設定値＋使い方の流れ を図解的にまとめて解説します。

🎯 目的
WordPressで「制作実績」ページを投稿のように登録・管理できる仕組みを作る。

例：
制作実績
├─ サイト名：カフェYachiyo 様
├─ 制作年月：2025年4月
├─ 担当範囲：デザイン・コーディング
├─ URL：https://sample.com

🧩 使用プラグイン
プラグイン名	                        役割
Custom Post Type UI (CPT UI)	「制作実績」という投稿タイプを作成
Advanced Custom Fields (ACF)	 投稿に追加項目（クライアント名・URLなど）を付与

🪜 手順①：「制作実績」カスタム投稿タイプを作成（CPT UI）
1️⃣ 管理画面で操作
管理画面メニュー → 「CPT UI」 → 「投稿タイプの追加」
以下の設定を入力👇

設定項目	              入力値	      説明
投稿タイプスラッグ	    works	      英小文字・複数形が推奨
複数形ラベル	         制作実績	    管理画面メニュー名などに表示
単数形ラベル	         制作実績	    編集画面タイトルなどに使用
公開設定(public)	     ✅ON	      サイトに表示されるように
アーカイブを有効にする	✅ON	       /works/ に一覧ページを生成
サポート項目 (supports)	title, editor, thumbnail	タイトル・本文・アイキャッチ使用可

💡ポイント
固定ページのように「本文＋画像」を使いたいなら上記3つが基本。
後でACFで細かい項目を追加できます。

🪜 手順②：「カスタムフィールド（追加項目）」を作成（ACF）
1️⃣ 管理画面 → 「カスタムフィールド」 → 「新規追加」

フィールドグループ名：「制作実績の詳細情報」

2️⃣ フィールドを追加（例）
フィールドラベル	  フィールド名	  フィールドタイプ  	例
クライアント名	    client	        テキスト	      カフェYachiyo
制作年月	          date	          日付ピッカー	  2025-04-01
担当範囲	          scope	        チェックボックス	デザイン / コーディング / WordPress構築
URL	site_url	URL	https://sample.com

3️⃣ 表示条件設定
「このフィールドグループを表示する」→
投稿タイプ が equal to works

💡これで「制作実績」の投稿画面にだけこれらの項目が表示される！

🪜 手順③：テンプレートへの反映
1️⃣ 一覧ページ（例：archive-works.php）
<?php get_header(); ?>
<h1>制作実績</h1>
<div class="works-list">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article>
      <a href="<?php the_permalink(); ?>">
        <?php the_post_thumbnail('medium'); ?>
        <h2><?php the_title(); ?></h2>
      </a>
    </article>
  <?php endwhile; endif; ?>
</div>
<?php get_footer(); ?>

2️⃣ 詳細ページ（例：single-works.php）
<?php get_header(); ?>
<article class="work-detail">
  <h1><?php the_title(); ?></h1>
  <p><strong>クライアント名：</strong><?php the_field('client'); ?></p>
  <p><strong>制作年月：</strong><?php the_field('date'); ?></p>
  <p><strong>担当範囲：</strong><?php the_field('scope'); ?></p>
  <p><strong>URL：</strong><a href="<?php the_field('site_url'); ?>" target="_blank"><?php the_field('site_url'); ?></a></p>
  <div class="work-content"><?php the_content(); ?></div>
</article>
<?php get_footer(); ?>

🖼️ 構造イメージ（図解）
WordPress 管理画面
├─ 投稿
├─ 固定ページ
└─ 制作実績（← Custom Post Type UIで追加）
     ├─ 制作実績①
     │    ├─ タイトル
     │    ├─ 本文
     │    ├─ アイキャッチ画像
     │    ├─ クライアント名（ACF）
     │    ├─ 制作年月（ACF）
     │    ├─ 担当範囲（ACF）
     │    └─ URL（ACF）
     └─ 制作実績② ...

💡 おすすめ運用ポイント
「カテゴリー」や「タグ」 を使いたい場合は
CPT UIの「タクソノミー追加」で作成可能。

画像ギャラリー を作りたい場合は、ACFの「リピーター」や「ギャラリー」フィールドを使用。

テーマ内で使うとき は、必ず has_post_thumbnail() などの条件分岐を入れると安全。

✅ まとめ
目的	              使用ツール	                    結果
投稿タイプを追加	  Custom Post Type UI         /works/一覧を自動生成
入力項目を増やす	  ACF	                        クライアント名やURLを管理
表示を整える	     テンプレート編集	             美しい制作実績ページを作成



✅ 「制作実績」投稿を実際に登録 → トップページで最新3件を表示する方法を、
わかりやすくコード付きで解説します。

🧩 前提条件
すでに「Custom Post Type UI」で
投稿タイプ「制作実績（スラッグ：works）」を作成済み
かつ「ACF」でカスタムフィールド（例：client, date, scope, site_url）を追加済み

🪜 手順①：投稿を登録

WordPress 管理画面 → 「制作実績」 → 「新規追加」

以下のように入力して保存します👇

項目	                  内容（例）
タイトル	            カフェYachiyo様 Webサイト制作
本文	               八千代市のカフェ様のWebサイトを制作しました。デザイン〜WordPress構築を担当。
アイキャッチ画像	    制作物のスクリーンショット
クライアント名（ACF）	カフェYachiyo
制作年月（ACF）	      2025-04-01
担当範囲（ACF）	      デザイン / コーディング / WordPress構築
URL（ACF）	         https://sample.com

💡これを3件以上登録しておくと、トップページで表示テストができます。

🪜 手順②：トップページで最新3件を表示するコード

トップページ用テンプレート（例：front-page.php または home.php）に以下を追加します👇

<section class="top-works">
  <h2>制作実績</h2>

  <?php
  // カスタム投稿タイプ「works」から最新3件を取得
  $args = array(
    'post_type' => 'works',
    'posts_per_page' => 3,
  );
  $works_query = new WP_Query($args);

  if ($works_query->have_posts()) :
  ?>
    <div class="works-list">
      <?php while ($works_query->have_posts()) : $works_query->the_post(); ?>
        <article class="work-item">
          <a href="<?php the_permalink(); ?>">
            <?php if (has_post_thumbnail()) : ?>
              <?php the_post_thumbnail('medium'); ?>
            <?php endif; ?>
            <h3><?php the_title(); ?></h3>
          </a>
          <p class="client">クライアント：<?php the_field('client'); ?></p>
          <p class="date">制作年月：<?php the_field('date'); ?></p>
        </article>
      <?php endwhile; ?>
    </div>
    <div class="more-link">
      <a href="<?php echo get_post_type_archive_link('works'); ?>">もっと見る →</a>
    </div>
  <?php
  else :
    echo '<p>制作実績はまだ登録されていません。</p>';
  endif;
  wp_reset_postdata();
  ?>
</section>

🎨 ちょっとしたCSS例
.top-works {
  margin: 60px auto;
  max-width: 1000px;
  padding: 0 20px;
}
.works-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.work-item {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 16px;
  text-align: center;
}
.work-item img {
  border-radius: 8px;
  margin-bottom: 8px;
}
.more-link {
  text-align: right;
  margin-top: 16px;
}
.more-link a {
  color: #3A99C9;
  text-decoration: none;
}

🧠 コードのポイント解説
処理	                                    内容
$args	                                「works」投稿タイプから最新3件を取得する条件指定
WP_Query	                              WordPress の投稿取得クラス
get_post_type_archive_link('works')	    /works/ の一覧ページへのリンクを自動取得
wp_reset_postdata()	                  ループ終了後にメインクエリをリセット（おまじない）

✅ 出来上がりイメージ
トップページに表示される例：
制作実績
─────────────────────
[画像] カフェYachiyo様 Webサイト制作
クライアント：カフェYachiyo
制作年月：2025-04-01

[画像] 美容室Lirio様 サイトリニューアル
クライアント：美容室Lirio
制作年月：2024-12-01

[画像] Bakery & Co.様 ECサイト構築
クライアント：Bakery & Co.
制作年月：2024-09-01


【WordPress】カスタム投稿基礎 完全解説(CPT UI:Custom Post Type UIを使用)
https://www.youtube.com/watch?v=E4RLjo_TT9I&t=13s


WordPress カスタム投稿タイプ・タクソノミー・ターム【オリジナルテーマ開発講座#4】
https://www.youtube.com/watch?v=zEwtnCjDW7k