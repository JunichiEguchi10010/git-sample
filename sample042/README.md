WordPress　テーマ開発において、カスタムメニューの中身をプログラムで取得・確認する方法 20250422


メニューの基本表示の復習
wp_nav_menu() を使えば、基本的なメニュー表示はできる。

それだけでもサイトとしては機能するが、カスタマイズや複雑な処理をしたい場合は中身を深掘りする必要がある。

get_nav_menu_locations()
すべてのメニューロケーション（例：header, footer）と、それに紐づくメニューIDの一覧が配列で取得できる。

例：
php
$locations = get_nav_menu_locations();
print_r($locations);
結果は連想配列で、'header-nav' => 2 のように、ロケーション名とそのIDが紐づいて返ってくる。


wp_get_nav_menu_items() の使い方
メニューIDを指定すると、そのメニューの中にある各項目（メニュー項目）の詳細を配列で取得できる。

例：
php
$menu_items = wp_get_nav_menu_items(2);
print_r($menu_items);
結果は WP_Post オブジェクトの配列で、各メニュー項目の以下のような情報が含まれている：

タイトル
URL
投稿タイプ（post, page など）
スラッグ
ID（各メニュー項目にもIDが付与されている）

IDをハードコードしない工夫
(ソフトウェアのソースコード内にデータや設定値を直接書き込むことを指します。 APIキーやデータベースの接続情報、設定ファイルのパスなどがこれに該当します)
メニューID（例：2や3）は環境やタイミングで変わるので、ロケーション名から取得するのが安全。

php
$locations = get_nav_menu_locations();
$menu_id = $locations['header-nav']; // ヘッダー用のメニューID
$menu_items = wp_get_nav_menu_items($menu_id);

■ ポイントまとめ
メニューは get_nav_menu_locations() でロケーションとIDを取得。
wp_get_nav_menu_items() でメニューの中身（各項目の情報）を取得。
メニューIDは環境によって変わるため、ロケーション名を使って動的に取得するのがベストプラクティス。

関数名                      	    本番用	            よく使うシーン
get_nav_menu_locations()	        ✅	            メニューの位置を取得
wp_get_nav_menu_items()	            ✅	            メニュー項目を取得
print_r() + wp_die()	            ❌              	開発・デバッグ中だけ使用

get_nav_menu_locations() + wp_get_nav_menu_items() の基本テンプレ
php
コピーする
編集する
<?php
$locations = get_nav_menu_locations();
$menu_id = $locations['header_nav']; // テーマ側で 'header_nav' に登録されているメニュー
$menu_items = wp_get_nav_menu_items($menu_id);
?>
🧪 実践例①：カスタムHTMLでグローバルメニューを出力
php
コピーする
編集する
<?php
$locations = get_nav_menu_locations();
$menu_id = $locations['header_nav'];
$menu_items = wp_get_nav_menu_items($menu_id);

if (!empty($menu_items)) {
    echo '<nav><ul class="custom-nav">';
    foreach ($menu_items as $item) {
        echo '<li><a href="' . esc_url($item->url) . '">' . esc_html($item->title) . '</a></li>';
    }
    echo '</ul></nav>';
}
?>


🔍 こんなとき使う：
wp_nav_menu() だと HTML構造が合わないとき
Tailwindや独自クラスで柔軟に出力したいとき

🧪 実践例②：フッターにカテゴリ分けしてリンク表示
php
<?php
$locations = get_nav_menu_locations();
$menu_id = $locations['footer_links'];
$menu_items = wp_get_nav_menu_items($menu_id);

// 親要素ごとにグループ化（例：About, Services, Support）
$grouped = [];

foreach ($menu_items as $item) {
    if ($item->menu_item_parent == 0) {
        $grouped[$item->ID] = [
            'parent' => $item,
            'children' => []
        ];
    } else {
        $grouped[$item->menu_item_parent]['children'][] = $item;
    }
}

// 表示
echo '<div class="footer-links">';
foreach ($grouped as $group) {
    echo '<div class="footer-group">';
    echo '<h4>' . esc_html($group['parent']->title) . '</h4>';
    echo '<ul>';
    foreach ($group['children'] as $child) {
        echo '<li><a href="' . esc_url($child->url) . '">' . esc_html($child->title) . '</a></li>';
    }
    echo '</ul></div>';
}
echo '</div>';
?>

🔍 こんなとき使う：
WordPressの「多階層メニュー機能」を使ってカテゴリ分けしたリンクを管理したいとき
管理画面から自由に項目追加したいとき

🧪 実践例③：特定メニュー項目のURLやIDを取得してロジックに使う
php
<?php
$locations = get_nav_menu_locations();
$menu_id = $locations['header_nav'];
$menu_items = wp_get_nav_menu_items($menu_id);

