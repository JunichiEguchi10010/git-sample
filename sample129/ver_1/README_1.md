WebDesing PHPMailer（SMTP認証）メールライブラリ 問い合わせフォーム 20250708

📂 フォルダ構成
contact-form/
├── index.html
├── style.css
├── script.js
├── send.php
└── vendor/         ← composer install用（PHPMailer）


🔧 vendor/ フォルダは、Composer を使って PHPMailer をインストールしたときに自動で生成されるディレクトリです。
自分でファイルを手動で入れるのではなく、Composer が作ってくれます。

✅ vendor/ フォルダとは？
項目	説明
用途	Composer が依存ライブラリ（PHPMailerなど）をインストールしてまとめる場所
中身	autoload.php, phpmailer/phpmailer/, その他依存パッケージなど
作り方	自分で作らず、Composer コマンドで自動生成します

📦 vendor/ フォルダの作り方（ComposerでPHPMailerを入れる）
① Composerを使えるようにする（初回のみ）
公式サイト：https://getcomposer.org/ からインストール

Windowsなら「Composer-Setup.exe」でOK

② ターミナルまたはコマンドプロンプトで操作
bash
cd contact-form  # 作業フォルダに移動
composer require phpmailer/phpmailer
⬇ 実行すると、自動で以下が生成されます：

bash
contact-form/
├── index.html
├── style.css
├── script.js
├── send.php
├── composer.json          ← 自動生成
├── composer.lock          ← 自動生成
└── vendor/                ← ← ← ここが自動で作られる
    ├── autoload.php
    └── phpmailer/phpmailer/...
⚠️ 注意：Gitやアップロード時に忘れがち！
vendor/ フォルダはフォームが動作するのに必須です

サーバーにアップするときも vendor/ フォルダごとアップロードしてください

Git管理する場合、.gitignore に入れるケースもあるので注意が必要です（本番にアップするなら含める）

✅ send.php での require 'vendor/autoload.php'; の意味
php
require 'vendor/autoload.php';
これは：
Composerが自動生成する autoload.php を読み込むことで、PHPMailer などのクラスを使えるようにする
という意味です。

🔚 結論
vendor/ は自分で入れる場所ではなく、Composer が自動生成するもの
composer require phpmailer/phpmailer を使えばOK
PHPメールフォームをサーバーで動かすには、vendor/ ごとアップロードが必要


✅ 「vendor/ フォルダを Git に含めるか、除外するか」？
開発目的と運用方法によって使い分けます。

✅ 結論（まずは要点）
使用ケース	vendor/ を Git に含める？
開発中ローカル〜チーム開発（GitHub共有）	                  ❌ .gitignore に追加して除外する
サーバーに直接アップして動かす（WordPressや小規模サイトなど）	✅ Gitに含めて vendor/ も一緒にアップする

🔍 そもそも .gitignore とは？
Gitで追跡しないファイルやフォルダを指定できる設定ファイル
例：
bash
# .gitignore の一例
/vendor/   ←←← PHPMailerなどComposerで生成されるフォルダ
/node_modules/
.env
.gitignore に書かれたフォルダは Git に登録されず、pushもされません

🔁 よくあるシナリオ別の判断
✅ ケース1：チームで開発 → GitHubなどで共有
.gitignore に /vendor/ を書いて除外
代わりに composer.json と composer.lock を Git に含める
bash
# pushするファイル（最低限）
composer.json
composer.lock
.gitignore
send.php（またはindex.phpなど）

# 含めないファイル（.gitignore）
vendor/
サーバーにデプロイ後：

bash
# サーバー側で以下を実行（1回のみ）
composer install
⬇ 自動で vendor/ が再生成され、PHPMailerなども使えるようになります。

✅ ケース2：サーバーにFTPでアップロードして使う（最も多い実務）
Git は自分の管理用。FTPやSFTPでサーバーに手動アップする。
この場合は：
bash
# .gitignore に含めず、vendor/ も Git に入れる
（つまり add → commit → push する）
理由：サーバー側に Composer が無いケースが多く、composer install ができないため
よって、vendor/ も含めてアップロードしないとフォームが動かない。

⚠️ 注意ポイント
項目	                                            解説
vendor/ は大きくなる	                      不要なライブラリまで入ると容量が増える
依存関係が複雑になると差分管理が困難	        チーム開発では composer.json ベースの再構築が安定
本番サーバーで Composer が使えるか確認が必要	使えない場合は vendor/ を含めるしかない

✅ 実務向けまとめ表
使用目的	                    vendor/ を Git に含めるか	解説
ローカル開発のみ	               ❌ 除外	            composer install で再生成可能
GitHub経由でチーム開発	           ❌ 除外	            composer.json 共有がベストプラクティス
FTPでアップロードして実行	        ✅ 含める	         サーバーに Composer が無い場合が多い
小規模な静的サイト + PHPフォーム	✅ 含める	          シンプルな構成では含めてOK

