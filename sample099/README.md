html ボイラープレート スニペット 202506007

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>○○株式会社 | トップページ</title>
  <meta name="description" content="○○株式会社の公式ホームページです。">
  <meta name="keywords" content="○○, ホームページ, サービス名">
  <link rel="icon" href="favicon.ico">
  <meta name="format-detection" content="telephone=no">

  <link rel="stylesheet" href="assets/plugins/swiper-bundle.min.css">
  <link rel="stylesheet" href="assets/plugins/lightbox/lightbox.min.css">
  <link rel="stylesheet" href="assets/plugins/aos.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
  <header class="l-hdr">
    <h1 class="l-hdr__logo">
      <img src="assets/images/logo.svg" alt="○○株式会社のロゴ" width="180" height="23">
    </h1>
  </header>

  <main class="l-main" id="top">
  </main>

  <!-- JavaScript読み込みをbody末に -->
  <script src="assets/plugins/jquery.min.js"></script>
  <script src="assets/plugins/swiper-bundle.min.js"></script>
  <script src="assets/plugins/lightbox/lightbox.min.js"></script>
  <script src="assets/plugins/aos.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>

🟨上記コードの解説
<!-- このファイルはHTML5で書かれていることを示す宣言 -->
<!DOCTYPE html>

<!-- HTML文書の開始。lang="ja"は日本語のページであることを示す -->
<html lang="ja">

<head>
  <!-- ページ内の文字コードをUTF-8に設定（日本語対応などに必要） -->
  <meta charset="UTF-8">

  <!-- スマホやタブレットでも見やすくするための設定（レスポンシブ対応） -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- ブラウザのタブに表示されるページのタイトル -->
  <title>○○株式会社 | トップページ</title>

  <!-- ページの内容を説明する文章（検索結果などに使われる） -->
  <meta name="description" content="○○株式会社の公式ホームページです。">

  <!-- 検索キーワードを設定（昔はSEO対策で使われていたが現在はほぼ無視される） -->
  <meta name="keywords" content="○○, ホームページ, サービス名">

  <!-- ブラウザのタブに表示される小さなアイコン（ファビコン）を指定 -->
  <link rel="icon" href="favicon.ico">

  <!-- iPhoneなどで電話番号が勝手にリンクになるのを防ぐ -->
  <meta name="format-detection" content="telephone=no">

  <!-- Swiper（スライダー用ライブラリ）のCSSを読み込み -->
  <link rel="stylesheet" href="assets/plugins/swiper-bundle.min.css">

  <!-- Lightbox（画像拡大表示用ライブラリ）のCSSを読み込み -->
  <link rel="stylesheet" href="assets/plugins/lightbox/lightbox.min.css">

  <!-- AOS（スクロールアニメーション用ライブラリ）のCSSを読み込み -->
  <link rel="stylesheet" href="assets/plugins/aos.css">

  <!-- サイト全体のスタイル（見た目）を設定するCSS -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
  <!-- ヘッダー部分の開始（サイトの上部） -->
  <header class="l-hdr">
    <!-- サイトロゴの表示（通常は企業名など） -->
    <h1 class="l-hdr__logo">
      <!-- ロゴ画像の読み込み（altは画像が表示されないときに代わりに出る文字） -->
      <img src="assets/images/logo.svg" alt="○○株式会社のロゴ" width="180" height="23">
    </h1>
  </header>

  <!-- メインの内容部分（コンテンツを入れる場所） -->
  <main class="l-main" id="top">
    <!-- 必要なセクション（見出し・文章・画像など）をここに追加していく -->
  </main>

  <!-- JavaScriptファイルの読み込み。基本的にページの一番下に置く -->
  <!-- jQuery（便利なJavaScriptライブラリ） -->
  <script src="assets/plugins/jquery.min.js"></script>

  <!-- Swiperの動きを実現するJavaScript -->
  <script src="assets/plugins/swiper-bundle.min.js"></script>

  <!-- Lightboxの動きを実現するJavaScript -->
  <script src="assets/plugins/lightbox/lightbox.min.js"></script>

  <!-- AOSのスクロールアニメーションを有効にするJavaScript -->
  <script src="assets/plugins/aos.js"></script>

  <!-- このサイト独自のJavaScriptファイル（ページの動きを記述） -->
  <script src="assets/js/main.js"></script>
</body>

</html>

「assets/」はCSSやJSなどの素材をまとめるフォルダです。

main.js や style.css は自分で編集するファイルで、他は外部ライブラリです。
