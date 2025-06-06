Google Fonts Googleフォント チュートリアル 20250607

✅ 1. Googleフォントとは？
Googleが提供する無料のWebフォントライブラリです。
誰でも自由に商用利用可能で、日本語フォントも徐々に増えてきています。

✅  Googleフォントの導入方法
企業サイトでは、CDNを利用する方法 と ローカルにホスティングする方法 の2つがあります。

🟨CDNを利用する場合（簡単）
HTMLの <head> に以下を追加するだけで使用できます。
html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">

🟨ローカルにホスティングする場合（高速化）
Google Fonts からフォントをダウンロード
.ttf や .woff ファイルをサーバーにアップロード

@font-face を使って適用

css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2');
}

body {
  font-family: 'MyFont', sans-serif;
}

🟨.ttf や .woff ファイルをサーバーにアップロードする方法

1. フォントを選ぶ
まず、使用したいフォントを決めます。
Google Fonts（無料で使えるWebフォント）→ Google Fonts
フリーフォントサイト（商用利用可能なフォントも多数）→ こちら
購入フォント（Adobe FontsやMyFontsなど）

2. フォントをダウンロード
フォントをダウンロードする方法は、サイトによって異なりますが、一般的な手順は以下の通りです：

Google Fontsの場合
Google Fonts にアクセス
使いたいフォントを検索
「Download family」ボタンをクリック
.zip ファイルがダウンロードされる

フリーフォントサイトの場合
フォントサイトにアクセス（例：こちら）
フォントを選択
「ダウンロード」ボタンをクリック
.zip ファイルがダウンロードされる

3. フォントファイルを解凍
ダウンロードした .zip ファイルを解凍すると、 .ttf や .woff などのフォントファイルが含まれています。

Windowsの場合
.zip ファイルを右クリック
「すべて展開」を選択
フォルダが作成され、中にフォントファイルが入っている

Macの場合
.zip ファイルをダブルクリック
自動的にフォルダが作成される

4. フォントをインストール（PCで使用する場合）
フォントをPCで使用する場合、インストールが必要です。

Windowsの場合
.ttf や .otf ファイルをダブルクリック
「インストール」ボタンをクリック

Macの場合
.ttf や .otf ファイルをダブルクリック
「フォントをインストール」ボタンをクリック

5. フォントをWebサイトで使用（ホスティング）
Webサイトでフォントを使用する場合、 .woff や .woff2 ファイルをサーバーにアップロードし、CSSで指定します。

フォントファイルをサーバーにアップロード
.woff や .woff2 ファイルを /fonts/ フォルダにアップロード

FTPソフト（FileZillaなど）やホスティングサービスのファイルマネージャーを使用

CSSでフォントを適用
アップロードしたフォントをCSSで指定します。

css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2'),
       url('/fonts/MyFont.woff') format('woff'),
       url('/fonts/MyFont.ttf') format('truetype');
}

body {
  font-family: 'MyFont', sans-serif;
}

6. フォントの最適化（サブセット化）
フォントファイルが大きすぎる場合、サブセット化 して不要な文字を削減すると、サイトの読み込み速度が向上します。

まとめ
フォントを選ぶ（Google Fontsやフリーフォントサイト）
ダウンロードする（.zip ファイル）
解凍する（.ttf や .woff を取り出す）
PCにインストールする（ローカルで使用）
Webサイトで使用する（サーバーにアップロード & CSSで適用）
最適化する（サブセット化で軽量化）


🟨Viteを使う場合
フォントファイル（.woff や .ttf）をどこに配置するかはプロジェクトの構成によりますが、
一般的には public フォルダ または src/assets フォルダ に入れるのが適切です。

フォントファイルの配置方法

① public フォルダに配置する（推奨）
public フォルダにフォントを入れると、Viteのビルド時にそのまま公開され、URLで直接アクセスできます。

フォルダ構成例

/public/fonts/MyFont.woff2
/public/fonts/MyFont.woff
CSSで適用

css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2'),
       url('/fonts/MyFont.woff') format('woff');
}
この方法では、フォントファイルがそのまま公開されるため、Viteのビルド時に変更されません。


② src/assets フォルダに配置する
src/assets にフォントを入れると、Viteのビルド時に dist/assets/ に変換されます。

フォルダ構成例

/src/assets/fonts/MyFont.woff2
/src/assets/fonts/MyFont.woff
CSSで適用

css
@font-face {
  font-family: 'MyFont';
  src: url('./assets/fonts/MyFont.woff2') format('woff2'),
       url('./assets/fonts/MyFont.woff') format('woff');
}
この方法では、Viteのビルド時にパスが変更される ため、適用時に注意が必要です。


🟨どちらを選ぶべき？
public に配置 → URLが固定されるので、簡単に管理できる（推奨）
src/assets に配置 → Viteのビルド時に最適化されるが、パスの変更に注意が必要

もし、フォントをCDNではなくローカルでホスティングしたい場合は、public/fonts/ に配置するのが簡単です。


🟨フォントをCDNかローカルどちらを使うのが一般的ですか？
フォントをCDNで使うかローカルでホスティングするかは、用途や目的によって異なります。

CDN（コンテンツデリバリーネットワーク）
メリット
 ✅ 簡単に導入できる → <link> をHTMLに追加するだけで使用可能 
 ✅ 高速な読み込み → 世界中のサーバーから最適な場所で配信される 
 ✅ キャッシュの活用 → ユーザーのブラウザにキャッシュされ、再読み込みが速い 
 ✅ 最新バージョンが自動適用 → フォントの更新が自動で反映される

デメリット 
❌ 外部依存 → CDNがダウンするとフォントが読み込めなくなる 
❌ プライバシーの懸念 → 一部のCDNはユーザーのアクセスデータを収集する可能性がある 
❌ カスタマイズが難しい → フォントのサブセット化（不要な文字の削減）ができない

