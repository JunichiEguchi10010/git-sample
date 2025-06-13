Vanilla JavaScript + CSS で作る レスポンシブ対応のハンバーガーメニューの実装スニペット 20250613

✅ 機能概要
スマホ表示でハンバーガーボタン表示

メニューのスライド表示アニメーション付き

開閉時の aria-expanded などアクセシビリティ対応

WordPressテーマへの組み込みも想定した構造


✅ WordPressテーマに組み込むときのヒント
HTML部分は header.php に記述（<?php wp_nav_menu(); ?> を使ってもOK）

CSS/JSは functions.php で wp_enqueue_style() と wp_enqueue_script() で読み込む

動的メニューにする場合：
php
<nav id="global-nav" class="global-nav" aria-hidden="true">
  <?php
    wp_nav_menu([
      'theme_location' => 'header-menu',
      'container' => false,
      'menu_class' => '',
      'items_wrap' => '<ul>%3$s</ul>',
    ]);
  ?>
</nav>
