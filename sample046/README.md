WordPress カスタム投稿タイプを設定･表示･詳細ページを作る方法 20250425


functions.phpにコードを記述してカスタム投稿タイプ（例：お知らせ）を作成し、
それをトップページに表示させ、さらに専用の詳細ページ（singleテンプレート）も作るという一連の流れの説明です。

📌 主な手順
① カスタム投稿「お知らせ」の追加
functions.php に register_post_type() を用いて information（お知らせ）というカスタム投稿タイプを定義。
labels, public, has_archive, supports（title, editor, thumbnail など）も指定。
注意点：スラッグ名や配列構造は正確に記述。

② 投稿が表示されない時の対処
管理画面の「設定 > パーマリンク設定」から「変更を保存」するだけでOK（URLルールが再構築される）。


📰 投稿の表示（トップページなどに表示）
front-page.php に WP_Query を使って information 投稿タイプを呼び出す。

front-page.phpに記述
$args = array(
  'post_type' => 'information',
  'posts_per_page' => 3,
);
$information_query = new WP_Query($args);
if文と whileループを使って、タイトル・日付などを表示。
ループ終了後は wp_reset_postdata(); を必ず実行。

📄 カスタム投稿の詳細ページ作成
カスタム投稿タイプごとに single-[post_type].php を作成（例：single-information.php）。
中身は single.php をコピーしてカスタマイズ。
デザインを通常の投稿とは別にしたいときに便利。

✅ 補足・注意点
クラシックエディターが表示される場合あり。グーテンベルグを使いたい場合は対応コードを追加。
投稿の表示場所や順番は menu_position で調整可能。





ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ


