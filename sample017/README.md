Javascrip:Location API（ロケーション） を使ってページごとにJavaScriptの処理を分ける方法 20250404

WordPress:Location APIで取得したURLを元に条件分岐し、各ページごとに処理を分ける方法 20250404


Location API とは：
オブジェクト です。ブラウザの window オブジェクトの一部であり、現在のURLやその各要素（プロトコル、ホスト名、パスなど）にアクセスするために使用されます。
Locationオブジェクトは、現在のウェブページの位置情報（URL）を表します。

注意点:Location APIはクライアントサイドの技術
Location APIはブラウザ内で動作するクライアントサイドのWeb APIです。
そのため、ブラウザで動作するJavaScriptを通じてのみアクセスできます。
サーバーサイドの言語であるPHPやPythonなどでは直接的にLocation APIを扱うことはできません。


Locationオブジェクトの主なプロパティ

プロパティ名	            説明	                                    例
href	        URL全体を取得または設定します。	            'https://example.com/path'
protocol	    URLのプロトコル（http: や https: など）。	'https:'
hostname	    ホスト名（ドメイン名やIPアドレス）。	     'example.com'
host	        ホスト名＋ポート番号（ポート番号があれば）。  'example.com:80'
pathname	    URLのパス（ホスト名以降のパス部分）。	     '/path/to/page'
search	        クエリ文字列（? 以降の部分）｡               '?id=123&name=test'
hash	        アンカー（＃以降の部分）。	                '#section1'
origin	        URLのスキーム（protocol）、	               'https://example.com:443'
                ホスト名（hostname）、
                およびポート番号を含む基盤URLを取得。

Locationオブジェクトの主なメソッド

メソッド名	                説明	                                                例
assign(url)	    指定したURLにページを遷移します（履歴に残ります）。	            location.assign('https://example.com');
reload()	    現在のページをリロード（再読み込み）します。	                location.reload();
replace(url)	指定したURLにページを遷移しますが、履歴には残りません。	         location.replace('https://example.com');
toString()	    href を文字列として返します（内部的に location.href を使用）。	location.toString(); // 'https://example.com/path'


Location APIを使ったドメインでの条件分岐例
以下は、Location APIのhostnameプロパティを使って、ホスト名（ドメイン）ごとに処理を分ける例です：

コード例 1: 環境ごとに分岐
javascript
if (location.hostname === 'localhost') {
    console.log('ローカル環境での処理');
} else if (location.hostname === 'example.com') {
    console.log('本番環境での処理');
} else {
    console.log('その他の環境での処理');
}
用途:

ローカル（開発用）環境と本番環境を切り替えたい場合。
ステージング環境や特定のサブドメインを考慮する場合。


コード例 2: サブドメインでの条件分岐
javascript
if (location.hostname === 'admin.example.com') {
    console.log('管理画面専用の処理');
} else if (location.hostname === 'shop.example.com') {
    console.log('ショップページ専用の処理');
} else {
    console.log('通常のサイト処理');
}
用途:

サブドメインごとにデザインや機能を切り替える場合。
複数ドメインやサービスを統合的に管理する場合。

コード例 3: ドメイン全体で特定の処理を実行
javascript
if (location.hostname.includes('example.com')) {
    console.log('example.comに関連する共通処理');
}
用途:

特定のドメイン内で共通処理を適用する場合（サブドメインを含む）。


Location APIの活用ポイント
hostname: ドメイン名のみを取得（例: example.com）。

origin: プロトコルとドメインを含むURL全体を取得（例: https://example.com）。

href: URL全体（例: https://example.com/path）。

pathname: ページのパス部分（例: /path）。


Location APIを使うメリット
開発と本番の切り替えが簡単: 開発者環境に依存した処理や、本番でのみ実行されるべき処理を明確に分けることができます。

複数ドメインやサブドメインの管理: ドメインに応じて個別のスクリプトやスタイルを適用することが可能です。

管理画面や特定ページの出し分け: サブドメインやクエリパラメータを併用することで、柔軟な条件分岐が可能になります。



応用例

Location APIと、ページごとにJSの処理を分ける方法について

