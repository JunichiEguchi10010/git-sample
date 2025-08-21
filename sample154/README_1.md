HTML / Modern&Legacy JavaScript / PHP / Sass スニペット 20250821

HTML系
| Prefix             | 説明              | 使用例                              |
| ------------------ | --------------- | -------------------------------- |
| `.`                | class属性を挿入      | `class="header"`                 |
| `#`                | id属性を挿入         | `id="top"`                       |
| `zen`              | 全角スペース          | `&emsp;`                         |
| `han`              | 半角スペース          | `&nbsp;`                         |
| `copyright`        | コピーライト          | `&copy;`                         |
| `colon`            | コロンHTML         | `&#0058;`                        |
| `br`               | 改行              | `<br>`                           |
| `br-pc`            | PCのみ改行          | `<br class="u-pc">`              |
| `br-sp`            | SPのみ改行          | `<br class="u-sp">`              |
| `swiper`           | SwiperスライダーHTML | ページネーション・前後ボタン付き                 |
| `form`             | お問い合わせフォーム      | 名前・メール・電話・性別・職業・スキル・問い合わせ内容      |
| `table`            | テーブルHTML        | `<table>`基本構造                    |
| `header-base-html` | ヘッダーHTML        | ロゴ・ナビ・ハンバーガー付き                   |
| `section`          | セクションHTML       | 汎用 `<section>`                   |
| `img-html`         | 画像タグHTML        | `src, alt, width, height`指定可     |
| `picture-html`     | レスポンシブ画像HTML    | WebP対応                           |
| `tel`              | 電話リンク           | `<a href="tel:xxx">`             |
| `email`            | メールリンク          | `<a href="mailto:xxx">`          |
| `target`           | 外部リンク新タブ        | `<a href="url" target="_blank">` |
| `jQuery-cdn`       | jQuery CDN読み込み  | `<script src="..."></script>`    |


Modern JavaScript系
| ショートカット       | 用途               | コメント                          |
| ------------- | ---------------- | ----------------------------- |
| `domready`    | DOMContentLoaded | DOM(HTML)が完全に読み込まれたら処理を実行           |
| `windowload`  | window load      | ページ全体（画像やCSSも含む）がロードされたら処理を実行 |
| `click`       | クリックイベント         | 指定した要素をクリックしたときの処理を設定         |
| `hover`       | hoverイベント        | 指定要素にマウスが乗った／離れたときの処理         |
| `scroll`      | スクロールイベント        | ページがスクロールされたときの処理             |
| `scrollTop`   | スクロール位置取得        | 現在のスクロール位置（Y座標）を取得            |
| `each`        | NodeListループ      | 複数の要素に対して繰り返し処理を行う (NodeList.forEach) |
| `class`       | クラス操作            | add/remove/toggleで指定要素のクラスを操作 |
| `window-size` | 画面幅切り替え          | 画面幅によって処理を切り替える例（レスポンシブ対応）    |
| `id`          | ページID限定処理        | bodyタグのid属性が特定値のときだけ処理を実行     |

Legacy JavaScrip(jQuery)系
| Prefix           | 説明                 | 使用例                                                           |
|------------------|--------------------|------------------------------------------------------------------|
| `jq-jQuery`      | jQuery初期化         | `jQuery(function($) { $1 });`                                    |
| `jq-ready`       | ready関数           | `$(window).on('ready', function() { $1 });`                     |
| `jq-load`        | loadイベント        | `$(window).on('load', function() { $1 });`                      |
| `jq-hover`       | hoverイベント        | `$('#id').on({ 'mouseenter': function() { $2 }, 'mouseleave': function() { $3 } });` |
| `jq-click`       | クリックイベント      | `$('#id').on('click', function() { $1; return false; });`       |
| `jq-scroll`      | スクロールイベント    | `$(window).on('scroll', function() { $1 });`                    |
| `jq-scrollTop`   | スクロール位置取得    | `$(window).scrollTop();`                                         |
| `jq-each`        | each関数            | `$1.each(function() { $2 });`                                     |
| `jq-class`       | クラス操作           | `$('#id').$2Class('$3');`                                        |
| `jq-window-size` | 画面幅による切替     | `var windowWidth = $(window).width(); if(windowWidth <= 767){ ... } else { ... }` |
| `jq-id`          | ページID限定処理     | `if (document.body.id === '$1') { $2 }`                          |
| `jq-swiper`      | Swiper初期化         | `const mySwiper = new Swiper('.p-swiper__xxx', { ... });`       |




PHP系
| Prefix                 | 説明            | 使用例                                                                     |
| ---------------------- | ------------- | ----------------------------------------------------------------------- |
| `php`                  | PHPタグ         | `<?php ?>`                                                              |
| `php-echo`             | echo出力        | `<?php echo $var; ?>`                                                   |
| `img-php`              | テーマ内画像表示      | `<img src='<?php echo get_template_directory_uri() ?>/assets/img/xxx'>` |
| `picture-php`          | レスポンシブ画像表示    | `<picture>...</picture>`                                                |
| `temp`                 | テーマディレクトリURL  | `<?php echo get_template_directory_uri() ?>`                            |
| `parts`                | テンプレートパーツ呼び出し | `<?php get_template_part('template-parts/xxx'); ?>`                     |
| `url`                  | トップURL取得      | `<?php echo home_url('/'); ?>`                                          |
| `hf`                   | ヘッダーとフッター呼び出し | `<?php get_header(); ?> ... <?php get_footer(); ?>`                     |
| `if`                   | 条件分岐基本        | `if/elseif/else/endif`                                                  |
| `if-page`              | 固定ページ判定       | `<?php if(is_page('xxx')): ?>`                                          |
| `if-front-page`        | フロントページ判定     | `<?php if(is_front_page()): ?>`                                         |
| `if-archive`           | 投稿一覧ページ判定     | `<?php if(is_archive()): ?>`                                            |
| `if-post-type-archive` | カスタム投稿一覧判定    | `<?php if(is_post_type_archive('xxx')): ?>`                             |
| `if-category`          | カテゴリ判定        | `<?php if(is_category()): ?>`                                           |
| `if-taxonomy`          | タクソノミー判定      | `<?php if(is_tax('xxx')): ?>`                                           |
| `if-single`            | 投稿詳細判定        | `<?php if(is_single()): ?>`                                             |
| `if-singular`          | カスタム投稿詳細判定    | `<?php if(is_singular('xxx')): ?>`                                      |
| `if-mobile`            | モバイル判定        | `<?php if(wp_is_mobile()): ?>`                                          |
| `field`                | ACFフィールド表示    | `<?php the_field('xxx'); ?>`                                            |


Sass系