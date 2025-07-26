WebDesing JavaScriptライブラリ AOS（Animate On Scroll）20250724

AOS（Animate On Scroll 公式 →ここを参照すること
https://michalsnik.github.io/aos/

スクロールに応じて要素にアニメーションを加えることができるJavaScriptライブラリです。

🌟 AOSの特徴
jQuery非依存で軽量
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



📊 スクロールアニメーションライブラリ比較表
ライブラリ名	            特徴・強み	                   ファイルサイズ	難易度	        おすすめ用途
AOS.js	                HTML属性で簡単に導入、軽量	        約6KB	       とても簡単	   LP、ポートフォリオ、ブログなど
ScrollTrigger (GSAP)	高度な制御が可能、複雑な演出に対応	100KB以上	     やや難しい	    高度なUI演出、Webアプリ
Trig.js	                CSSベースで超軽量、爆速	            約4KB	       非常に簡単	   パフォーマンス重視のサイト
Sal.js	                AOSの代替として人気、軽量	        約3KB	       簡単	           基本的なスクロール演出
WOW.js + Animate.css	CSSアニメーションと連携しやすい	     約7KB	        簡単	        CSS中心のサイト、旧jQuery系
Locomotive Scroll	    スムーズなページ全体スクロール演出	 大きめ	         中程度	        フルページスクロールサイト

🧠 選び方のヒント
初心者や軽量重視 → AOS.js や Trig.js
複雑なアニメーションやタイムライン制御 → GSAP + ScrollTrigger
CSS中心で構築したい → WOW.js + Animate.css
ページ全体のスクロール演出をしたい → Locomotive Scroll



スクロールアニメーションライブラリ「AOS.js」の使い方を徹底解説！
https://pengi-n.co.jp/column/aos-js/