if (location.pathname === '/') {
    トップページでやりたい処理
    console.log('トップでやりたい処理')
} else if (location.pathname === '/member/') {
    メンバーページでやりたい処理
    console.log('メンバーページでやりたい処理')
}
; URLのパス部分を基に処理を分ける。
; 例: トップページ（/）とメンバーページ（/member/）で異なる動作を設定。

HTMLのbodyタグのクラス名を取得 (document.querySelector) を使った条件分岐。

if (document.querySelector('body.home')) {
    トップページでやりたい処理
    console.log('トップでやりたい処理')
} else if (document.querySelector('body.contact')) {
    console.log('お問い合わせページでやりたい処理')
}
; WordPressのbody_classで設定されるクラス名を基に、特定のページでのみ動作を設定。






WordPress
Location APIで取得したURLを元に条件分岐し、各ページごとに処理を分ける方法

1. 概要
body_class: WordPressのテーマで使用されるPHP関数で、各ページに応じたクラス名を<body>タグに追加します。たとえば、home や特定の固定ページスラッグがクラスとして適用されます。
Location API: JavaScriptのWeb APIで、現在のページのURL情報（ドメイン、パス、クエリパラメータなど）を取得・操作できます。
これらを組み合わせることで、PHPでページ固有のクラスを付加し、JavaScriptでそのクラスやURLパスに基づいた条件分岐を実装できます。

2. 実装例
Step 1: PHPでbody_classを利用してページクラスを追加
WordPressのbody_class関数は、ページごとのクラスを動的に生成します。例えば、以下のようにPHPで<body>にクラスを適用します。

header.phpの例:
; phpテンプレートタグをhtml内に記述
<body <?php body_class(); ?>>

Step 2: 追加されるクラスの例
body_class()によって以下のようなクラスが自動的に追加されます：

トップページ: <body class="home">
固定ページ（例: Aboutページ）: <body class="page-about">
投稿ページ: <body class="single-post">

Step 3: JavaScriptでLocation APIと併用
JavaScriptを使用して、body_classによって付加されたクラスを基に処理を分けることができます。
また、Location APIを使ってURLのパスも活用します。

JavaScriptの例:
javascript
// bodyタグのクラス名を基に条件分岐
if (document.body.classList.contains('home')) {
    console.log('トップページの処理を実行');
} else if (document.body.classList.contains('page-about')) {
    console.log('Aboutページの処理を実行');
}

// Location APIを併用してさらに柔軟に条件分岐
if (location.pathname === '/') {
    console.log('トップページです');
} else if (location.pathname.includes('/about')) {
    console.log('Aboutページです');
}
3. 応用例
例 1: ボタンの挙動をページごとに変更
特定のページにだけボタンを表示したい場合：

javascript
if (document.body.classList.contains('contact')) {
    const contactButton = document.createElement('button');
    contactButton.textContent = 'お問い合わせ';
    document.body.appendChild(contactButton);
}
例 2: ページごとのスライダーを切り替える
javascript
if (document.body.classList.contains('home')) {
    initializeSlider('fullscreen');
} else if (document.body.classList.contains('category-news')) {
    initializeSlider('small');
}

function initializeSlider(type) {
    console.log(`${type} スライダーを初期化`);
}
例 3: Location APIでクエリパラメータを取得
URLクエリパラメータを使用してフィルタリングを実装。

javascript
const params = new URLSearchParams(location.search);
if (params.has('promo')) {
    console.log('プロモーションページ: ', params.get('promo'));
}
4. メリットと注意点
メリット
コードの整理が容易: PHPでページクラスを付けておくと、JavaScriptでの処理が簡潔になります。
柔軟性の向上: Location APIを併用することで、より細かい条件分岐が可能。
パフォーマンスの向上: ページごとに必要な処理だけを実行することで、無駄を削減。

注意点
スクリプトの依存関係: wp_enqueue_script()で適切にスクリプトを読み込む。

セキュリティ: PHPで埋め込むデータは必ずエスケープ処理（例: esc_js()）を行う。

重複処理の排除: Location APIとbody_classを適切に組み合わせ、無駄な条件分岐を避ける。



MDN Web Docs / Location API
https://developer.mozilla.org/ja/docs/Web/API/Location

Location API（ロケーション） とそれを使ってページごとにJavaScriptの処理を分ける方法！WordPressでページごとに処理を分ける方法も
https://www.youtube.com/watch?v=RjmBSGnizDU