💬 補足
.gitignore に書いても、すでにコミットされたファイルは消えません
→ 対応には git rm --cached vendor/ が必要です

WordPressやShopifyなどCMSのテーマ内で使う場合も、vendor/ ごと含めるほうが現実的です



✅ 疑似コード
1. HTMLでフォームを作成する（名前・メール・本文）
2. JavaScriptで送信ボタン押下時に「送信中...」など表示
3. フォームの送信先は send.php に設定
4. send.phpではPOSTされた値をバリデーション（空チェック、エスケープ）
5. PHPMailerを使い、SMTPでメールを送信
6. 成功時は「送信完了」メッセージを返す


✅ 実務で想定されるの発展例
Google reCAPTCHA v3の導入
自動返信メール（$mail->addReplyTo()や別インスタンスで）
添付ファイル機能（$mail->addAttachment()）
ログ保存（DBやCSVに問い合わせ履歴を保存）
サンクスページへのリダイレクト


✅ 実務でよく使われる流れ（本番前テスト環境）

1. テスト用のディレクトリやサブドメインを作成
   例）https://example.com/testform/
        https://staging.example.com/
2. そこにフォーム一式（HTML, CSS, JS, PHP）をアップロード
3. メール送信の動作確認をテスト
4. 内容や動作が問題なければ → 本番に反映

🔹 1. テスト用のディレクトリやサブドメインを作成
方法	例
サブディレクトリ	https://example.com/testform/
サブドメイン	https://staging.example.com/（※サーバー側で追加設定が必要）

📝 ポイント：
🔴 他の人に見られないように .htaccess でベーシック認証（パスワード制限）をかけると安心。
🔴 クローラーに拾われないように robots.txt にも Disallow を書いておくと完璧。

✅ テスト時の注意点
項目	                        内容
📬 メール送信先	        自分のアドレスに限定しておく（クライアントには届かないように）
📧 自動返信	            送信先メールが仮のものになっていないか
🔒 公開しない	         robots.txt や .htaccess で検索エンジンからブロック可
🔐 パスワード保護	     ベーシック認証などを使って、第三者が見られないようにする

① サブディレクトリで作る（簡単）
https://example.com/formtest/
本番とは別のフォルダをFTPで作成
formtest/index.html, formtest/send.php などを配置
テストが終わったらフォルダごと削除してOK

② サブドメインで作る（本格的）
https://staging.example.com/
コントロールパネルで staging.example.com を追加
実運用と完全に分離できるため安心
高度な案件やチーム開発でよく使う方法



🔹 2. フォーム一式（HTML, CSS, JS, PHP）をアップロード
/testform/
  ├ index.html
  ├ style.css
  ├ script.js
  └ send.php
📝 ポイント：

send.php はメール送信の動作確認用として一時的に公開。
サーバーが PHP に対応していることを確認。
PHPでメールを送る場合は mb_language("Japanese") などの設定も忘れずに。

🔹 3. メール送信の動作確認をテスト
テスト内容	                確認ポイント
✔ 管理者へのメール	    正しい件名・本文・差出人名・文字化けしていないか
✔ 自動返信メール	    ユーザーに送られるか、Gmail/Yahooで迷惑メール扱いされていないか
✔ 入力チェック	        フロントエンド＋バックエンドのバリデーションは機能しているか
✔ セキュリティ	        reCAPTCHAやCSRF対策が有効か、スパムメールが来ないか

🔹 4. 内容や動作が問題なければ → 本番に反映
📝 ポイント：

テストで使った testform ディレクトリやサブドメインは削除またはアクセス制限。
本番のHTML内の action="send.php" のパスなども見直し。
サーバー移動やドメイン変更時は PHPの $_SERVER やメールヘッダーの From アドレスが正しいかも再確認。

✅ 補足：公開前のチェックリスト（例）
 管理者メールが届く
 自動返信が届く
 文字化けしていない
 迷惑メールにならない
 入力制限・未入力時の警告が動いている
 不正スクリプトを防げている（XSS対策）
 reCAPTCHAが表示されている
 スマホでレイアウト崩れがない
 .htaccess で不正アクセス制限（テスト用だけ）

 とても良い気づきです！
フォームをテストして「自動補完（オートコンプリート）」が表示された場合、それは send.php ではなく HTMLフォームの <input> 要素側の仕様 によるものです。


🔴 オートコンプリート（自動補完）の仕組み

ブラウザ（特にChromeやEdgeなど）は、過去に入力したフォーム内容を記憶し、同じような name や type を持つ <input> に自動補完を提案します。

例：HTMLのこのようなコードがあると…
html
<input type="email" name="email" id="email">
👆 過去に同じようなフィールド（name="email"）に入力したことがあれば、ブラウザがその履歴を元に補完候補を表示します。

✅ 自動補完を止めたい場合の対処法（実務でも使われます）
対策①：autocomplete="off" をフォーム全体 or inputに追加
html
<form id="contactForm" action="send.php" method="POST" autocomplete="off">
もしくは個別に指定：

