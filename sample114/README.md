WebDesign html css javascript アイコン付きボタン（SVG or font icon + hover animation）20250623

SVGアイコン使用（Font Awesome等に依存しない）

ホバーアニメーション（アイコンが右にスライド）

レスポンシブ対応（ボタンのサイズやフォントが画面幅で調整）

アクセシビリティ対応（aria-labelなど）

応用方法	使いどころ
display: inline-flex	ボタン内のアイコン＋テキスト整列
transition	ホバーエフェクト
gap + align-items	アイコンとテキストの余白調整
@mediaクエリ	レスポンシブ対応（文字・余白縮小）
aria-label	アクセシビリティ向上

✅SVGアイコン:
SVG（Scalable Vector Graphics）形式で作られたアイコンのことです。
SVGは、画像をピクセルではなく「数式やコード」で表現するベクター形式のグラフィックフォーマットなので、ズームしても画質が劣化しないのが最大の特徴です。

特徴：
拡大・縮小しても劣化しない：スマホでも4Kディスプレイでも、キレイに表示できます。
コードでカスタマイズ可能：色、サイズ、線の太さなどをCSSやJavaScriptで変更できます。
ファイルサイズが小さい：PNGやJPGより軽量になることが多く、Webサイトの読み込みが速くなります。
インタラクティブ性がある：アニメーションやクリックイベントも付けられます。

どこで使われるの？
Webサイトのボタンやナビゲーションバーのアイコン
アプリのUIデザイン
ロゴや図解イラストなど

コード例：
<svg class="button-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"> <path d="M5 12h14M12 5l7 7-7 7" />

基本の構造
xml
<svg ...> ... </svg>
このタグの中に描画情報（線や形）が書かれています。

🔸 <svg> タグ内の属性の意味
属性	説明
class="button-icon"	CSSでスタイル指定するためのクラス名。
xmlns="http://www.w3.org/2000/svg"	SVG名前空間：SVGであることを明示。
width="20" height="20"	表示サイズ（ピクセル単位）
fill="none"	塗りつぶしなし（中身が透明）
stroke="currentColor"	線の色を「現在の文字色（CSSで指定された色）」に合わせる
stroke-width="2"	線の太さが2ピクセル
stroke-linecap="round"	線の先端を丸くする
stroke-linejoin="round"	線と線のつなぎ目も丸くする
viewBox="0 0 24 24"	描画座標の基準：SVG内部の座標系が0〜24の範囲であることを示す
🔹 <path> タグの意味
<path> は線や形を描く命令を書くタグで、d 属性にSVG特有の描画コマンドが入っています。

xml
<path d="M5 12h14M12 5l7 7-7 7" />
この d 属性を分解すると：

M5 12 → (5,12)の位置に移動

h14 → そこから水平方向に14進む → つまり「左から右に線を引く」＝横線

M12 5 → (12,5)の位置に移動

l7 7 → そこから右下に斜め線を引く

-7 7 → さらに左下に斜め線を引く

▶️ つまり、形としてはこんな感じの「右向き矢印」を表現しています：

        ↓
     \     /
      →→→