// 例：特定のタイトルのメニューが存在するか確認
foreach ($menu_items as $item) {
    if ($item->title === 'お問い合わせ') {
        $contact_url = $item->url;
        break;
    }
}

// あればボタンで表示
if (!empty($contact_url)) {
    echo '<a class="btn" href="' . esc_url($contact_url) . '">お問い合わせはこちら</a>';
}
?>

🔍 こんなとき使う：
お問い合わせメニューのリンクを個別ページに再利用したいとき
メニューでリンクを動的に管理したいとき

✅ まとめ（ストック用）
実用シーン                  	                    説明
カスタムHTMLでメニュー出力	                wp_nav_menu()を使わず柔軟に出力
階層付きメニューを制御	                    親子メニューでカテゴリ分け
特定のメニュー項目を検索	                例：お問い合わせボタンのURL取得



wp_nav_menu() と get_nav_menu_locations()  /　wp_get_nav_menu_items() の違い

✅ 【結論】先にざっくりまとめ
項目	                                    wp_nav_menu()	                         wp_get_nav_menu_items()
✅ 簡単に使えるか	                    ◎（一行で出力）	                          △（ループ処理が必要）
🎨 HTMLカスタマイズ自由度	             △（walkerなどが必要）	                   ◎（自由自在に書ける）
🧠 ロジックの組み込み（条件分岐等）    　　△（難しい）	                            ◎（柔軟に制御できる）
🪜 多階層メニュー対応	                   ◎（自動で出力）                        　 ◯（自前で処理必要）
🛠️ メンテナンス性	                      ◎（標準テンプレート向き）             	 △（コード量が多い）
🤖 実用例	                            通常のナビゲーション表示	                自作のメガメニュー・リンクボックス・動的UI


🧩 wp_nav_menu() の基本（簡単お手軽）
php
<?php
wp_nav_menu([
  'theme_location' => 'header_nav',
  'menu_class' => 'global-nav',
  'container' => false,
]);
?>
✅ メリット
簡単！1行でOK

WordPressの「メニュー管理」と連携してる
階層構造やクラスも自動でつく

❌ デメリット
HTML構造が固定（ul/li構造）
複雑なカスタマイズは Walker_Nav_Menu を書く必要あり（ハードル高め）


🧩 wp_get_nav_menu_items() の基本（柔軟に出したいとき）
php
<?php
$locations = get_nav_menu_locations();
$menu_id = $locations['header_nav'];
$items = wp_get_nav_menu_items($menu_id);

echo '<nav><ul>';
foreach ($items as $item) {
  echo '<li><a href="' . esc_url($item->url) . '">' . esc_html($item->title) . '</a></li>';
}
echo '</ul></nav>';
?>
✅ メリット
完全に自由なHTML構造を作れる（例：divで出力、SVGアイコン挿入、Tailwindなど）
メニューの中身をループで処理できるので、ロジックも書きやすい
メニュー項目ごとのカスタムフィールド（ACF等）も読みやすい

❌ デメリット
自分でループを書かなければいけない
多階層メニューを扱うには、親子関係のID管理が必要（やや複雑）


🧪 ユースケース別 使い分けまとめ
ユースケース	                                                推奨関数	                                解説
一般的なナビゲーションを出力したい	                            wp_nav_menu()	                    サイト制作で8割以上はこれでOK
メガメニューやグリッド表示など複雑なHTML構造を使いたい	          wp_get_nav_menu_items()        　　 自分で出力することで自由に作れる
カスタムフィールド（ACF）を使ったメニュー項目の拡張表示	          wp_get_nav_menu_items()          　　ACF付きメニューや条件付き表示などに便利
サイトフッターにカテゴリ分けリンクを表示	                    wp_get_nav_menu_items()	            親子構造を自分で管理できるから便利
時短したい、構造はそこまでこだわらない	                        wp_nav_menu()	                    WordPressの自動出力に任せる

📝補足：Walker_Nav_Menu でカスタマイズする方法もあるけどハードル高い
php
class My_Custom_Walker extends Walker_Nav_Menu {
    // start_el(), start_lvl() を上書きして出力HTMLを制御
}
ただしこれは初心者にはハードルが高く、wp_get_nav_menu_items() で書いた方がわかりやすい場合が多いです。

🎁まとめ
時短重視・シンプル構成 → wp_nav_menu()
自由度・条件分岐・ACF連携 → wp_get_nav_menu_items()


WPテーマ開発⑬メニュー配列の中身を確認しよう【get_nav_menu_locations,wp_get_nav_menu_items】
https://www.youtube.com/watch?v=cEyX8FGLuQY