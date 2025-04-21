WordPress　タグアーカイブページのタイトルをカスタマイズ　202350421


【functions.phpに記述する】
<?php
<!-- theme_setup という関数を定義しています。この関数はテーマのセットアップ用で、特定の機能を追加するために使用されます。 -->
function theme_setup(){
<!-- WordPressテーマに「投稿のサムネイル（アイキャッチ画像）」をサポートする機能を追加します。これにより、投稿ごとにサムネイル画像を設定できるようになります。 -->
    add_theme_support("post-thumbnails");
}
<!-- after_setup_theme フックを使用して、テーマがセットアップされた後に theme_setup 関数を実行するように登録します。 -->
add_action("after_setup_theme", "theme_setup");

<!-- アーカイブページのタイトルをカスタマイズする関数 my_archive を定義しています。 -->
function my_archive($title){
<!-- 現在表示されているページがタグアーカイブページかどうかを確認します。この条件が満たされた場合にのみ、以下の処理が実行されます。 -->
    if(is_tag()){
<!-- タグのタイトルを取得し、前に「タグ: 」という文字列を追加しています。false を指定することでHTMLタグを含まない形式で出力します。 -->
        $title = single_tag_title("タグ: ", false);
<!-- 加工されたタイトルを返します。この値が後で表示されます。 -->
        return $title;
    }
}
 <!-- get_the_archive_title フィルターフックに my_archive 関数を登録し、アーカイブタイトルをカスタマイズします。 -->
add_filter("get_the_archive_title", "my_archive");
?>



【テーマファイル内の テンプレートファイル（例えば、archive.php や tag.php、category.php など）に記述し動的にコンテンツを表示する。】<!-- get_tags() 関数を使用して、すべてのタグ情報を取得し、変数 $tags に代入します。 -->
$tags = get_tags();
% ＄tagsの配列内の各タグをループし、順番に処理します。タグを使った操作が可能になります。
<?php foreach($tags as $tag): ?>
<!-- esc_url() を使用して安全なURLを生成し、get_tag_link() 関数でタグアーカイブページへのリンクを作成します。 -->
  <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>">
<!-- タグ名を表示します。このタグ名はリンクテキストとして使用されます。 -->
    <?php echo $tag->name ?>
  </a>
<?php endforeach; ?>
<div class="cards">
<!-- have_posts() 関数を使用して、投稿が存在するかどうかを確認します。投稿が存在する場合に以下の処理を実行します。 -->
  <?php if(have_posts()): ?>
  <!-- 投稿が存在する限りループを実行します。このループでは各投稿の内容を処理することができます。 -->
    <?php while(have_posts()): the_post(); ?>
    <?php endwhile; ?>
  <?php endif; ?>
</div>

このコードはタグリンクの表示やアーカイブページのタイトルカスタマイズに役立ちます。


【以下スニペット】
<!-- function.php用 -->
<?php
function theme_setup(){
    add_theme_support("post-thumbnails");
}
add_action("after_setup_theme", "theme_setup");

function my_archive($title){
    if(is_tag()){
        $title = single_tag_title("タグ: ", false);
        return $title;
    }
}
add_filter("get_the_archive_title", "my_archive");
?>

<!-- テンプレート用 -->
$tags = get_tags();

<?php foreach($tags as $tag): ?>
  <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>">
    <?php echo $tag->name ?>
  </a>
<?php endforeach; ?>
<div class="cards">
  <?php if(have_posts()): ?>
    <?php while(have_posts()): the_post(); ?>
    <?php endwhile; ?>
  <?php endif; ?>
</div>




タグ機能を1回の動画で見終わりたい方向けのやつ【get_tags, get_tag_link, single_tag_title, the_archive_title】
https://www.youtube.com/watch?v=EtFrPa-0Wz4&t=602s

WordPressでtag.phpを使ってタグページを作る方法【the_archive_title】
https://www.youtube.com/watch?v=uy-YanrH2Rc


WPテーマ開発㉞tag.phpにタイトルを表示する【is_tag, the_archive_title】
https://www.youtube.com/watch?v=SdGZ0hC3rHI