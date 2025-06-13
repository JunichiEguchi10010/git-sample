WordPressで用意されている条件分岐タグ

よくある条件分岐の例

1. トップページのみ、または投稿ページのみ
if (is_front_page() && is_home()) {
    // トップページ（最新の投稿）の場合のみ実行
} elseif (is_front_page()) {
    // トップページ（固定ページとして設定されている場合）のみ実行
} elseif (is_single()) {
    // 投稿ページのみ実行
}

2. カテゴリーと投稿ページの組み合わせ
if (is_single() && in_category('WordPress')) {
    // 投稿ページかつ「WordPress」カテゴリーに属している場合のみ実行
}

3. 特定の固定ページで処理
if (is_page(array('contact', 'about'))) {
    // 固定ページ「contact」または「about」の場合のみ実行
}

4. カテゴリー一覧ページ + スラッグ指定
if (is_category('programming') || is_category('design')) {
    // カテゴリー「programming」または「design」の一覧ページのみ実行
}

5. 検索結果ページまたは404ページ
if (is_search()) {
    // 検索結果ページの場合に実行
} elseif (is_404()) {
    // 404ページの場合に実行
}

6. カスタム投稿タイプのアーカイブ
if (is_post_type_archive('portfolio') || is_tax('project-category')) {
    // カスタム投稿タイプ「portfolio」またはカスタムタクソノミー「project-category」の場合
}

7. 特定の条件を除外する
if (!is_front_page() && !is_page('contact')) {
    // トップページや固定ページ「contact」以外で実行
}

8. ページネーション（2ページ目以降）
if (is_paged()) {
    // 2ページ目以降で実行
}

応用例: 複数条件を組み合わせる
if ((is_front_page() || is_single()) && !is_category('uncategorized')) {
    // トップページまたは投稿ページで、「uncategorized」カテゴリではない場合に実行
}

条件分岐作成手順

1. 日本語で条件を整理
まず、実現したいロジックや条件を日本語で箇条書きにします。

例:
トップページの場合に特定の処理を行いたい。
または、投稿ページで特定のカテゴリに属している場合に処理を行いたい。

2. 疑似コード（擬似的なコード）に変換
日本語の条件を基に、ロジックを簡単なコード形式で書き起こします。

例:
if トップページ then
   処理Aを実行
else if 投稿ページかつ特定カテゴリ then
   処理Bを実行

3. 実際のコードに変換
疑似コードを基に、PHPのコードに置き換えます。

例:
if (is_front_page()) {
    // 処理A: トップページ用の処理
} elseif (is_single() && in_category('WordPress')) {
    // 処理B: 投稿ページでカテゴリが「WordPress」の場合
}

応用例: 複数条件を組み合わせる場合

要件:
トップページでは「処理A」を実行。
投稿ページで特定のカテゴリの場合は「処理B」を実行。
それ以外の場合は「処理C」を実行。

日本語で条件を記述:
トップページの場合 → 処理A
投稿ページでカテゴリが「WordPress」の場合 → 処理B
上記以外 → 処理C

疑似コード:
if トップページ then
    処理A
else ifF 投稿ページ Aand カテゴリが「WordPress」 then
    処理B
else
    処理C


WordPressで用意されている条件分岐タグ

<?php
echo '今表示しているページは ';
if ( is_front_page() ) {
  echo 'トップページ';
} elseif ( is_home() ) {
  echo '投稿トップ';
} elseif ( is_page() ) {
  echo '固定ページ';
} elseif ( is_single() ) {
  echo '投稿詳細ページ';
} elseif ( is_category() ) {
  echo 'カテゴリーアーカイブページ';
} elseif ( is_year() ) {
  echo '年別アーカイブページ';
} elseif ( is_search() ) {
  echo '検索結果ページ';
} elseif ( is_404() ) {
  echo 'Not Foundページ';
} else {
  echo 'その他のページ';
}
echo ' です。';
?>


<?php
// トップページのみ: is_front_page() && is_home() もしくは is_front_page()

// 固定ページのみ: is_page()
// 引数に ID、スラッグ（配列も可能）、IDとスラッグ（配列）、を入れると特定の固定ページのみになる

// 投稿詳細（single.php）: is_single()
// 引数に ID、スラッグ（配列も可能）、IDとスラッグ（配列）、を入れると特定の投稿ページのみになる
// 特定のカテゴリーに属している場合のみ → in_category(カテゴリー名)

コード例
if (is_single() && in_category('Wordpress')):
投稿ページで「WordPress」カテゴリに属している場合にのみ、特定の処理を実行する仕組み

