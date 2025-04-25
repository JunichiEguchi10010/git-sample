WordPress カスタム投稿タイプを設定･表示･詳細ページを作る方法 20250425

functions.phpにコードを記述してカスタム投稿タイプ（例：お知らせ）を作成し、
それをトップページに表示させ、さらに専用の詳細ページ（singleテンプレート）も作るという一連の流れの説明です。

📌 主な手順
① カスタム投稿「お知らせ」の追加
functions.php に register_post_type() を用いて information（お知らせ）というカスタム投稿タイプを定義。
labels, public, has_archive, supports（title, editor, thumbnail など）も指定。
注意点：スラッグ名や配列構造は正確に記述。

functions.phpに記述
add_action('init', 'registerCustomPost');
<!-- WordPress初期化時にカスタム投稿タイプを登録するアクションを追加します。 -->
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

コードストック用
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








WordPress Codex の register_post_type() 公式リファレンス
https://developer.wordpress.org/reference/functions/register_post_type/


ワードプレスで投稿の種類を増やす！カスタム投稿（custom-post）を設定・表示させる方法と、詳細ページを作る方法！
https://www.youtube.com/watch?v=rJ2cJTp3G-Y