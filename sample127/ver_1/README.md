YouTube動画をレスポンシブ対応で埋め込むためのスニペット 20250705

動画のアスペクト比（16:9など）を維持しつつ、スマホやPCでも最適表示されるように設計しています。

✅ 技術要件
要素	        内容
レスポンシブ	aspect-ratio または padding-bottom を使って動画の縦横比を維持する
埋め込み	    iframe タグで YouTube を埋め込み、JavaScript は別ファイルで読み込み、解説付き
保守性	        クラス設計により複数動画の対応が可能

✅ 疑似コード
1. HTMLで動画を埋め込むdivを作る
2. divの中にiframe（YouTube動画）を入れる
3. CSSで親divにアスペクト比を指定してレスポンシブ対応
4. iframeは親のサイズに合わせて100%に広がるようにする
5. JavaScriptファイルで後からiframeを生成・挿入しても対応できるようにする

✅ 補足ポイント
複数の動画に対応：querySelectorAll で複数動画でもOK。
JavaScriptで後から埋め込み可能：例えばAjaxで追加した場合にも対応可能。
SEO/初期描画が重要な場合はHTML直埋めが推奨。
aspect-ratio対応ブラウザ：モダンブラウザなら対応済み。
IEなど古い環境向けにはコメント内の padding-bottom バージョンを使ってください。



✅ <iframe> タグとは？
iframe（inline frame） は、別のウェブページや動画、地図などを現在のページ内に埋め込むためのHTMLタグです。
簡単に言うと、「ページの中に小さな別ページの窓を開けるタグ」です。

✅ 代表的な使用例
✅ YouTube動画を埋め込む
html
<iframe 
  src="https://www.youtube.com/embed/動画ID" 
  width="560" 
  height="315"
  allowfullscreen>
</iframe>

✅ 基本構文
html
<iframe src="URL" width="横幅" height="高さ" その他の属性></iframe>
属性名	内容
src	                埋め込む先のURL（例：YouTube、GoogleMapなど）
width	            幅（pxまたは%など）
height	            高さ
frameborder	        枠線の有無（0で非表示、1で表示。現在は非推奨）
allowfullscreen	    全画面表示を許可する
allow	            動作の許可設定（動画・音声・ジャイロなど）
title	            アクセシビリティ対応（iframe内の内容説明）
loading	            遅延読み込み（lazyを使うとページ速度が改善される）
sandbox	            セキュリティ制限（スクリプトやフォーム送信を制限）

✅ 実際の例（属性付き）
<iframe
  src="https://www.youtube.com/embed/Px2Xyt2MhsU?start=1331"
  width="560"
  height="315"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

✅ よく使う allow の設定
設定値	                    説明
autoplay	            自動再生を許可（多くのブラウザで無音必須）
encrypted-media	        DRMなど保護されたコンテンツの再生
picture-in-picture	    ピクチャーインピクチャー表示（小窓）
fullscreen	            全画面表示許可（allowfullscreen とセット）

✅ 注意点・実務で気をつけること
外部サイトのポリシーにより埋め込みできない場合がある
例：一部のYouTube動画や有料動画、企業サイトなどは埋め込み禁止設定にされています。
レスポンシブ対応は手動でCSS設定が必要
幅・高さを％やaspect-ratioなどで調整する必要があります。
セキュリティ対策
iframeで読み込む内容が信頼できない場合、sandbox属性を使うと安全です。

✅ 他にも iframe で埋め込めるもの
埋め込み先	             例
YouTube	                動画
Google Maps	            地図
他のHTMLページ	        サブページ、外部サービス（例えばカレンダー）など
PDFファイル	            PDFビューア
Twitter/Instagramなど	投稿の埋め込み（専用スクリプトが必要な場合あり）

✅ まとめ
項目	        ポイントまとめ
用途	        ページ内に「別ページ」や動画を表示するため
基本属性	     src, width, height, allowfullscreenなど
注意点	        埋め込み許可が必要・レスポンシブはCSS必須
実務での扱い	 静的ページならHTML直書き、動的ならJS生成もあり

<iframe> タグと <video> タグは全く用途が異なるタグです。

✅違い:
タグ	    主な目的
<video>	    自分の用意した動画ファイルを再生する
<iframe>	他サイトのコンテンツ（YouTubeなど）を埋め込む

✅ それぞれの使い方と違い
✅ <video> タグの使い方（ローカル動画）
html
<video controls width="640" height="360">
  <source src="movie.mp4" type="video/mp4">
  ブラウザが video タグに対応していません。
</video>
✅ ファイル形式は .mp4, .webm, .ogg など
✅ 動画ファイルは 自分のサーバー上にある必要あり
❌ YouTubeなどの外部サービスのURLは使えない

✅ <iframe> タグの使い方（YouTubeなど外部コンテンツ）
html
<iframe 
  src="https://www.youtube.com/embed/動画ID" 
  width="640" height="360"
  allowfullscreen>
</iframe>
✅ YouTubeやGoogle Mapsなどの外部ページを埋め込む
✅ HTML内に「別のページの窓」を開くようなもの
❌ 自分の動画ファイルを再生する用途には不向き

✅ 機能比較一覧
項目	                       <video> タグ	<iframe> タグ
再生対象	                  自分の動画ファイル	            外部サイトの動画・Webページ
使用例	                      movie.mp4, movie.webmなど	    YouTube、Google Maps、他のWebページ
サーバーに置く必要	           ✅ 必要（動画ファイルを持つ）  ❌ 不要（YouTubeなどがホスト）
スタイルやコントロール制御	    ✅ 細かく制御可能（JS・CSS）  ❌ iframeの中身は基本制御できない
再生の自由度（速度・音量など）	✅ フルコントロール可能	      ❌ 外部サービスの仕様に依存
埋め込みの簡単さ	           ◯ 自分のサーバーにあれば簡単	  ◎ YouTubeなどからタグをコピーするだけ

✅ 実務での使い分け
シーン	                        推奨タグ	        理由
自社製品の紹介動画を載せたい	<video>	        自分のサーバー上のファイルだから
YouTubeの動画を埋め込みたい	   <iframe>	       YouTubeが提供する正式な埋め込み方法だから
Googleマップを載せたい	       <iframe>	       マップはiframeでしか埋め込めない
オリジナル動画を自動再生させたい <video>	    属性やJavaScriptで細かく制御できる

✅ まとめ（覚え方）
🔹 <video> = 自分の動画を見せる
🔹 <iframe> = 他人のサービスを借りて埋め込む