<!-- (カスタム投稿タイプを登録 -->
functions.phpに記述
<!-- WordPress初期化時にカスタム投稿タイプを登録するアクションを追加します。registerCustomPost(カスタムポストを登録する) -->
add_action('init', 'registerCustomPost');
function registerCustomPost() {
    <!-- カスタム投稿の名前を設定します。nameは全体名称、singular_nameは単一投稿名称です。-->
    $labels = array(
        'name' => '新着情報',
        'singular_name' => 'information'
    );
    <!-- 投稿タイプのオプションを指定します。publicは公開設定、supportsには利用する機能（例: タイトル、本文、サムネイルなど）を記載します。 -->
    $args = array(
        <!-- $labels にはカスタム投稿タイプの名称や説明が格納されています。例えば、カスタム投稿タイプの「名前」や「単一名称」などを設定することで、ダッシュボードでの表示名などが指定できます。 -->
        'labels' => $labels,
        <!-- カスタム投稿タイプが一般公開されるかどうかを指定します。true に設定することで、フロントエンドと管理画面の両方に表示されます。 -->
        'public' => true,
        <!-- WordPressの検索結果からこの投稿タイプを除外する設定です。true にすると、検索に含まれなくなります（非公開性を高めたい場合に便利）。 -->
        'exclude_from_search' => true,
        <!-- クエリ変数を有効にするかどうかを指定します。true にすると、この投稿タイプに対して URL クエリ（例: ?post_type=custom_type）を使用できます。 -->
        'query_var' => true,
        <!-- このカスタム投稿タイプの URL のパーマリンク構造を有効にします。デフォルトでは投稿タイプ名を使用したパーマリンクが作成されます。 -->
        'rewrite' => true,
        <!-- WordPress 標準の「投稿」と同じ権限モデルを使用するかを指定します。権限をカスタマイズする場合は、異なる値を指定することも可能です（例: page など）。 -->
        'capability_type' => 'post',
        <!-- 階層構造（親・子関係）を持つかどうかを指定します。false に設定すると、単純なリスト形式になり、true にすると固定ページのように階層構造を持てるようになります。 -->
        'hierarchical' => false,
        <!-- 管理画面のメニュー内で、このカスタム投稿タイプが表示される位置を指定します。値が小さいほど上に表示されます（例: 4 は「投稿」の下あたりに表示される位置です）。 -->
        'menu_position' => 4,
        'supports' => array('title', 'editor', 'thumbnail', 'revisions'),:
        <!-- この配列で、カスタム投稿タイプがサポートする機能を指定します。
        'title': タイトルをサポート。
        'editor': コンテンツエディター（本文）をサポート。
        'thumbnail': アイキャッチ画像をサポート。
        'revisions': リビジョン（履歴管理）をサポート。 -->
        'supports' => array('title', 'editor', 'thumbnail', 'revisions'),
    );
    <!-- 指定したオプションでカスタム投稿タイプを登録します。 -->
    register_post_type('information', $args);
}


ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ


<!-- フロントページにカスタム投稿タイプ（information）の投稿をリスト形式で表示 -->
front-page.phpに記述
<!-- 特定の投稿タイプ（information）の投稿をリスト形式で表示 -->
$args = array(
    % post_type: 投稿タイプをinformationに限定。
    'post_type' => 'information',
    % posts_per_page: 最大3件の投稿を取得。
    'posts_per_page' => 3
);
% new WP_Queryでカスタムクエリを生成し、information_queryに結果を格納。
<?php
$information_query = new WP_Query($args);
?>
<ul>
<!-- have_posts() と the_post() を使い、投稿データをループで処理。ループ内では、各投稿のリンク、日付、タイトルが出力されています。 -->
<!-- while(have_posts()) は、通常 複数の投稿を扱うページ（例: 投稿一覧ページやアーカイブページ）で使用されるので記述不要 -->
<!-- 取得されたデータはグローバルオブジェクト `$post` に格納される -->
<?php if (have_posts()): while(have_posts()): the_post(); ?>
<li>
<!-- the_permalink() で投稿詳細ページへのリンクを生成。 -->
    <a href="<?php the_permalink(); ?>">
    <!-- get_the_date() と the_title() で日付とタイトルを取得。 -->
        <time datetime="<?php echo get_the_date('Y-m-d'); ?>"><?php echo get_the_date(); ?></time>
        <h3><?php the_title(); ?></h3>
    </a>
</li>
<?php endwhile; endif; ?>
</ul>
<!-- グローバルオブジェクト `$post` をリセット -->
<php wp_reset_postdata>


ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ


<!-- {information} の部分は、カスタム投稿タイプのスラッグ名にする。
{} の部分は固定ではなく、登録したカスタム投稿タイプのスラッグ名に応じて変更すること-->
<!-- ポストタイプがinformationの個別専用の詳細ページ（singleテンプレート） -->
single-{information}.phpに記述
get_header() と get_footer():

<!-- サイト全体のヘッダーおよびフッターをテンプレートに読み込みます。 -->
<?php get_header(); ?>
<!-- have_posts() と the_post():現在の投稿が存在するかを確認し、該当する投稿データを取得します。 -->
<?php if (have_posts()): the_post(); ?>
<main>
    <section>
    <!-- the_title():現在の投稿のタイトルを表示します。この場合、「お知らせ」の文字列が追加されています。 -->
        <h1><?php the_title(); ?>（お知らせ）</h1>
        <div class="contents">
        <!-- the_content():投稿の本文を表示します。 -->
            <?php the_content(); ?>
        </div>
    </section>
</main>
<?php endif; ?>
<?php get_footer(); ?>



【コードストック用】functions.php
ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ

add_action('init', 'registerCustomPost');
function registerCustomPost() {
    $labels = array(
        'name' => '新着情報',
        'singular_name' => 'information'
    );
    $args = array(
        'labels' => $labels,
        'public' => true,
        'exclude_from_search' => true,
        'query_var' => true,
        'rewrite' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'menu_position' => 4,
        'supports' => array('title', 'editor', 'thumbnail', 'revisions'),
    );
    register_post_type('information', $args);
}


【コードストック用】front-page.php
ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ


$args = array(
    'post_type' => 'information',
    'posts_per_page' => 3
);
$information_query = new WP_Query($args);
?>
<ul>
<?php if (have_posts()): while(have_posts()): the_post(); ?>
<li>
    <a href="<?php the_permalink(); ?>">
        <time datetime="<?php echo get_the_date('Y-m-d'); ?>"><?php echo get_the_date(); ?></time>
        <h3><?php the_title(); ?></h3>
    </a>
</li>
<?php endwhile; endif; ?>
</ul>


【コードストック用】single-{information}.php
ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ


<?php get_header(); ?>

<?php if (have_posts()): the_post(); ?>
<main>
    <section>
        <h1><?php the_title(); ?>（お知らせ）</h1>
        <div class="contents">
            <?php the_content(); ?>
        </div>
    </section>
</main>
<?php endif; ?>

<?php get_footer(); ?>



WordPress Codex の register_post_type() 公式リファレンス
https://developer.wordpress.org/reference/functions/register_post_type/


ワードプレスで投稿の種類を増やす！カスタム投稿（custom-post）を設定・表示させる方法と、詳細ページを作る方法！
https://www.youtube.com/watch?v=rJ2cJTp3G-Y