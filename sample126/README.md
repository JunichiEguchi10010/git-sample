WebDesign html css Javascript ライトボックス（画像拡大表示）20250704

📸 ライトボックス（Lightbox）とは？
ライトボックスとは、ウェブページ上の画像をクリックしたときに、画面中央に拡大表示させるための視覚効果・機能です。
背景を暗くして画像を強調表示する「モーダルウィンドウ」の一種で、ユーザーが画像をより大きく、集中して閲覧できるようにします。

✅ 技術要件
項目	            内容
実装言語	        HTML / CSS / JavaScript
ライブラリ	        不使用（純粋なVanilla JS）
対応画像形式	    JPEG / PNG / WebP など
アクセシビリティ	キーボードESC対応、alt属性活用可能
表示方法	        モーダルオーバーレイ式
操作性	            サムネイルクリック → 拡大画像表示 / クリックで閉じる
レスポンシブ対応	 OK


✅ ライトボックス処理のかんたんな流れ
まずは画像を並べる
　小さなサムネイル画像（クリックできる画像）をHTMLに表示します。

画像に大きい画像のURLを持たせる
　それぞれの画像に data-full 属性を使って、拡大表示用の画像のURLをあらかじめ入れておきます。

クリックすると画像が拡大される仕組みをJSで作る
　JavaScriptで以下の動きを設定します：

サムネイルをクリックすると、拡大画像が画面中央に大きく表示される

拡大画像を閉じる方法は3つある：

「×」ボタンをクリックする

背景（黒い部分）をクリックする

キーボードの ESCキー を押す

見た目の調整はCSSで行う
　lightboxの位置を画面の中央に表示し、まわりを暗くしてユーザーの注目を集めるようにスタイル設定します。

✅ 疑似コード（日本語）
text
1. HTML上に小さなサムネイル画像を表示する（クリック可能）
2. 各画像に「data-full」で大きい画像のURLを埋め込んでおく

3. JavaScriptで次の処理を行う
   - サムネイルをクリックしたら：
     → data-fullのURLを取得して、lightbox要素内のimgに設定
     → lightboxを表示（display: flex）

   - 「×」ボタンをクリックしたら：
     → lightboxを非表示
     → 画像URLをクリア

   - lightboxの背景部分をクリックしたら：
     → 同様にlightboxを閉じる

   - キーボードのESCキーを押したら：
     → lightboxを閉じる

4. CSSでlightboxを画面中央に表示し、背景を暗くする
   - 画像は最大幅/高さを設定してレスポンシブに対応