WordPress カスタム投稿タイプ（例：お知らせ）用の個別ページ（single.phpページ）を作る方法　20250421
(single.php をカスタム投稿に対応させて表示をカスタマイズする手順)


🛠 作業の流れ・ポイント
1. カスタム投稿「お知らせ（スラッグ：news）」を作成済み
カテゴリーも設定済み（例：サービス、採用情報）
投稿記事も2件ほど登録済み
投稿には「タイトル」「本文」「カテゴリー」などを入力している状態

2. 個別投稿ページのテンプレート選択
WordPressは single-{post_type}.php を優先的に探す
例：カスタム投稿「news」用のテンプレートは single-news.php
なければ single.php を使う

3. テンプレートを分けて表示を変える
single.php をコピーして single-news.php を作成
例えばタイトルに「お知らせ：」という文字列を付けて表示するなど、個別にカスタマイズ可能

4. タイトルの表示方法
基本は the_title()（= <?php the_title(); ?>）でOK
書籍などでは echo get_post()->post_title; と記述している例もある
これは get_post() が投稿全体の情報（オブジェクト）を取得し、その中の post_title プロパティを出力している
結果は the_title() と同じなので、好みや文脈に応じて使い分ければOK

5. get_post()の中身を確認する方法
var_dump(get_post()); で投稿情報の中身（オブジェクト）を確認できる
例：post_title, post_content, post_date などが含まれている

💡 補足・ポイント
single-news.php を使えば、通常の投稿とカスタム投稿で見た目や構造を分けて管理できる
get_post() を使った取得方法は柔軟性があるが、初心者は the_title() などテンプレートタグを使えばOK
WordPressではテンプレート階層を活用することで、柔軟な表示切り替えが可能

その他
4. タイトルの表示方法の同じ出力となる理由>結論どちらでもOK
<h2>お知らせ名: <?php the_title(); ?></h2>
<h2>お知らせ名: <?php echo get_post()->post_title; ?></h2>

解説
the_title()関数:
WordPressのテンプレートタグで、現在の投稿のタイトルを直接出力します。
シンプルで使いやすく、特定の投稿のタイトルを表示する際に便利です。

get_post()->post_titleプロパティ:
get_post()関数を使用して現在の投稿オブジェクトを取得し、その中のpost_titleプロパティを参照しています。
echoを使ってタイトルを出力します。

同じ出力になる理由
両方のコードは、最終的に現在の投稿のタイトルを取得して表示するため、結果は同じになります。違いは以下の通りです：
the_title()はWordPressが提供するテンプレートタグで、内部的にget_post()->post_titleを参照しているため、簡潔に記述できます。

get_post()->post_titleは直接オブジェクトのプロパティを参照する方法で、より低レベルな操作が可能ですが、冗長に感じる場合があります。

どちらを使うかは、コードの可読性や目的に応じて選択すると良いでしょう。




WordPressのカスタム投稿でsingle.phpページを作る【get_post, post_title】
https://www.youtube.com/watch?v=MqJfFbUXoXQ


WordPressでカスタム投稿の一覧ページを作成する方法【get_post, post_type, get_post_type_archive_link】
https://www.youtube.com/watch?v=wq3ryTG-9dQ


WordPressでカスタム投稿のカテゴリー一覧を作成する方法【post_type, taxonomy, the_terms, get_post_ID】ht
tps://www.youtube.com/watch?v=geQVOAjjFaM