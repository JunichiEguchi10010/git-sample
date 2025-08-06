// ハンバーガーの開閉とメニューアニメーション
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// スクロールでナビバーを隠す／表示（デスクトップのみ）
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // モバイルではスクロール制御を無効化
  if (window.innerWidth <= 768) {
    return;
  }

  if (scrollTop > lastScrollTop) {
    // 下にスクロールしたら隠す
    navbar.style.top = '-100px';
  } else {
    // 上にスクロールしたら表示
    navbar.style.top = '0';
  }

  lastScrollTop = scrollTop;
});

// ✅ コードの全体像

// ① ハンバーガーメニューの開閉（クリック操作）
// ハンバーガーメニュー（3本線）をクリックすると、
// 自身のクラスに .open を付けたり外したりする（CSSで「×」アイコンに変形）
// メニュー領域にも .open クラスを付け外しして、表示／非表示を切り替える（スライドアニメーション）

// ② スクロールによるナビゲーションバーの出現／非表示
// ページを下にスクロールすると、ナビゲーションバーが上に隠れる
// 上にスクロールすると、ナビゲーションバーが再び現れる

// ✅ 疑似コード
// // ① ハンバーガーメニューの開閉処理

// ハンバーガーボタン（hamburger）とナビゲーションメニュー（navMenu）を取得

// ハンバーガーボタンがクリックされたら：
//     - hamburger 要素に 'open' クラスを付け外しする
//         → CSSで3本線が「×」アイコンに変化する
//     - navMenu 要素に 'open' クラスを付け外しする
//         → メニューが下にスライド表示される


// // ② スクロールでナビゲーションバーの表示切り替え

// 前回のスクロール位置を記録するための変数 lastScrollTop を 0 で初期化
// navbar 要素を取得

// スクロールイベントが発生したとき：
//     - 現在のスクロール位置（scrollTop）を取得
//     - もし現在の位置が前回より下（＝下にスクロール）であれば：
//         → ナビゲーションバー（navbar）を上へ隠す（top: -100px）
//     - それ以外（＝上にスクロール）であれば：
//         → ナビゲーションバーを上から再表示（top: 0）

//     - 現在の位置を lastScrollTop に保存（次の判定のため）
// 💡 補足
// classList.toggle() を使っているため、クリックのたびに状態を反転できます。

// スクロール制御はシンプルな比較で方向を判定し、style.top で位置を制御しています。

// 実務上、scrollTop の変化を使ったこのナビの表示／非表示は、UX改善によく使われる手法です（特にスマホでスペース節約に有効）。

// ✅ コード解説
// ▼ ハンバーガーメニューの開閉とアニメーション（1～7行目）

// // ハンバーガーの開閉とメニューアニメーション
// const hamburger = document.getElementById('hamburger');
// ➡️ idが hamburger の要素（3本線のボタン）を取得して、変数 hamburger に代入します。

// const navMenu = document.getElementById('navMenu');
// ➡️ idが navMenu の要素（隠れているメニューリスト）を取得して、変数 navMenu に代入します。

// hamburger.addEventListener('click', () => {
// ➡️ ハンバーガーをクリックしたときに、処理を実行するイベントリスナーを設定します。

//   hamburger.classList.toggle('open');
// ➡️ ハンバーガー自身に open クラスをトグル（追加 or 削除）します。
// 　CSSで「3本線→×」などの変形を制御します。

//   navMenu.classList.toggle('open');
// ➡️ メニュー本体にも open クラスをトグル。
// 　これによって、メニューの表示・非表示を CSS で制御できます（スライドなど）。

// });
// ➡️ クリックイベントの処理終了。

// ▼ スクロールによるナビバーの表示・非表示（9～21行目）

// // スクロールでナビバーを隠す／表示
// let lastScrollTop = 0;
// ➡️ 前回のスクロール位置を記録するための変数 lastScrollTop を初期化（最初は0）。

// const navbar = document.getElementById('navbar');
// ➡️ idが navbar の要素（ページ上部のナビゲーションバー）を取得し、変数 navbar に代入。

// window.addEventListener('scroll', () => {
// ➡️ ページをスクロールしたときに処理を実行するイベントリスナーを設定。

//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
// ➡️ 現在のスクロール位置を取得します。
// 　window.pageYOffset を優先し、古いブラウザ対応として document.documentElement.scrollTop をフォールバックにしています。

//   if (scrollTop > lastScrollTop) {
// ➡️ 現在の位置が前回より下なら（＝下方向にスクロールした場合）、次の処理を実行。

//     // 下にスクロールしたら隠す
//     navbar.style.top = '-100px';
// ➡️ ナビゲーションバーを top: -100px にして、上にスライドして隠します（画面からフェードアウトするような見た目に）。

//   } else {
// ➡️ 上方向にスクロールしているときは、次の処理を実行。

//     // 上にスクロールしたら表示
//     navbar.style.top = '0';
// ➡️ ナビゲーションバーを top: 0 にして、再び上から表示させます。

//   }
// ➡️ if 文の処理終了。

//   lastScrollTop = scrollTop;
// ➡️ 今回のスクロール位置を次回用に保存します。
// 　これが次のスクロールイベントで「前回との比較」に使われます。

// });
// ➡️ スクロールイベントの処理終了。

// ✅ 補足ポイント
// classList.toggle() はクラスを付けたり外したりするシンプルな方法。
// scrollTop の比較 で「スクロール方向」を判定するのがポイント。
// CSS 側では .open クラスや top: -100px のスタイルが必要になります（JSだけでは動作しません）。