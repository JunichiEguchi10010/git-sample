document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const submenuParents = document.querySelectorAll(".has-submenu > a");
  
    // ハンバーガー開閉
    menuToggle.addEventListener("click", () => {
      siteNav.classList.toggle("active");
    });
  
    // スマホ用サブメニュー開閉
    submenuParents.forEach((link) => {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault(); // リンク動作を無効化（展開用）
          const submenu = this.nextElementSibling;
          submenu.classList.toggle("active");
        }
      });
    });
  
    // 画面サイズ変更時のリセット（PCに戻ったらサブメニュー全開状態を防ぐ）
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        siteNav.classList.remove("active");
        document.querySelectorAll(".submenu").forEach((sm) => {
          sm.classList.remove("active");
        });
      }
    });
  });
  
//  🟨コードの全体像
//  「PCではホバー、スマホではタップでサブメニューを開くレスポンシブ対応ナビゲーションを制御するためのJavaScript」です。

// 🎯 目的
// ハンバーガーメニュー（スマホ用）の開閉
// スマホでのサブメニュー展開（タップ操作対応）
// 画面サイズが変わったときの状態リセット（PCに戻ったら開きっぱなしを防ぐ）
// PCではホバー操作のみで動作するようにし、スマホとは挙動を切り替える

// ⚙ 機能の流れ
// 初期設定（DOM読み込み完了時）
// ハンバーガーボタン .menu-toggle
// ナビゲーション全体 .site-nav
// サブメニューを持つ親リンク .has-submenu > a
// をそれぞれ取得

// ハンバーガー開閉
// スマホ表示時にボタンをクリックすると
// .site-nav に active クラスを付け外しして表示／非表示を切り替える

// スマホ用サブメニュー開閉
// サブメニュー親リンクがクリックされたとき、

// 画面幅が 768px以下 なら
// e.preventDefault() でページ遷移を止める
// 直後の .submenu に active クラスを付け外しして展開／収納

// 画面サイズ変更時のリセット
// ウィンドウ幅が 768px超（PC表示）に戻ったら
// .site-nav の active を削除
// 全ての .submenu の active を削除
// → これでPCに戻ったときに開きっぱなしを防ぐ



// 🟨  疑似コード
// ページの読み込みが終わったら次の処理を行う：

//   1. メニュー開閉ボタン（ハンバーガー）を取得する
//   2. ナビゲーション全体（.site-nav）を取得する
//   3. サブメニューを持つ親リンク（.has-submenu > a）を全部取得する

//   --- ハンバーガーメニューの開閉処理 ---
//   ハンバーガーボタンがクリックされたら：
//     - ナビゲーション全体に「active」クラスを付け外しする（表示／非表示を切り替える）

//   --- スマホ時のサブメニュー開閉処理 ---
//   各サブメニュー親リンクについて：
//     - クリックされたとき：
//       - 画面幅が768px以下の場合のみ：
//         - デフォルトのリンク動作を止める（ページ遷移しないようにする）
//         - クリックされたリンクの直後にあるサブメニュー要素を取得
//         - そのサブメニューの「active」クラスを付け外しして開閉する

//   --- 画面サイズ変更時のリセット処理 ---
//   ウィンドウサイズが変更されたら：
//     - もし画面幅が768pxより大きい場合（PC表示）：
//       - ナビゲーション全体の「active」クラスを削除（閉じる）
//       - すべてのサブメニューから「active」クラスを削除（閉じる）


// 🟨 コード解説
// document.addEventListener("DOMContentLoaded", function () {
//     意味: HTMLの読み込み（DOM構造）がすべて完了したら、中の処理を実行する。
//     理由: JavaScriptをHTMLの要素より先に動かすと、まだ要素が存在しないためエラーになる可能性がある。それを防ぐ。
    
//       const menuToggle = document.querySelector(".menu-toggle");
//     .menu-toggle クラスを持つ要素（ハンバーガーメニューのボタン）を取得して menuToggle という変数に代入。
    
//       const siteNav = document.querySelector(".site-nav");
//     .site-nav クラスを持つナビゲーション全体を取得して siteNav という変数に代入。
    
//       const submenuParents = document.querySelectorAll(".has-submenu > a");
//     .has-submenu（サブメニューを持つ親）内のaタグをすべて取得し、submenuParents という配列風の変数に代入。
//     これらは「サブメニューを開くトリガー」になる。
    
//       // ハンバーガー開閉
//     このコメントは「ここからハンバーガーメニューの開閉機能を実装する」という意味。
    
//       menuToggle.addEventListener("click", () => {
//     ハンバーガーボタンがクリックされたときに、次の処理を実行する。
    
//         siteNav.classList.toggle("active");
//     .site-nav に active クラスを付けたり外したりする（トグル動作）。
    
//     結果: active が付くとCSSで表示状態に、外れると非表示になる。
    
//       });
//     ハンバーガーボタンのクリック処理の終了。
    
//       // スマホ用サブメニュー開閉
//     このコメントは「ここからスマホ向けのサブメニュー開閉機能を実装する」という意味。
    
//       submenuParents.forEach((link) => {
//     先ほど取得したサブメニュー親リンクそれぞれに対して、処理を設定していく。
    
//         link.addEventListener("click", function (e) {
//     そのリンクがクリックされたときに、この中の処理を実行する。
    
//           if (window.innerWidth <= 768) {
//     画面幅が768px以下（スマホやタブレットの幅）だった場合のみ、以下の処理を行う。
    
//             e.preventDefault(); // リンク動作を無効化（展開用）
//     リンクの本来の動作（ページ移動）を止める。
    
//     代わりにサブメニュー展開の動作を行うため。
    
//             const submenu = this.nextElementSibling;
//     クリックされたリンク (this) の直後にある要素を取得し、それを submenu に代入。
    
//     直後の要素は .submenu になる想定。
    
//             submenu.classList.toggle("active");
//     サブメニューの active クラスを付けたり外したりして、開閉を切り替える。
    
//           }
//     if 文（スマホ表示時のみ処理）の終了。
    
//         });
//     このリンククリック処理の終了。
    
//       });
//     submenuParents.forEach（すべてのサブメニュー親リンクに処理を付ける）の終了。
    
//       // 画面サイズ変更時のリセット（PCに戻ったらサブメニュー全開状態を防ぐ）
//     コメント：ウィンドウサイズが変わったときに、PC表示に戻ったらメニューが開きっぱなしにならないようリセットするための処理。
    
//       window.addEventListener("resize", () => {
//     ウィンドウサイズが変わるたびに、この中の処理を実行。
    
//         if (window.innerWidth > 768) {
//     画面幅が 768pxより大きい（PC表示） になったときだけ処理を行う。
    
//           siteNav.classList.remove("active");
//     ナビゲーション全体から active クラスを削除（ナビを閉じる）。
    
//           document.querySelectorAll(".submenu").forEach((sm) => {
//     すべての .submenu 要素を取得して、それぞれに対して以下の処理を行う。
    
//             sm.classList.remove("active");
//     サブメニューから active クラスを削除（閉じる）。
    
//           });
//     すべてのサブメニュー処理の終了。
    
//         }
//     PC幅に戻ったときの処理終了。
    
    
//       });
//     resize（画面幅変更時）処理の終了。
    
//     });
//     DOMContentLoaded 全体の処理終了。
    
    