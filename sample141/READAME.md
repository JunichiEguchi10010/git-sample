画像の一部を切り出して表示するスニペット 20250804

🧩概要：画像の切り出しとは？
画像の切り出しには以下のような目的があります：
画像の一部だけを拡大表示したい（例：製品詳細、地図ズーム）
不要な領域を隠したい
マウス操作で動的に見せたい

技術的には、CSSで表示領域を制限するか、Canvas APIなどで画像を加工することができます。
ここではまず、CSSのみでクリッピング（切り出し）表示する方法にフォーカスします。
JavaScriptでは切り出し位置の動的制御もできます。


🎯このコードで何をしているか？
→ 1枚の背景画像の中から、一部を切り出して表示するエリア（ビューウィンドウ）を作る
→ ユーザーが操作することで、どの部分を見せるかを変えることができるインタラクティブな仕組み

🛠️主要構成要素（HTML＋CSS＋JavaScript）
① HTML：切り出し表示用のエリア（div要素）
html
<div id="crop-area"></div>
id="crop-area" が、画像を表示する領域
CSSでこのエリアに背景画像を指定し、サイズや表示位置を制御

② CSS：画像の切り出しスタイル
css
#crop-area {
  width: 200px;
  height: 200px;
  background-image: url('image.jpg');
  background-position: 0px 0px;
  background-repeat: no-repeat;
}
この200px × 200pxの枠内に、背景画像の一部だけを表示
background-position を動かすことで「見える範囲」を変更

③ JavaScript：表示位置を変更する関数
javascript
function setCrop(x, y) {
  const crop = document.getElementById('crop-area');
  crop.style.backgroundPosition = `-${x}px -${y}px`;
}
x と y に応じて、背景画像を左・上にずらして表示
つまり「(x, y) の位置を起点とする切り出し表示」

🎮 使用方法の一例（ボタンやセレクトボックスで連携）
html
<button onclick="setCrop(0, 0)">左上</button>
<button onclick="setCrop(100, 100)">中央</button>
<button onclick="setCrop(200, 200)">右下</button>
ユーザーが操作すると「表示される位置」が変わる

🔍全体イメージのまとめ
構成	役割
HTML	表示領域を定義（crop-area）
CSS	    背景画像をセットし、切り出しサイズ・初期位置を決定
JS	    ユーザー操作によって表示位置を変更する

今後は：
マウス操作やドラッグ対応
スライダー連携で自由なスクロール
Vue/Reactと組み合わせた動的表示
などに発展できる