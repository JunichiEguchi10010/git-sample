
WordPress get_template_part()関数について　20250506

WordPressのget_template_part()関数は、テンプレートファイルの一部を再利用するための関数です。
例えば、ヘッダーやフッターのような共通部分を別ファイルとして管理し、必要な場所で呼び出すことができます。

get_template_part()の基本構文
php
get_template_part( $slug, $name );
$slug: 第一引数： 読み込むテンプレートの基本ファイル名（必須）

$name: 第一引数： 特定のテンプレート名（省略可）

例えば、content.phpというテンプレートを読み込む場合:
php
get_template_part( 'content' );

content-single.phpというファイルを読み込みたい場合:
php
get_template_part( 'content', 'single' );
この場合、WordPressはcontent-single.phpを探し、存在しない場合はcontent.phpを読み込みます。

使い方の例
例えば、投稿ページで異なるレイアウトを適用したい場合:

php
get_template_part( 'template-parts/post/content', get_post_format() );
このコードでは、投稿フォーマットに応じてcontent-image.phpやcontent-video.phpなどを動的に読み込むことができます。

get_template_part()のメリット
コードの再利用: 同じコードを複数のテンプレートで使い回せる。

管理のしやすさ: テンプレートファイルを整理し、構造を明確にできる。
子テーマとの互換性: 親テーマのテンプレートを子テーマで簡単に上書きできる。
例えば、親テーマでは sec.php を提供し、子テーマでは sec-service.php を追加することで、子テーマ専用のデザインを適用できます。


get_template_part('template-parts/post/content', get_post_format()) 
WordPressのテンプレート階層を活用して、投稿のフォーマットに応じたテンプレートパーツを動的に読み込むための関数です。

1. 構造の意味
php
get_template_part('template-parts/post/content', get_post_format());
このコードは、以下の動作をします：

get_template_part('template-parts/post/content', get_post_format()) を実行

get_post_format() は、投稿のフォーマットを取得する関数

get_post_format() の返り値は、例えば 'video', 'gallery', 'image', 'quote' など
WordPressは次のテンプレートファイルを探す：

template-parts/post/content-video.php（投稿フォーマットが video の場合）

template-parts/post/content-gallery.php（投稿フォーマットが gallery の場合）

template-parts/post/content.php（フォーマットの個別ファイルがなければ、汎用テンプレートを使用）

2. 具体的な使い方
この方法を使うと、投稿の種類に応じて異なるテンプレートを適用できます。

例えば、投稿フォーマットが video の場合：
php
get_template_part('template-parts/post/content', 'video');
→ template-parts/post/content-video.php を読み込む

投稿フォーマットが image の場合：
php
get_template_part('template-parts/post/content', 'image');
→ template-parts/post/content-image.php を読み込む

もし content-video.php や content-image.php が存在しない場合は、デフォルトの content.php を使用します。

3. メリット
コードの再利用：異なる投稿フォーマットごとにテンプレートを作成し、一つの関数で呼び出せる。

柔軟なカスタマイズ：動画投稿なら専用の表示形式、画像投稿なら画像専用レイアウトなど、細かく分けられる。

管理が楽になる：テンプレート階層に従うことで、テーマの整理がしやすくなる。

4. 補足
WordPressのテーマ内で投稿フォーマットを利用する場合、add_theme_support('post-formats', array('video', 'gallery', 'quote')) のように functions.php で設定しておく必要があります。