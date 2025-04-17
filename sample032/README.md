WordPress 特定のカテゴリーの一覧までのリンクを取得する方法
【get_category_by_slug, get_category_link】20250417

💡 どんなときに使う？
例えば：

投稿ページの下に「この投稿が属しているカテゴリの一覧ページはこちら」とリンクを出したいとき。

特定カテゴリ（この場合 "javascript"）への誘導リンクを固定で表示したいとき。

テーマやカスタムテンプレートファイルで特定のカテゴリページへのリンクを組み込みたいとき。

php
$cat = get_category_by_slug("javascript");
スラッグ（"javascript"）を使って､WordPressのカテゴリ｢category タクソノミー（分類）｣情報を取得しています。
返されるのはカテゴリオブジェクトです。この例では「javascript」というスラッグを持つカテゴリを探しています。

php
$cat_id = $cat->term_id;
先ほど取得したカテゴリオブジェクト（$cat）から､そのID（term_id）だけを取り出して、$cat_idに代入しています。
このIDはリンク取得などに使うために必要です。

php
$cat_link = get_category_link($cat_id);
カテゴリID（$cat_id）を使って、そのカテゴリページのURLを取得しています。get_category_link() 関数は､
指定したカテゴリIDのアーカイブページのリンクを返します。



✅ タクソノミーのリンクを扱う場合の基本ルール：

ケース	                        推奨される関数
カテゴリー（category）	        get_category_by_slug()（専用関数）
タグ（post_tag）	            get_term_by()（汎用関数）
カスタムタクソノミー	         get_term_by()（唯一の選択肢）

🔍 解説
✅ get_category_by_slug() は カテゴリー専用のショートカット関数
実際は内部的に get_term_by('slug', $slug, 'category') を使っています。

つまり「get_term_by() の category 用ラッパー」です。

カテゴリーだけ使うなら、可読性も高くて簡潔なので人気。

✅ get_term_by() は すべてのタクソノミーに使える汎用関数
category も post_tag も カスタムタクソノミー も全部対応。

フレキシブルに使いたいならこちらが便利。

🧩 結論（どちらを使うのが普通？）
使い方	理由
get_category_by_slug() を使う	カテゴリー専用のときは、簡潔・読みやすいので多くの人が使います。
get_term_by() を使う	タクソノミーを意識的に扱いたいとき、またはタグやカスタム分類に対応するなら必須です。


【カスタムタクソノミーを作成する際の階層構造について】
WordPressではカスタムタクソノミーを作成する際に、
階層構造を「あり／なし」どちらでも設定できます。

🔍 カスタムタクソノミーの階層構造は hierarchical オプションで決まります
php
register_taxonomy(
    'custom_tax',
    'post',
    array(
        'label' => 'カスタム分類',
        'hierarchical' => true, // ← これが「階層構造を持つかどうか」の設定
    )
);
🟢 hierarchical => true
カテゴリーのような 親子構造あり

管理画面でもツリー表示される

UIがカテゴリーと似る

🔵 hierarchical => false
タグのような フラット構造

入力はカンマ区切り

UIがタグと似る

✅ つまり結論はこう：

タクソノミー	        階層構造	        UIの特徴
category	            あり	        チェックボックス式
post_tag	            なし	        カンマ区切り入力
カスタムタクソノミー	  自由	          hierarchical で決まる
🧩 例：階層構造ありのカスタムタクソノミー

php
register_taxonomy(
    'genre',
    'post',
    array(
        'label' => 'ジャンル',
        'hierarchical' => true, // 親子構造を持たせる
        'public' => true,
        'rewrite' => array('slug' => 'genre'),
        'show_ui' => true,
        'show_in_rest' => true,
    )
);
🧩 例：階層構造なしのカスタムタクソノミー
php
register_taxonomy(
    'area',
    'post',
    array(
        'label' => 'エリア',
        'hierarchical' => false, // フラット構造
        'public' => true,
        'rewrite' => array('slug' => 'area'),
        'show_ui' => true,
        'show_in_rest' => true,
    )
);

✅ まとめ
post_tag のように「階層なし」も可能だし

category のように「階層あり」も可能

カスタムタクソノミーはその両方を設定可能




WordPress の post_tag（タグ）は 階層構造がない＝フラット構造 ですが、それでも内部的には「ターム（term）」として管理されており、ちゃんとタームIDを持っています。

✅ 結論：
タグ（post_tag）も「タクソノミーの一種」なので、他のタクソノミーと同じように「タームID」で管理されます。

🔍 詳しく解説
WordPressの「分類（タクソノミー）」は、すべて term という単位で登録されます。

タグ（post_tag）もその1つなので、データベースの構造としては他と同じ扱いです。

💡 たとえば…
php
コピーする
編集する
$tag = get_term_by('slug', 'my-tag', 'post_tag');
$tag_id = $tag->term_id;
この $tag_id は、**「タームID（term_id）」**であり、カテゴリーでもタグでもカスタムタクソノミーでも共通のIDの持ち方です。

❓「じゃあ階層構造ってどこで違うの？」というと…
terms テーブルには「階層構造」を示す parent というカラムがあります。

タグ（post_tag）は常に parent = 0 なので階層がない扱いになります。

カテゴリー（category）や hierarchical => true のカスタムタクソノミーは parent を使って親子関係を持てます。

✅ まとめ

分類名	階層構造	term_id（タームID）	備考
category	あり	あり	get_category_by_slug() などが使える
post_tag	なし	あり	get_term_by() で取得
カスタム分類	設定可能	あり	hierarchical で切替可能