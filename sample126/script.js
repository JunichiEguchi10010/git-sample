document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const closeBtn = lightbox.querySelector(".close");
  
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", () => {
        const fullImageUrl = thumbnail.dataset.full;
        lightboxImage.src = fullImageUrl;
        lightbox.style.display = "flex";
      });
    });
  
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
      lightboxImage.src = "";
    });
  
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxImage.src = "";
      }
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
        lightboxImage.src = "";
      }
    });
  });
  


//   コード解説
//   document.addEventListener("DOMContentLoaded", function () {
//     説明：HTMLの読み込みがすべて終わった後（DOMが完成したとき）に、中の処理を実行する、という意味です。
//     理由：スクリプトの実行がHTML要素より早いと、要素がまだ存在しないことがあるため、このタイミングで動かすのが安全。
    
//       const thumbnails = document.querySelectorAll(".thumbnail");
//     説明：クラス名 thumbnail を持つ画像（サムネイル）をすべて取得して、thumbnails に配列として格納します。
//     目的：クリックイベントを複数のサムネイル画像に対して設定するため。
    
//       const lightbox = document.getElementById("lightbox");
//     説明：IDが lightbox の要素（＝モーダル部分）を取得します。
//     目的：クリックされたときに表示する拡大画像の親コンテナを操作するため。
    
//       const lightboxImage = lightbox.querySelector(".lightbox-image");
//     説明：lightbox の中にあるクラス名 lightbox-image の画像タグを取得します。
//     目的：クリックされた画像に応じて拡大画像をここに差し替えるため。
    
//       const closeBtn = lightbox.querySelector(".close");
//     説明：lightbox の中にあるクラス close（×ボタン）を取得します。
//     目的：×ボタンをクリックしたらモーダルを閉じるようにするため。
    
//       thumbnails.forEach(thumbnail => {
//     説明：取得したすべてのサムネイル画像に対して、1つずつ処理を繰り返します。
    
//         thumbnail.addEventListener("click", () => {
//     説明：各サムネイルに対して、「クリックされたときの処理」を設定します。
    
//           const fullImageUrl = thumbnail.dataset.full;
//     説明：サムネイルの data-full 属性に入っているURLを取得します（大きな画像のURL）。
//     例：<img data-full="big.jpg"> の big.jpg を取り出す。
    
//           lightboxImage.src = fullImageUrl;
//     説明：取得した大きな画像のURLを、lightbox の中の画像にセットします（差し替える）。
    
//           lightbox.style.display = "flex";
//     説明：lightbox を画面上に表示します（CSS で display:none → flex に変更）。
    
//         });
//       });
//     説明：ここまでで、各サムネイルをクリックしたときに拡大画像を表示する処理が完了します。
    
//       closeBtn.addEventListener("click", () => {
//     説明：×ボタンをクリックしたときの処理を指定します。
    
//         lightbox.style.display = "none";
//     説明：lightbox を非表示にします（モーダルを閉じる）。
    
//         lightboxImage.src = "";
//     説明：lightbox の中の画像のURLを空にして、次の画像に備えます（残像を防止）。
    
//       });
//     説明：×ボタンのクリック処理終了。
    
//       lightbox.addEventListener("click", (e) => {
//     説明：lightbox のどこかがクリックされたときの処理です。
    
//         if (e.target === lightbox) {
//     説明：クリックされた要素が lightbox 自身（背景）だったかどうかを判定。
//     意図：拡大画像や×ボタンを押したときには反応しないようにする。
    
//           lightbox.style.display = "none";
//           lightboxImage.src = "";
//     説明：背景がクリックされたら lightbox を閉じて、画像もリセットします。
    
//         }
//       });
//     説明：lightbox 背景クリック処理 終了。
    
//       document.addEventListener("keydown", (e) => {
//     説明：キーボードが押されたときの処理です。
    
//         if (e.key === "Escape") {
//     説明：押されたキーが「Escape（Escキー）」だったら、という条件分岐です。
    
//           lightbox.style.display = "none";
//           lightboxImage.src = "";
//     説明：ESCが押されたら lightbox を閉じて画像も消す。
    
//         }
//       });
//     });
//     説明：全体の DOMContentLoaded イベントリスナーを閉じます。
    
//     ✅まとめ
//     このスクリプトは、以下のようにユーザーの行動に応じてライトボックスを操作します：
//     画像クリック → 拡大表示（data-fullの画像を表示）
//     背景クリック、×クリック、ESCキー → 拡大表示を閉じる