; 引数には、カテゴリー名（文字列）やカテゴリーID、または配列で複数のカテゴリーを指定可能です。
if (is_single() && in_category(array('Wordpress', 'プログラミング'))):
    echo '<div>この記事は特定のカテゴリに属しています。</div>';
endif;

// カテゴリー一覧ページ（category.php）: is_category()

// スラッグ、配列での複数指定可能

// 検索結果のページ: is_search()

// 404: is_404()

// カスタム投稿のアーカイブ: is_post_type_archive('スラッグ')

// タクソノミー: is_tax()

// 2ページ目以降のページ: is_paged()

if (is_category()) {
    // カテゴリーページで実行する処理
}


条件分に具体例

1   トップページのみ、または投稿ページのみ

2   カテゴリーと投稿ページの組み合わせ

3   特定の固定ページで処理

4   カテゴリー一覧ページ + スラッグ指定

5   検索結果ページまたは404ページ

6   カスタム投稿タイプのアーカイブ

7   特定の条件を除外する

8   ページネーション（2ページ目以降）

9   特定の著者（Author）ページでカスタマイズ

10  レスポンシブデザインでの条件出し分け

11  ユーザー権限による機能の制御

12  タクソノミーによる条件分岐

13  投稿のカスタムフィールドを利用

14  サイトのマルチサイト対応

15  パーマリンク構造やURLのパターンでの分岐

16  時間や曜日に応じた処理

17  WooCommerceでの活用例

18  ロケーションベースのコンテンツ変更

19  ページテンプレートごとの処理

20  ログイン後のリダイレクトや表示分岐

21  コンテンツタイプ別の処理

22  投稿フォーマット（Post Format）ごとのカスタマイズ

23  ページテンプレートの切り替え

24  特定のタグで条件分岐

25  ページのリダイレクト

26  カスタムユーザーロールを利用

27  ページング（Pagination）の処理

28  特定の著者（Author）ページでカスタマイズ

29  カスタムフィールド値による分岐

30  投稿のステータス別カスタマイズ

31  クエリパラメータによる条件分岐

32  特定の画像サイズやメタデータを利用

33  ユーザーエージェントを使った詳細な条件分岐

34  子ページかどうかの判定

35  サイトの言語ごとの処理（多言語サイト対応）

36  投稿のカスタム順序やランキング

37  年・月・日での条件分岐

38  コメント数を基にした分岐

39  外部APIやデータを使った条件分岐

40  時間やデバイスによる動的な内容出し分け


1. ページの出し分け
例: トップページではスライダーを表示し、投稿ページでは別のコンテンツを表示。

php
if (is_front_page()) {
    // トップページ専用コンテンツ
    echo '<div>トップページスライダー</div>';
} elseif (is_single()) {
    // 投稿ページ専用コンテンツ
    echo '<div>投稿ページのサイドバー</div>';
} else {
    // その他のページ
    echo '<div>デフォルトのコンテンツ</div>';
}

2. スワイパーの出し分け
目的: トップページでは全画面スライダー、カテゴリーアーカイブでは小型スライダーを表示。

php
if (is_front_page()) {
    // フルスクリーンスライダー
    echo '<div class="swiper-fullscreen">トップページスライダー</div>';
} elseif (is_category()) {
    // カテゴリー専用スライダー
    echo '<div class="swiper-small">カテゴリー専用スライダー</div>';
}

3. ウィジェットの出し分け
例: サイドバーのウィジェットをページによって変更。

php
if (is_page('about')) {
    dynamic_sidebar('about-sidebar');
} elseif (is_single() && in_category('News')) {
    dynamic_sidebar('news-sidebar');
} else {
    dynamic_sidebar('default-sidebar');
}

4. CSSやJavaScriptの読み込みを出し分け
目的: 特定のページでのみスクリプトやスタイルを読み込む。

php
if (is_front_page()) {
    wp_enqueue_script('front-page-script', get_template_directory_uri() . '/js/front-page.js', array(), null, true);
} elseif (is_page('contact')) {
    wp_enqueue_style('contact-page-style', get_template_directory_uri() . '/css/contact.css');
}

5. ヘッダーやフッターのデザインを変更
例: ページごとに異なるヘッダーやフッターを表示。

php
if (is_front_page()) {
    get_template_part('header', 'front');
} elseif (is_single()) {
    get_template_part('header', 'single');
} else {
    get_template_part('header', 'default');
}

6. 広告やCTA（Call to Action）の出し分け
例: 投稿ページでのみ広告を表示、固定ページでは異なるCTAボタンを表示。

php
if (is_single()) {
    echo '<div class="ad-banner">広告バナー</div>';
} elseif (is_page()) {
    echo '<button class="cta-button">お問い合わせはこちら</button>';
}

