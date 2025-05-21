html css ピクセルパーフェクト 20250521

✅ ChatGPTにズレを解析してもらう手順

✅① PerfectPixel等でカンプと重ねる
Chrome拡張「PerfectPixel by WellDoneCode」などで、FigmaやPSD書き出し画像をオーバーレイ表示

ズレが分かる状態にしておく

✅② その状態の画面をスクリーンショット
Windowsなら Windows + Shift + S（Snipping Tool）
macOSなら Cmd + Shift + 4

オーバーレイが見える状態で撮影するのがポイント

✅③ 問題の該当コードも一緒に送る
HTMLとCSS（またはSCSSなど）の該当部分だけでOKです

ズレてる要素のクラス名や構造が分かるように

✅④ ChatGPTに添付して質問
「このスクリーンショットの赤い枠と表示されている要素にズレがあります。原因はどこにある可能性がありますか？」
のように聞いてもらえれば、ズレの傾向やコード上のポイントを分析します。

✅ 解析できることの例
文字位置やサイズ（line-height / letter-spacing / font-family の差）

要素のpadding / margin / widthの違い

positionやtransformによるズレ

box-sizingの指定ミス

borderやoutlineが影響しているケース

フォントのFOUT（表示前のちらつき）

✅ 補足：より正確な解析に役立つ情報
カンプのスクリーンショットに目盛り（ルーラー）が表示されていると、ズレ幅が分かりやすいです

使用しているWebフォントが何か
FigmaやPhotoshopでの指定値（例：letter-spacing: -0.2px など）