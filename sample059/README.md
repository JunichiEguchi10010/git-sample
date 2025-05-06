
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