WordPress テンプレートで投稿を取得して表示するためのループ処理の基本　20250417


<?php if(have_posts()):
         while(have_posts()):
               the_post();
?>
<?php endwhile;
      else:
?>
<?php endif; ?>


<?php if(have_posts()): ?>
投稿データが存在するか（have_posts()がtrueであるか）を確認します。この条件が満たされる場合にのみ、以下の処理が実行されます。

while(have_posts()):
条件が満たされている間、つまり投稿データがある間、このループを実行します。

the_post();
現在のループ内で「次の投稿データ」を取得し、テンプレートタグ（例えば the_title() や the_content()）がその投稿データを参照し、テンプレート内で使用できるようにします。
投稿のタイトル、本文、カスタムフィールドなど、投稿ごとの情報を表示する際に必要な関数です。




【全体の流れ】
if(have_posts()): 投稿が存在するかどうかを確認。
while(have_posts()): 投稿をすべて取得するまでループ処理を続ける。
the_post(): ループ内で現在の投稿データを取得し、テンプレートタグで使用可能にする。

投稿ごとにタイトルと本文が表示される例

<?php if(have_posts()): ?>
    <?php while(have_posts()): the_post(); ?>
        <h2><?php the_title(); ?></h2>
        <p><?php the_content(); ?></p>
    <?php endwhile; ?>
<?php endif; ?>