html
<input type="text" name="name" autocomplete="off">
✅ send.php がしていないこと
PHP（send.php）は、フォームが送信された後にしか動きません。

フォーム表示時や入力中には 一切関与していません。

だから「自動補完の処理」は send.php の中には当然存在しないのです。

✅ 開発でのヒント
状況	                                    対処法
テスト中に自動補完が邪魔	                autocomplete="off" を使う
ユーザーの利便性を考えて自動補完したい	     autocomplete="email" など正しく属性を設定
ログイン情報などの記憶を防ぎたい	         autocomplete="new-password" などを利用する

✅ 実務メモ
HTML入力欄の autocomplete は、次のような値を使ってユーザー体験を制御できます：

値	                                        説明
on（デフォルト）	                    ブラウザが自動補完を許可
off	                                    自動補完を無効化
email / name / tel / new-password など	用途を明示することで最適な補完を提供

✅ まとめ
🔴 自動補完は HTMLとブラウザによる機能
🔴 send.php は 送信後の処理なので、入力や補完には一切関与していない
🔴 邪魔な場合は autocomplete="off" で対処


✅ フォーム最適化のベストプラクティス
以下の6つの視点でチェック：

🔵 ユーザー体験（UX）の最適化
🔵 アクセシビリティ（A11y）対応
🔵 バリデーション（入力チェック）
🔵 自動補完・入力支援
🔵 セキュリティ対策
🔵 バックエンドとの連携

1. 🎯 ユーザー体験（UX）の最適化
項目	                            内容
✅ ラベルの明示	                <label for="email">メールアドレス</label> を使って説明を明確に
✅ プレースホルダーは補助	     placeholder はヒント、ラベルの代わりにしない
✅ 必須項目を明示	            「*」や「（必須）」と書くことで迷わせない
✅ 入力サイズの調整	            メールは広く、電話番号や郵便番号は短く（例：maxlength）
✅ 送信ボタンは大きく、明確に	「送信」「確認する」など動詞を明確に

2. 🧑‍🦯 アクセシビリティ（A11y）対応
項目	                            内容
✅ ラベルの関連付け	            <label for="name">お名前</label><input id="name">
✅ エラー時の視覚＋音声通知	    見た目の赤文字だけでなく、aria-live や role="alert" の活用
✅ キーボード操作可	            タブ移動・エンターキーでの送信を可能に
✅ 色だけに頼らない	            例：赤だけでエラー表示するのではなく、文言でも知らせる

3. ✔ バリデーション（入力チェック）
フロントエンド（HTML5）
方法	                    例
必須チェック	        <input required>
メール形式チェック  	<input type="email">
数値チェック	        <input type="number" min="1" max="100">

JavaScript（補助的に使う）
内容	                実装例
即時エラーチェック	    入力後にエラー表示（blurイベントなど）
送信前の総合チェック	form.addEventListener('submit', e => { ... })

バックエンド（PHP）
内容	                    解説
信頼すべき検証はPHP側	JSバリデーションはユーザーが無効化できるため、PHPでも必ず検証を
不正入力除去	        htmlspecialchars(), filter_var() などを使う

4. 🧠 自動補完・入力支援
対策	                            解説
autocomplete 属性を適切に	例：autocomplete="email"、name、tel
過去の入力を活用させる	    　利便性を高めたい場合は自動補完ONのまま
機密情報は補完させない	     例：autocomplete="off" or new-password

5. 🔐 セキュリティ対策
危険性	                        対策
XSS（スクリプト挿入）	htmlspecialchars()、出力エスケープを必ず行う
スパム（自動送信）	    reCAPTCHA（v2/v3）を設置、送信制限（1分に1回など）
CSRF（なりすまし投稿）	ワンタイムトークンを発行し、送信時に照合
不正リクエスト	        HTTPリファラチェック、ドメイン制限
入力サイズ制限	        例：maxlength="100"、PHP側でも文字数制限

6. 🔁 バックエンドとの連携とユーザー通知
項目	                                        内容
✅ サンクスページ or 成功メッセージ表示	    フォーム送信後の安心感（例：thankyou.html に遷移）
✅ エラーメッセージを詳細に	               「メールアドレスが無効です」など原因を明確に
✅ ログに記録（任意）	                   テスト・トラブル対応用に送信内容をログ出力（ファイル or DB）
✅ 自動返信メール	                       ユーザーへ「送信を受け付けました」の確認通知を送信

📋 実務でのチェックリスト（まとめ）
チェック項目	                実装できているかどうか？
ラベルとプレースホルダーの併用	
必須マークとエラーメッセージ	
入力形式の正規表現チェック（メール、電話など）	
reCAPTCHAの導入	
autocompleteの適切な設定	
XSS/CSRF対策済み	
自動返信・管理者通知メールの内容・文字化け確認	
スマホでの表示・タップ操作の最適化	
メール到達性チェック（迷惑メール回避）	
テスト環境と本番の分離