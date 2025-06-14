html css レスポンシブル レイアウト　202050614

✅レスポンシブ対応はCSSが主流
現在のフロントエンド開発では、以下の理由から レスポンシブ対応はCSSのみで完結するのが一般的です。
理由：
CSSのメディアクエリが非常に強力かつ柔軟
レイアウト変更・フォントサイズ・表示/非表示などがCSSだけで制御できる
JavaScriptはページの読み込みや操作に影響するため、無駄な依存を避けたい
パフォーマンス・アクセシビリティの観点でもCSS優位

✅レスポンシブル対応でJavaScriptが必要になるとき
レスポンシブ対応そのものではなく、次のような「条件付きの動き・UI制御」をしたい場合です。

用途	                            解説
スライダーやカルーセル	            Swiperなどの初期化条件をブレイクポイントで切り替える必要がある
ハンバーガーメニューの開閉	        表示自体はCSS、開閉の挙動制御にJSが必要
高さを揃える等の動的処理	        要素数や内容量が変わるケースでの見た目補正
スマホだけで機能を制限/追加したい	例：電話リンク、地図連携、位置情報など


✅基本のブレイクポイント
カラム切り替え・フレックス調整
ヘッダー・フッター対応
ボタン・余白・フォントサイズの最適化
スマホ専用表示の設定


/* ------------------------------
   ✅ 基本のブレイクポイント
------------------------------ */

/* PC（幅1024px以上） */
@media (min-width: 1024px) {
  body {
    font-size: 16px;
  }
}

/* タブレット（768px〜1023px） */
@media (min-width: 768px) and (max-width: 1023px) {
  body {
    font-size: 15px;
  }
}

/* スマホ（〜767px） */
@media (max-width: 767px) {
  body {
    font-size: 14px;
  }
}

/* ------------------------------
   ✅ レイアウト調整パターン
------------------------------ */

/* グリッドカラム数切り替え */
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* カード横並び → 縦並び */
.card-list {
  display: flex;
  gap: 24px;
}
@media (max-width: 767px) {
  .card-list {
    flex-direction: column;
  }
}

/* ヘッダーメニュー表示切り替え */
.header-nav {
  display: flex;
}
@media (max-width: 767px) {
  .header-nav {
    display: none;
  }
}

/* 画像サイズ調整 */
img.responsive {
  width: 100%;
  height: auto;
  max-width: 600px;
}

/* 見出しサイズ調整 */
h1 {
  font-size: 2.5rem;
}
@media (max-width: 767px) {
  h1 {
    font-size: 1.8rem;
  }
}

/* 余白調整 */
.section {
  padding: 80px 40px;
}
@media (max-width: 767px) {
  .section {
    padding: 60px 20px;
  }
}

/* フッターのカラム切り替え */
.footer-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 767px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

/* ボタンの大きさ調整 */
.btn {
  padding: 16px 32px;
  font-size: 1rem;
}
@media (max-width: 767px) {
  .btn {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
}

/* スマホ専用表示 */
.sp-only {
  display: none;
}
@media (max-width: 767px) {
  .sp-only {
    display: block;
  }
}





✅「JavaScriptでブレイクポイントを取得する方法」(主流ではない)

✅ 基本の考え方
JavaScriptでは、以下のいずれかの方法で「現在の画面幅がどのブレイクポイントか？」を判定します：

🟦window.innerWidthで幅を取得し、数値で条件分岐
🟦matchMedia()でメディアクエリと同様の判定
🟦ResizeObserverなどでサイズ変化を監視（必要に応じて）

✅ 方法①：window.innerWidth を使う（最もシンプル）
js
function getBreakpoint() {
  const width = window.innerWidth;

  if (width < 600) {
    return 'mobile';
  } else if (width < 1024) {
    return 'tablet';
  } else if (width < 1440) {
    return 'desktop';
  } else {
    return 'wide';
  }
}

console.log(getBreakpoint()); // 例: 'tablet'
➕利点：
簡単明瞭、軽い

サイズ変更に合わせて使いたいときは、resizeイベントと組み合わせます
js
window.addEventListener('resize', () => {
  console.log(getBreakpoint());
});


✅ 方法②：window.matchMedia() を使う（CSSと同じ感覚）
js
const isMobile = window.matchMedia('(max-width: 599px)').matches;
const isTablet = window.matchMedia('(min-width: 600px) and (max-width: 1023px)').matches;

if (isMobile) {
  console.log('モバイル表示です');
} else if (isTablet) {
  console.log('タブレット表示です');
} else {
  console.log('PC表示です');
}
➕利点：
CSSのメディアクエリと一貫性がある

リスナーを使えば、変更時に動作させることも可能：

js
const mediaQuery = window.matchMedia('(max-width: 599px)');

mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    console.log('モバイルになった');
  } else {
    console.log('モバイルではなくなった');
  }
});

✅ 方法③：CSSと連携する（CSS変数や属性でブレイクポイント管理）
CSSでbodyにブレイクポイントを設定しておき、JSから読み取る方法もあります。

css
/* CSS */
body::before {
  content: 'mobile';
}

@media (min-width: 600px) {
  body::before {
    content: 'tablet';
  }
}

@media (min-width: 1024px) {
  body::before {
    content: 'desktop';
  }
}
js
// JavaScriptで取得
function getCssBreakpoint() {
  const content = getComputedStyle(document.body, '::before').content;
  return content.replace(/"/g, '');
}

console.log(getCssBreakpoint()); // 例: 'tablet'
➕利点：
CSS設計と完全に一致する
JSで書くメディアクエリを減らせる

✅ どれを使うべき？
方法	                    向いているケース
innerWidth	            単純な処理で済ませたい、軽く済ませたい
matchMedia	            CSSと同様の条件を使いたい、監視したい
CSS連携方式	            CSS設計に厳密に合わせたい、JSにロジックを持たせたくない