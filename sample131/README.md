WebDesing JavaScriptライブラリ AOS（Animate On Scroll）20250724

公式
https://michalsnik.github.io/aos/

スクロールに応じて要素にアニメーションを加えることができるJavaScriptライブラリです。

🌟 AOSの特徴
JavaScriptの知識がなくても使える：HTMLに属性を追加するだけでOK
軽量で高速：ページの読み込みにほとんど影響なし
豊富なアニメーション：フェード、ズーム、スライド、フリップなど多数
カスタマイズ可能：遅延、持続時間、発火位置など細かく調整できる

🛠️ 基本的な使い方
1. CDNで読み込み
html
<!-- CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
<!-- JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

2. 初期化スクリプト
html
<script>
  AOS.init({
    duration: 1000,       // アニメーションの長さ（ms）
    delay: 200,           // 開始までの遅延（ms）
    once: true,           // 一度だけアニメーションする
    offset: 120           // 発火するスクロール位置（px）
  });
</script>

3. HTMLに属性を追加
html
<div data-aos="fade-up">
  スクロールでフェードアップ！
</div>
🎨 よく使われるアニメーション一覧
アニメーション	    属性値例	                説明
フェード	        fade, fade-up	        徐々に表示される
スライド	        slide-left	            横からスライドして表示
ズーム	            zoom-in, zoom-out	    拡大・縮小しながら表示
フリップ	        flip-left, flip-up	    回転しながら表示

🧩 カスタマイズ属性（HTMLに追加可能）
属性名	                        役割	                    例
data-aos-delay	            遅延時間（ms）	            data-aos-delay="300"
data-aos-duration	        アニメーションの長さ（ms）	 data-aos-duration="800"
data-aos-easing	            イージング（動きの加減速）	 data-aos-easing="ease-in-out"
data-aos-anchor-placement	発火位置の指定	            top-bottom, center-center


スクロールアニメーションライブラリ「AOS.js」の使い方を徹底解説！
https://pengi-n.co.jp/column/aos-js/