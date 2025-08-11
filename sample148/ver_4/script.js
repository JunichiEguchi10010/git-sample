document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".hybrid-grid");
  
    for (let i = 2; i <= 6; i++) {
      // 各ループの i はブロックスコープで保持される
      setTimeout(() => {
        const card = document.createElement("div");
        card.className = "hybrid-card";
        card.innerHTML = `
          <img src="https://picsum.photos/300/180?random=${i}" alt="Card Image ${i}" />
          <div class="card-content">
            <h3>タイトル${i}</h3>
            <p>これはカードの説明文です。</p>
            <button>詳細を見る</button>
          </div>
        `;
        grid.appendChild(card);
      }, (i - 2) * 1000);
    }
  });


// 🔄コードの全体像
// ページが完全に読み込まれると DOMContentLoaded イベントが発火。
// .hybrid-grid 要素を取得（カードの表示先）。
// for ループで i = 2 から i = 6 まで繰り返す。
// 各 i に対して：
// setTimeout により (i - 2) * 1000 ミリ秒後に処理を実行。
// 新しい div.hybrid-card を作成。
// innerHTML で画像・タイトル・説明・ボタンを含むHTMLを挿入。
// 画像は https://picsum.photos/300/180?random=${i} で取得。
// 作成したカードを .hybrid-grid に appendChild で追加。
// 結果として、1秒ごとに1枚ずつカードが表示される。


// 🧠 疑似コード
//   ページの読み込みが完了したら、以下の処理を実行する：
// 1. 「.hybrid-grid」というクラスを持つ要素を取得する（カードを追加する場所）。
// 2. 2〜6までの数字（i）を使って、以下の処理を繰り返す：
//    - iごとに1秒ずつ遅らせて処理を実行する。
//    - 新しいカード要素（div）を作成する。
//    - カードの中に画像、タイトル、説明文、ボタンをHTMLとして挿入する。
//      - 画像は「https://picsum.photos/300/180?random=i」で取得する。
//      - タイトルは「タイトルi」
//      - 説明文は固定文
//      - ボタンは「詳細を見る」
//    - 作成したカードを「.hybrid-grid」の中に追加する。

// 🧠 コード解説
// 1行ずつの解説
// document.addEventListener("DOMContentLoaded", () => {
// ページのHTMLがすべて読み込まれたタイミングで処理を開始する。

// DOMContentLoaded は画像などの読み込みを待たず、HTML構造が整った時点で発火するイベント。

//   const grid = document.querySelector(".hybrid-grid");
// .hybrid-grid というクラス名を持つ要素を取得し、変数 grid に格納。

// この要素がカードを追加する「親コンテナ」になる。

//   for (let i = 2; i <= 6; i++) {
// i を 2 から 6 までループ（合計5回）。

// let を使うことで、各ループの i はブロックスコープで保持され、非同期処理でも正しく参照される。

//     setTimeout(() => {
// 一定時間後に処理を実行するための関数。

// 各カードの表示タイミングをずらすために使われている。

//       const card = document.createElement("div");
// 新しい div 要素を作成し、変数 card に格納。

// この要素が1枚のカードになる。

//       card.className = "hybrid-card";
// 作成した div に hybrid-card というクラスを付与。

// CSSでカードの見た目を整えるためのクラス。

//       card.innerHTML = `
// カードの中身をHTMLとして一括挿入する準備。

// テンプレートリテラル（バッククォート）を使って複数行のHTMLを記述。

//         <img src="https://picsum.photos/300/180?random=${i}" alt="Card Image ${i}" />
// ランダム画像を表示する <img> タグ。

// random=${i} によって、ループごとに異なる画像が表示される。

//         <div class="card-content">
// カードのテキスト部分を囲むコンテナ。

//           <h3>タイトル${i}</h3>
// カードのタイトル。i を使って「タイトル2」〜「タイトル6」と変化。

//           <p>これはカードの説明文です。</p>
// 固定の説明文。必要に応じて動的に変更可能。

//           <button>詳細を見る</button>
// ユーザーがクリックできるボタン。今は機能なしだが、イベントを追加すれば詳細表示などに使える。

//         </div>
//       `;
// card.innerHTML の終了。カードの中身が完成。

//       grid.appendChild(card);
// 作成したカードを .hybrid-grid 要素の中に追加。

// これで画面上にカードが表示される。

//     }, (i - 2) * 1000);
// (i - 2) * 1000 ミリ秒（＝1秒ごと）に処理を遅延。

// 最初のカードは0秒後、次は1秒後、…と順番に表示される。

//   }
// });
// for ループと DOMContentLoaded の終了。