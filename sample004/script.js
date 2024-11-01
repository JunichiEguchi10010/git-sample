// ランダムに光の点を生成し、それぞれの光が異なる位置とタイミングで表示される
function createLines() {
  // 新しい<div>要素を作成し、それを変数lineに代入しています。この要素が光の点となります。
  let line = document.createElement("div");
  // setAttributeの使用方法
  // element.setAttribute(属性名, 値);
  line.setAttribute("class", "line");
  // 作成したline要素をHTMLドキュメントの<body>に追加し、画面上に表示
  document.body.appendChild(line);

  // Math.random()で0〜1未満の乱数を生成し、それを12倍して最大12ピクセルの幅を持たせています。
  // 光の横幅
  line.style.width = Math.random() * 12 + "px";
  // 光の水平方向(横)の位置。上限は画面の幅 innerWidthはブラウザの幅で、Math.random() * innerWidthでランダムな水平位置が設定される
  line.style.left = Math.random() * innerWidth + "px";
  // 光の遅延(スピード) 基本の3秒に、0から最大12秒のランダムな時間を足して、アニメーションの長さを決めています。これにより、各光の点が異なる速度で動くようになります。
  line.style.animationDuration = 3 + Math.random() * 12 + "s";

  // コンソールにlineの幅、位置、アニメーションの時間を表示し、値を確認できるようにしています。デバッグや確認用の出力です。
  console.log("width:", line.style.width);
  console.log("left:", line.style.left);
  console.log("duration:", line.style.animationDuration);

  // 光が昇りながら消えるまでの時間 setTimeoutで、6秒後にlineを<body>から削除します。アニメーションが終わると自動的に画面から消え、不要な要素が残らないようにしています。
  setTimeout(function () {
    document.body.removeChild(line);
  }, 6000);
}
// 一定の時間を置いて繰り返す（光の量に比例する） setIntervalを使い、createLines関数を700ミリ秒ごとに繰り返し実行します。これにより、定期的に新しい光の点が生成され、画面上に連続的なアニメーション効果が生まれます。
setInterval(function () {
  createLines();
}, 700);
