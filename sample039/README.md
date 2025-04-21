WordPress カスタム投稿でsingle.phpページを作成する方法について 20250421


カスタム投稿の概要:
single.phpテンプレートを使用して、カスタム投稿の個別ページを作成する。

具体的な手順:
single.phpファイルをコピーしてカスタム投稿専用のテンプレートを作成。
投稿タイプのスラッグに基づいてファイル名を変更（例: single-news.php）。


【同じ出力となる】>結論どちらでもOK
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