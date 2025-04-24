WordPressのsingle_post_title()とget_the_title()について 20250424


はどちらも投稿のタイトルを取得する関数ですが、それぞれ以下のような違い･使い方･注意点があります。

🔹 1. 基本的な違い
関数名	                    タイプ	                    戻り値	                        用途
get_the_title()	            関数	                   値を返す（return）	        投稿のタイトルを取得する（出力しない）
single_post_title()	        テンプレートタグ	        値を出力（echo）	         シングル投稿ページのタイトルを表示する


🔹 2. それぞれの使い方
get_the_title()

$title = get_the_title(); // 現在の投稿タイトルを取得
echo $title; // $titleを表示 

引数を使えば、任意の投稿IDのタイトルも取得可能：
echo get_the_title(123); // IDが123の投稿タイトル


single_post_title()

single_post_title(); // シングル投稿ページでタイトルを表示（出力）

オプションで前に文字列を追加：
single_post_title('タイトル：');


🔹 3. よくある勘違い・注意点
❗ get_the_title() は ループ外で使うと注意が必要
ループ外で使用すると、グローバル$postが正しくセットされていないと意図しない結果になることがあります。

対策：
global $post;
echo get_the_title($post->ID);
❗ single_post_title() は シングルページ以外では空を返す
カテゴリーページやアーカイブページでは意味がありません。is_single() で条件分岐するのがベター。

🔹 4. 使いどころまとめ
使いたい場面	                                        使う関数                    	理由
投稿のタイトルを変数に入れたい	                          get_the_title()	            値を返してくれるから
テンプレートでそのままタイトルを表示したい	               single_post_title()	         echo付きで出力してくれるから
投稿IDを指定してタイトルを取得したい	                  get_the_title( $id )	        任意ID指定ができる

🔹 5. 補足：似た関数との混同に注意！
the_title() → ループ内で使うテンプレートタグ（get_the_title()のecho版）
single_post_title() → ページタイトル用（ブラウザのタイトルバーに出すようなとき）

✅ よくある落とし穴まとめ
get_the_title() をループ外で使って「タイトルが表示されない」→ $postがセットされてない

single_post_title() をカテゴリページなどで使って「なにも表示されない」→ is_single()じゃないと機能しない



🔹 そもそも「テンプレートタグ」って何？
✅ 定義
テンプレートタグとは「WordPressのテーマ内で使う、便利な関数（ショートカット）」のことです。
つまり実態は「PHP関数」なんですが、主にテーマファイル（single.phpやheader.phpなど）で、表示用として使うことを前提に作られた関数群のことを「テンプレートタグ」と呼びます。

🔍 関数とテンプレートタグの技術的な違い
比較項目	                    関数 (get_the_title()など)	                 テンプレートタグ (the_title()など)
正体	                        PHP関数	                                    PHP関数
戻り値	                        返す（return）	                             直接表示（echo）
主な用途	                    値の取得・ロジック処理	                      HTMLテンプレートに値を直接出力
出力方法	                    自分でechoが必要	                         呼び出したら自動でechoしてくれる
カスタマイズの柔軟性	         高い（値を加工できる）	                       加工するにはフィルターや一度値取得が必要
用途の例	                    コントローラー的な役割（裏方）                ビュー的な役割（表示）

🔧 原理をもう少し掘り下げる（コード例）
✅ get_the_title() の中身（イメージ）

function get_the_title($post_id = 0) {
    $post = get_post($post_id);
    if ($post) {
        return apply_filters('the_title', $post->post_title);
    }
    return '';
}
👉 「タイトルを取得して返すだけ」
👉 フィルターを通してカスタマイズもできる

✅ the_title() の中身（イメージ）

function the_title($before = '', $after = '', $echo = true) {
    $title = get_the_title();
    $title = $before . $title . $after;
    if ($echo)
        echo $title;
    else
        return $title;
}
👉 get_the_title()を使って値を取得してから、echoで出力しているだけ

結局 🔁 多くのテンプレートタグは、get_○○() のラッパー（出力用のecho付き関数）になっているだけ

💡 使い分けのポイント

こうしたいとき	                            使うもの
タイトルを加工・変数に代入したい	        get_the_title()
単純にテンプレート内で表示したい	        the_title()
条件によって出力を制御したい	            get_the_title()＋if文
表示のラップを簡単にしたい	                the_title('<h1>', '</h1>')

🧠 補足：WordPressのMVC的な使い分け
WordPressは厳密にはMVCじゃないですが、構造的に見ると…
Model（データ取得） → get_○○() 系
View（表示） → the_○○() 系（テンプレートタグ）
Controller（条件分岐など） → is_○○() などの条件関数


📝 まとめ
テンプレートタグは「出力するための関数」

関数（get_～()）は「値を返す」ための裏方

テンプレートタグは関数のラッパーであることが多い

表示に使うか、処理に使うかで使い分けること！