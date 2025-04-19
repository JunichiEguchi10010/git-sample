WordPress カテゴリーページについて 20250418


カテゴリーページとは、WordPressなどのブログやCMS（コンテンツ管理システム）において、特定のカテゴリーに属する記事だけを一覧表示するためのページのことです。
category.php は WordPress のテンプレート階層において、
ある特定のカテゴリーアーカイブ（例：/category/news）が表示されたときに使われるテンプレートです。

つまり、
📌 category.php は「単一カテゴリーの一覧ページ用テンプレート」
👉 なので、1ページに複数のカテゴリやカスタムタクソノミーを混在表示したいときには向きません。


1. category.php の基本的な役割
カテゴリーページのデフォルトテンプレートとして動作します。

例: https://example.com/category/javascript/ のように、特定のカテゴリーの投稿一覧を表示します。

特定のカテゴリーだけでなく、すべてのカテゴリーページに対応します。

2. スラッグごとのカスタマイズが可能
特定のカテゴリー専用のテンプレートを作りたい場合は、category-{slug}.php（例えば、category-javascript.php）を作成します。

この場合、「javascript」というスラッグのカテゴリーだけに適用されます。

他のカテゴリーには引き続き category.php が使用されます。


3. テンプレート階層
WordPress にはテンプレート階層という仕組みがあり、category.php は以下のように優先的に使用されます：

category-{slug}.php （スラッグ固有のテンプレート）
↓
category-{id}.php （カテゴリーID固有のテンプレート）
↓
category.php （全カテゴリー共通のテンプレート）
↓
archive.php （アーカイブページ全体のテンプレート）
↓
index.php （最後の汎用テンプレート）


4. 特定スラッグでの挙動
特定のスラッグを処理する場合には、テンプレートファイルを作成するか、category.php 内で条件分岐を使用してカスタマイズすることができます。

例: スラッグが "javascript" の場合、異なる出力をするコードを追加する。

php
<?php if (is_category('javascript')): ?>
    <h1>JavaScript カテゴリー</h1>
<?php else: ?>
    <h1><?php single_cat_title(); ?></h1>
<?php endif; ?>


【URLについて】
WordPressでは、テンプレートファイルの名前（例: category-{slug}.php）とURL（例: https://example.com/category/javascript/）は直接リンクしません。

具体的なポイント
テンプレートファイル名:
テンプレートファイル名は、WordPressのテンプレート階層に基づいて適切なテンプレートを選ぶためのものです。

例えば、category-javascript.php は、「javascript」というスラッグのカテゴリー専用テンプレートとして機能します。

URL構造:
URLはWordPressのタクソノミー構造に基づいて生成されます。

上記の場合、URLは https://example.com/category/javascript/ になりますが、このURLはテンプレートファイル名とは独立して動作します。

リンクを作成する場合の注意:

category-{slug}.php のファイル名は、あくまでテンプレートの表示ロジックを制御するものであり、URL構造を変更する場合はリライトルールを設定するなど別途対応が必要です。

URLはカテゴリースラッグに基づいて生成され、テンプレートファイル名はそのURLに対応する表示方法を決定するためのものです。


まどろっこしいことが嫌いな人はこれを見ましょう的なやつ【get_categories, get_category_link, the_archive_title, single_cat_title】
https://www.youtube.com/watch?v=3nw2JpA3h9c

WordPressで特定のカテゴリー一覧までのリンクを取得する【get_category_by_slug, get_category_link】
https://www.youtube.com/watch?v=IyjZlfyuC5I&t=1s

WordPressでcategory.phpを使ってカテゴリーページを作る【the_archive_title】
https://www.youtube.com/watch?v=xL8g40uMkpA

WordPressで特定のタグ一覧までのリンクを取得する方法【get_term_by, get_tag_link】
https://www.youtube.com/watch?v=BanH6pkXyJw

WordPressでtag.phpを使ってタグページを作る方法【the_archive_title】
https://www.youtube.com/watch?v=uy-YanrH2Rc