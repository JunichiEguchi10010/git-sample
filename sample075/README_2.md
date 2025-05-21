html css ピクセルパーフェクト 20250521

✅ ピクセルパーフェクト「あるある」& 修正方法

▼ レイアウト編
✅ 1pxズレる（paddingやborderが原因）
　🔧 対処法：box-sizing: border-box; を全要素に指定。レイヤー構造を再確認。

✅ widthの合計が合わない
　🔧 対処法：padding・border・marginを含めて合計を再計算。Chrome DevToolsで要素サイズを確認。
✅ DevTools で要素サイズを確認する手順
① DevTools を開く
対象のページで、該当の要素上で 右クリック →「検証」（または F12 キー）

DevTools が開き、Elements（要素）タブがアクティブになります

② 「Elements（要素）」タブで要素を選択
HTML構造 が左側に表示されています。

チェックしたい要素（例：<div class="container">など）をクリックすると、
　右側の Styles・Computed・Layout などの情報が表示されます。

③ 「Computed（計算済み）」タブを開く
右側パネルの中にある Computed タブをクリックします
　※「Styles」や「Layout」タブの隣にあります。

④ Box Model の図を確認する
「Computed」タブの下部に、以下のような ボックスモデル図 が表示されます：
css
┌──────────────┐
│  margin     │
│ ┌──────────┐ │
│ │ border   │ │
│ │ ┌──────┐ │ │
│ │ │padding│ │ │
│ │ │ content │ │
│ │ └──────┘ │ │
│ └──────────┘ │
└──────────────┘
各エリア（margin, border, padding, content）の数値(px) が視覚的に表示されるので、実際のサイズ感を一目で確認できます。

⑤ ヒント：数値の意味と合計の見方
項目	内 容
Content	要素のwidth / height の値
Padding	要素の内側の余白（CSSの padding）
Border	要素の境界線（border）
Margin	要素の外側の余白（margin）

➡ 例：
width: 300px; padding: 20px; border: 2px; の場合、実際に占める幅は：

css
300（content）+ 20×2（padding）+ 2×2（border）＝ 344px
✅ 補足：Layout タブの「Flex」や「Grid」情報

要素が display: flex や grid の場合は、「Layout」タブを開くとレイアウト構造の視覚確認ができます（※Chrome 106以降）。

そこでは flex item のサイズ配分 や gap の大きさ も確認可能です。

🔚 まとめ
🔍 確認ポイントの場所まとめ：

確認したいこと	DevTools のタブ	内容
padding, border, margin	Elements → Computed	ボックスモデルで確認可能
実際の幅・高さ	Elements → Computed	width, height の数値を確認
Flex や Grid の挙動	Elements → Layout	レイアウト構造の可視化

✅ margin相殺（collapse）を忘れて余白が少ない
　🔧 対処法：親要素に overflow: hidden; または padding を加えることで回避可能。

✅ box-sizingの指定漏れでズレる
　🔧 対処法：* { box-sizing: border-box; } をCSSの最上部に設定しておく。

✅ 画像のアスペクト比が崩れる
　🔧 対処法：object-fit: cover; または width/height をカンプに合わせて固定。
    レスポンシブ時はaspect-ratioを指定。

✅ display: inline-blockの隙間問題
　🔧 対処法：親要素の font-size: 0; を指定し、子要素に再設定 or flexbox に切り替える。

▼ フォント・テキスト編
✅ line-heightが正確に合わない
　🔧 対処法：デザインカンプの行間(px) ÷ フォントサイズ(px) で計算して line-height を設定。

✅ letter-spacingが効いてない or 多すぎる
　🔧 対処法：PhotoshopやFigmaでカーニングをpxで確認し、CSSにそのまま letter-spacing を反映。
    レスポンシブ対応の幅や余白は rem/em で調整し、文字間隔だけは px のままにする
    → letter-spacing は特に視覚的なズレが出やすいため、px で固定しておく方法もよくある

✅ ウェブフォントのFOUTでズレる
　🔧 対処法：font-display: swap; や font-display: optional; の設定。
　　　読み込み前のフォールバックフォントの調整も有効。
    おすすめのフォールバックフォント設定（日本語＋英語混在を想定）
    css
    font-family: 'Noto Sans JP', 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
    🔍 それぞれの意味とおすすめ理由
    フォント名	目的・特徴
    'Noto Sans JP'	Google FontsなどのWebフォント。第一優先（理想フォント）
    'Helvetica Neue', Helvetica, 'Segoe UI', Arial	欧文用の読みやすい代替フォント（OS標準フォント）
    'Hiragino Kaku Gothic ProN'	macOSの日本語ゴシック体（きれいな代替候補）
    Meiryo	Windowsの標準ゴシック体（多くのPCに入っている）
    sans-serif	最終的な汎用代替フォント（必須）

✅ FOUT（Flash of Unstyled Text）対策の設定ポイント
フォントサイズ・行間（line-height）を固定

    css
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.5px; /* カンプに合わせて */
    font-display: swap を設定して読み込み遅延対策

    Google Fontsの読み込みで以下のように設定：

    html
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
    swap は一時的にフォールバックフォントで表示し、あとからWebフォントに切り替える方式（レイアウトズレを最小化）


✅ ブラウザ間で文字の見え方が違う
　🔧 対処法：リセットCSS・Normalize.cssで差を抑え、-webkit-font-smoothing などで調整。

✅ rem/emの変換がズレる
　🔧 対処法：基本ルール（1rem = 16pxなど）を守り、早見表やSass関数を活用してミスを防ぐ。

▼ ブラウザ・検証編
✅ カンプと比べるとフォントが微妙に太い/細い
　🔧 対処法：カンプと同じフォント（ウェイト含む）を確認し、Google Fonts等で同じものを使う。

✅ PerfectPixelの重ね合わせがズレている
　🔧 対処法：拡張機能の透過率と位置を微調整。
    スクロールがあるページではスクロール位置も一致させる。

✅ モバイルで文字が改行される/伸びる
　🔧 対処法：word-break: keep-all; や white-space: nowrap;、min-width の見直し。

✅ スクロールバーの有無で横幅がズレる
　🔧 対処法：スクロールバーを常時表示（overflow-y: scroll;）にする、または中央配置を transform などで調整。

▼ 単位・計算ミス編
✅ 16px → 1rem の変換をミスる
　🔧 対処法：SassのmixinやPostCSSの postcss-pxtorem を使って自動変換。

✅ calc() を使っても合わない
　🔧 対処法：単位の違いを見直す（例：rem と % の混在）＋括弧でしっかり囲う。

✅ paddingやgapが % や vw でズレる
　🔧 対処法：特にヘッダーやセクションタイトルは px か rem に固定し、レスポンシブは @media で個別に調整。

✅ font-sizeの親子関係で em がズれる
　🔧 対処法：重要なテキストは rem を使い、em は限定的（padding/margin）に使う。

▼ コーディング効率・構造編
✅ カンプを信じすぎて細部を見落とす
　🔧 対処法：Figmaなどで測り直して、実寸とのズレがないか確認。

✅ 1つ直すと他のレイアウトがズレる
　🔧 対処法：全体構造をFlex/Gridで組んで、余白はなるべく共通化。BEMなど命名規則で制御しやすく。

✅ position: absolute だらけで崩れやすい
　🔧 対処法：原則はフロー構造、どうしても必要な箇所だけにabsoluteを使う。

✅ 保守性が低くなる（見た目優先でベタ書き）
　🔧 対処法：再利用可能なコンポーネント設計（例えば「カード」「ボタン」などに分離）を意識。


