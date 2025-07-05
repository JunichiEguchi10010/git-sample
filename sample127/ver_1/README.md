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