7. ユーザーのログイン状態によるコンテンツ変更
例: ログイン済みユーザーと未ログインユーザーで表示内容を変更。

php
if (is_user_logged_in()) {
    echo '<p>ようこそ、ログイン済みユーザーさん！</p>';
} else {
    echo '<p>ログインしてください。</p>';
}

8. 検索結果のカスタマイズ
目的: 検索結果ページで特定の条件を満たす場合に異なるレイアウトを表示。

php
if (is_search() && have_posts()) {
    // 検索結果あり
    echo '<p>検索結果が見つかりました。</p>';
} else {
    // 検索結果なし
    echo '<p>該当する結果が見つかりませんでした。</p>';
}

9. 表示するカテゴリやタグのフィルタリング
例: カテゴリー「News」かつタグ「Breaking」でフィルタリング。

php
if (is_category('News') && has_tag('Breaking')) {
    echo '<p>注目のニュース記事を表示</p>';
}

10. レスポンシブデザインでの条件出し分け
目的: デバイスごとに異なる表示を実現。

php
if (wp_is_mobile()) {
    echo '<div>モバイル向けコンテンツ</div>';
} else {
    echo '<div>デスクトップ向けコンテンツ</div>';
}

11. ユーザー権限による機能の制御
管理者や編集者のみ特定の処理を実行：

php
if (current_user_can('administrator')) {
    echo '<p>管理者専用の情報や機能。</p>';
} elseif (current_user_can('editor')) {
    echo '<p>編集者専用の情報や機能。</p>';
} else {
    echo '<p>一般ユーザー用の情報。</p>';
}

12. タクソノミーによる条件分岐
カスタムタクソノミーで分類されたコンテンツの出し分け：

php
if (is_tax('product-category', 'electronics')) {
    echo '<p>エレクトロニクス商品のカテゴリーです。</p>';
}

13. 投稿のカスタムフィールドを利用
特定のカスタムフィールドの値で条件を分岐：

php
$custom_field_value = get_post_meta(get_the_ID(), 'field_name', true);
if ($custom_field_value === '特定の値') {
    echo '<p>カスタムフィールドの条件を満たしました。</p>';
}

14. サイトのマルチサイト対応
特定のサブサイトでの条件分岐（マルチサイト用）：

php
if (get_current_blog_id() === 2) {
    echo '<p>この内容はサブサイト用です。</p>';
}

15. パーマリンク構造やURLのパターンでの分岐
現在のページURLやクエリパラメータをチェックして処理を分岐：

php
if (strpos($_SERVER['REQUEST_URI'], 'specific-path') !== false) {
    echo '<p>特定のURLパスに基づいた処理。</p>';
}

16. 時間や曜日に応じた処理
サイトのコンテンツを日時や曜日で変える：

php
$current_day = date('l'); // 現在の曜日
if ($current_day === 'Monday') {
    echo '<p>月曜日限定コンテンツ。</p>';
}

17. WooCommerceでの活用例
WooCommerceを使用している場合の特定条件での処理：

php
if (is_product() && has_term('sale', 'product_cat')) {
    echo '<p>セール中の商品ページです。</p>';
}

18. ロケーションベースのコンテンツ変更
ユーザーのIPや位置情報を活用（外部サービスを併用する場合が多い）：

php
$user_country = $_SERVER['GEOIP_COUNTRY']; // GEOIPプラグイン等が必要
if ($user_country === 'Japan') {
    echo '<p>日本のユーザー向けのコンテンツ。</p>';
}

19. ページテンプレートごとの処理
テーマ内の特定のテンプレートファイルで処理を分岐：

php
if (is_page_template('template-custom.php')) {
    echo '<p>カスタムテンプレートのページです。</p>';
}

20. ログイン後のリダイレクトや表示分岐
ユーザーがログインしている場合とログアウトしている場合で表示を変える：

php
if (is_user_logged_in()) {
    echo '<p>ログイン中のユーザー向けメッセージ。</p>';
} else {
    wp_redirect(wp_login_url());
    exit;
}

21. コンテンツタイプ別の処理
投稿タイプごとに異なる処理を行いたい場合。

php
if (is_post_type_archive('news')) {
    echo '<p>ニュースアーカイブ用の内容。</p>';
} elseif (is_post_type_archive('event')) {
    echo '<p>イベントアーカイブ用の内容。</p>';
}

22. 投稿フォーマット（Post Format）ごとのカスタマイズ
投稿に設定されたフォーマット（例: ギャラリー、ビデオ、引用など）に応じてデザインを変える。

