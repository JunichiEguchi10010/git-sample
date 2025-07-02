WebDesign WebP対応のレスポンシブな<picture>タグのスニペット 20250702

<picture>
  <!-- WebP形式（モダンブラウザ向け） -->
  <source 
    srcset="
      images/sample-image-480.webp 480w,
      images/sample-image-768.webp 768w,
      images/sample-image-1200.webp 1200w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
    type="image/webp"
  >

  <!-- JPEG形式（非対応ブラウザ向けフォールバック） -->
  <source 
    srcset="
      images/sample-image-480.jpg 480w,
      images/sample-image-768.jpg 768w,
      images/sample-image-1200.jpg 1200w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
    type="image/jpeg"
  >

  <!-- 最終フォールバック（最小サイズ指定） -->
  <img 
    src="images/sample-image-768.jpg" 
    alt="サンプル画像の説明文" 
    loading="lazy" 
    decoding="async" 
    width="100%" 
    style="height:auto;"
  >
</picture>

✅ 技術要件・補足ポイント
要件	                        内容
WebP対応	            <source type="image/webp">で優先読み込みされ、対応ブラウザで自動使用。
フォールバック	        image/jpegを追加して、WebP非対応ブラウザ（例：Safari旧版）もカバー。
レスポンシブ対応	    srcset + sizesで表示幅に応じた画像サイズを出し分け。
パフォーマンス最適化	loading="lazy"で遅延読み込み、decoding="async"で非同期デコードを指定。
アクセシビリティ	    alt属性で視覚的代替テキストを記述。
安全対策	            <img>にフォールバック画像を設定することで<source>が失敗しても表示保証。

「フォールバック画像」とは、メインで表示しようとしている画像が何らかの理由で表示できない場合に代わりに表示される画像のことです。


✅ 運用上の注意点
各画像サイズ（例: 480px, 768px, 1200px）は適切に圧縮・リサイズした画像をあらかじめ用意してください。
sizesの値は使用するレイアウトに応じて変更してください（例：1カラムなら100vw）。
WordPressの場合は<picture>を自動生成するプラグイン（例：WebP Express, EWWW Image Optimizer）なども併用できます。