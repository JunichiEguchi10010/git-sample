// カードセクションを生成して指定されたコンテナに描画する関数
export function renderCards(container) {
    // 表示するカードのデータ配列（タイトルと説明文）
    const cards = [
      { title: "高速開発", text: "TailwindのユーティリティでCSS不要の素早い開発。" },
      { title: "レスポンシブ", text: "モバイルからデスクトップまで美しいUIを自動調整。" },
      { title: "拡張性", text: "自由なカスタマイズで実務でも耐えられる設計。" },
    ];
  
    // 各カードをHTMLに変換し、コンテナに挿入
    container.innerHTML = cards
      .map(
        (card, i) => `
          <!-- カードコンポーネント：白背景＋角丸＋シャドウ＋ホバー効果 -->
          <div class="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
               data-aos="fade-up"                <!-- スクロール時にフェードアップ -->
               data-aos-delay="${i * 200}">      <!-- 順番に遅延をつけて表示 -->
            
            <!-- カードタイトル -->
            <h3 class="text-xl font-semibold mb-2">${card.title}</h3>
            
            <!-- カード説明文 -->
            <p class="text-gray-600">${card.text}</p>
          </div>
        `
      )
      .join(""); // HTML文字列を結合して1つの塊に
  }


  // data-aos 属性は AOS（Animate On Scroll）ライブラリによるアニメーション制御です
// i * 200 によって各カードの表示タイミングに200msずつ遅延を加え、自然な演出を実現
// hover:shadow-lg transition によって、マウスホバー時にシャドウが強調され、インタラクティブな印象を与えます

// export function renderCards(container) {
//     const cards = [
//       { title: "高速開発", text: "TailwindのユーティリティでCSS不要の素早い開発。" },
//       { title: "レスポンシブ", text: "モバイルからデスクトップまで美しいUIを自動調整。" },
//       { title: "拡張性", text: "自由なカスタマイズで実務でも耐えられる設計。" },
//     ];
  
//     container.innerHTML = cards
//       .map(
//         (card, i) => `
//           <div class="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
//                data-aos="fade-up"
//                data-aos-delay="${i * 200}">
//             <h3 class="text-xl font-semibold mb-2">${card.title}</h3>
//             <p class="text-gray-600">${card.text}</p>
//           </div>
//         `
//       )
//       .join("");
//   }
  