php
if (has_post_format('video')) {
    echo '<p>この投稿は動画フォーマットです。</p>';
} elseif (has_post_format('gallery')) {
    echo '<p>この投稿はギャラリーフォーマットです。</p>';
}

23. ページテンプレートの切り替え
特定の条件でテンプレートを動的に変更したい場合。

php
if (is_category('special-category')) {
    include(locate_template('template-special-category.php'));
} else {
    include(locate_template('template-default.php'));
}

24. 特定のタグで条件分岐
投稿に特定のタグが付いているかどうかで処理を分岐。

php
if (has_tag('featured')) {
    echo '<p>この投稿は「注目記事」に該当します。</p>';
}

25. ページのリダイレクト
特定の条件で別のページやURLにリダイレクト。

php
if (is_page('old-page')) {
    wp_redirect(home_url('/new-page'));
    exit;
}

26. カスタムユーザーロールを利用
ユーザーのカスタムロールに基づいて処理を分岐。

php
if (current_user_can('custom_role')) {
    echo '<p>この内容は特定のカスタムロールユーザー向けです。</p>';
}

27. ページング（Pagination）の処理
2ページ目以降の特定の条件でレイアウトを変更。

php
if (is_paged() && is_category('blog')) {
    echo '<p>このカテゴリの2ページ目以降の内容です。</p>';
}

28. 特定の著者（Author）ページでカスタマイズ
投稿者ページで、著者に応じたカスタマイズ。

php
if (is_author('john-doe')) {
    echo '<p>このページはジョン・ドゥーさんの投稿です。</p>';
}

29. カスタムフィールド値による分岐
Advanced Custom Fields（ACF）やカスタムフィールドの値で分岐。

php
$special_field = get_field('special_field');
if ($special_field === 'value1') {
    echo '<p>特定の値1に該当する内容です。</p>';
}

30. 投稿のステータス別カスタマイズ
公開済み、下書き、非公開の投稿に応じて処理を変える。

php
if (get_post_status() === 'publish') {
    echo '<p>公開済みの投稿です。</p>';
} elseif (get_post_status() === 'draft') {
    echo '<p>これは下書きの投稿です。</p>';
}

31. クエリパラメータによる条件分岐
URLのパラメータを基に表示内容を変更。

php
if (isset($_GET['promo']) && $_GET['promo'] === 'special') {
    echo '<p>プロモーションページです。</p>';
}

32. 特定の画像サイズやメタデータを利用
サムネイルや画像サイズの条件に応じて処理を変更。

php
if (has_post_thumbnail() && get_post_thumbnail_id() === 123) {
    echo '<p>特定のサムネイル画像が設定されています。</p>';
}

33. ユーザーのブラウザやOSごとのカスタマイズ
ユーザーエージェントを使って出し分けを行う。

php
if (strpos($_SERVER['HTTP_USER_AGENT'], 'iPhone') !== false) {
    echo '<p>iPhoneユーザー向けの表示。</p>';
}

34. APIレスポンスや外部データを活用
外部APIのデータやレスポンスに応じた条件。

php
$response = wp_remote_get('https://api.example.com/data');
if (!is_wp_error($response) && wp_remote_retrieve_body($response) === 'success') {
    echo '<p>外部APIからのデータに基づいています。</p>';
}

35. 特定の年・月・日での条件分岐
過去の記事や特定の期間に作成されたコンテンツを対象にする：

php
if (is_date() && is_year(2025)) {
    echo '<p>2025年のコンテンツです。</p>';
}

36. 投稿のコメント数を基にした分岐
コメントが一定数以上の投稿で特定の処理を行う：

php
if (get_comments_number() > 10) {
    echo '<p>この投稿は話題になっています！</p>';
}

37. ユーザーエージェントを使った詳細な条件分岐
ユーザーのデバイスやブラウザごとに出し分けを行う：

php
if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') !== false) {
    echo '<p>Chromeブラウザ向けコンテンツ。</p>';
}

38. 子ページかどうかの判定
親ページに属する子ページでの処理：

php
if (is_page() && $post->post_parent) {
    echo '<p>このページは子ページです。</p>';
}
39. サイトの言語ごとの処理（多言語サイト対応）
多言語プラグイン（例: WPML）を使用している場合、言語ごとの条件分岐：

php
if (defined('ICL_LANGUAGE_CODE') && ICL_LANGUAGE_CODE === 'en') {
    echo '<p>This content is for English users.</p>';
}

40. 投稿のカスタム順序やランキング
投稿の順序や特定のカスタム値を基にした表示：

php
$meta_value = get_post_meta(get_the_ID(), 'ranking', true);
if ($meta_value && $meta_value === 'top') {
    echo '<p>この投稿はトップランキングです！</p>';
}