代表的なCDN
Google Fonts
Adobe Fonts
Font Awesome

ローカルホスティング
メリット 
✅ 完全なコントロール → フォントのカスタマイズやサブセット化が可能
✅ 外部依存なし → CDNの障害に影響されない
✅ プライバシー保護 → ユーザーのデータを外部に送らない
✅ オフライン環境でも使用可能 → ローカル環境での開発に最適

デメリット
❌ サーバー負荷が増える → フォントファイルを自分のサーバーで管理する必要がある
❌ 手動更新が必要 → フォントの新バージョンが出ても自動更新されない
❌ 初回読み込みが遅くなる可能性 → キャッシュがない場合、最初のロードが遅くなる

ローカルホスティングの方法
フォントをダウンロード（例：Google Fonts）
.woff2 や .ttf ファイルを /fonts/ フォルダにアップロード
CSSで @font-face を設定

css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/MyFont.woff2') format('woff2'),
       url('/fonts/MyFont.woff') format('woff');
}

🟨どちらが一般的？
一般的にはCDNがよく使われます。特にGoogle Fontsは多くのWebサイトで利用されています。
ただし、企業サイトやパフォーマンスを重視する場合は、ローカルホスティングを選ぶこともあります。

選び方のポイント
個人ブログや一般サイト → CDN（簡単・高速）
企業サイトや高パフォーマンスが必要なサイト → ローカル（カスタマイズ・安定性）
オフライン環境やプライバシー重視 → ローカル
どちらを選ぶかは、サイトの目的や運用方針によります！


CDNを使うべきケース
✅ 画像や動画が多い → 高品質な画像や動画を多用する場合、CDNを使うと読み込み速度が向上
✅ アクセス数が多い → 企業サイトでも全国・海外からのアクセスがある場合、CDNで負荷分散が可能
✅ SEOを強化したい → ページの表示速度が速くなることで、検索順位の向上につながる
✅ セキュリティを強化したい → DDoS攻撃対策やキャッシュによる負荷軽減が可能

CDNを使わなくても良いケース
❌ シンプルな構成（テキスト中心） → 画像や動画が少なく、軽量なサイトならCDNなしでも十分
❌ アクセス数が少ない → ローカル企業のサイトで、主に特定地域のユーザー向けなら不要
❌ サーバーが高速 → 高性能なサーバーを使用している場合、CDNなしでも十分な速度が出る

結論
企業用ホームページが10ページ程度で、画像や動画が少なく、アクセスが限定的ならCDNは不要です。 
しかし、全国・海外からのアクセスがある場合や、パフォーマンスを重視するならCDNを導入する価値があります2。


🟨具体的な手順

1. 使い方の流れ（Webサイトで使う場合）
手順①：フォントを探す
Google Fontsのサイトへアクセス。

上部の検索ボックスにフォント名を入力するか、カテゴリ（Serif, Sans Serif, Handwritingなど）や言語（日本語は「Japanese」）で絞り込み。

気になるフォントの 「＋」マーク をクリックすると、右下にパネルが開きます。

手順②：埋め込みコードを取得する
パネルを開くと、2つのタブが出ます：

Embed（埋め込み）：HTMLに使うコード

@import：CSSに直接使うコード

🟨方法1：HTMLに <link> タグを追加
html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
</head>

🟨方法2：CSSファイルに @import を記述
css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
✅ display=swap は読み込み中でも代替フォントを使って表示されるようにするオプションです（ユーザビリティ向上）。


手順③：CSSでフォントを指定する
css
body {
  font-family: 'Noto Sans JP', sans-serif;
}

💾 3. フォントファイルをダウンロードする方法（ローカル使用）

手順①：フォントを選ぶ
Google Fontsのページで使用したいフォントを選びます。

手順②：右上の「Download family」をクリック
ZIPファイルがダウンロードされ、中に .ttf や .otf フォントファイルが入っています。

手順③：使い方
デザインツール（Figma、Adobe XDなど）に読み込む
WindowsやMacにインストールしてOfficeやPhotoshopで使う
Webサーバーにアップして @font-face を使ってWebで使う（下記参照）


📦 Webに自前でホストしたい場合（上級者向け）
css
@font-face {
  font-family: 'MyNotoSansJP';
  src: url('/fonts/NotoSansJP-Regular.woff2') format('woff2'),
       url('/fonts/NotoSansJP-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
body {
  font-family: 'MyNotoSansJP', sans-serif;
}
※Webフォントを自前でホストする場合は、必ずWoff形式に変換して圧縮しましょう。
→ Transfonterなどの変換ツールがおすすめです。

⚠️ 4. 注意点とベストプラクティス
✅ 表示速度に注意（パフォーマンス）
フォントの読み込みは表示速度に影響します。
使用するウェイト（Regular, Boldなど）は必要最低限に。
display=swap を付けて、読み込み中のブロックを回避。

✅ ライセンス確認は不要（Google Fontsは商用利用OK）
すべてのGoogle Fontsは商用利用OK・再配布OKです。

✅ 日本語フォントはファイルサイズが大きい
Noto Sans JP などは1MBを超えることもあります。

表示に時間がかかる可能性あり。必要なウェイトだけ選ぶのが重要。

✅ CSSでのフォールバック設定も忘れずに
css
font-family: 'Noto Sans JP', sans-serif;

📌 まとめ
ステップ	内容
①	Google Fontsからフォントを選ぶ
②	埋め込みコード（link/@import）を取得
③	CSSに font-family を記述
④	必要に応じてローカル保存や自前ホスティング

公式Google Fonts
https://fonts.google.com/