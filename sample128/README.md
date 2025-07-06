WordPress Contact Form 7 お問い合わせフォーム 20250706

✅ Contact Form 7とは？
Contact Form 7は、WordPressサイトに「お問い合わせフォーム」などを簡単に追加できるプラグインです。
無料で使える
HTML・ショートコードベースで柔軟にカスタマイズ可能
スパム対策（reCAPTCHA、Akismet連携）
多言語対応（日本語含む）

🔧 基本的な使い方（5ステップ）
① プラグインのインストール
WordPress管理画面 →「プラグイン」→「新規追加」
検索窓に「Contact Form 7」と入力
「今すぐインストール」→「有効化」

② フォームの作成
管理画面のメニュー「お問い合わせ」→「新規追加」
初期状態では以下のような基本項目があります：

html
お名前 [text* your-name]
メールアドレス [email* your-email]
題名 [text your-subject]
メッセージ本文 [textarea your-message]
送信ボタン [submit "送信"]
このような形で「フォームタグ」を使って構成します。

③ ショートコードを設置
作成したフォームには「ショートコード」が発行されます。

例：
[contact-form-7 id="123" title="お問い合わせフォーム"]
これを投稿ページ・固定ページに貼り付ければフォームが表示されます。

④ メール設定（重要）
「メール」タブで、問い合わせ内容が送信されるメールの宛先や本文フォーマットを設定します。

例（宛先）：
css
your@email.com
例（本文）：
less
お名前: [your-name]
メールアドレス: [your-email]
題名: [your-subject]
メッセージ:
[your-message]
⑤ 完成！確認
公開ページでフォームが正しく表示・送信されるか確認しましょう。

💡 よく使うフォームタグ一覧
フィールドの種類	フォームタグ例	                             必須指定
テキスト入力	    [text your-name]	                    [text* your-name]
メールアドレス	    [email your-email]	                    [email* your-email]
テキストエリア	    [textarea your-message]	                [textarea* your-message]
ラジオボタン	    [radio your-gender "男性" "女性"]	    [radio* your-gender ...]
チェックボックス	[checkbox your-hobby "映画" "読書"]	
セレクトボックス	[select your-pref "東京" "大阪" "福岡"]	
ファイル添付	    [file your-file]	
送信ボタン	        [submit "送信"]	

🛡 スパム対策
reCAPTCHA（Google）
https://www.google.com/recaptcha/admin
Google reCAPTCHA v3を設定すれば、見た目には表示されないAIベースのスパム対策ができます。
✅ reCAPTCHAとは？
Googleが提供するスパム対策機能で、以下のバージョンがあります：
v2（私はロボットではありません）：チェックボックス形式
v3（非表示型）：ユーザーの行動をスコア化して判定（見た目では分からない）
→ Contact Form 7 は v3のみ対応（v2は非対応）


Akismet連携
WordPressに標準でインストールされている「Akismet Anti-Spam」と連携可能。
✅ Akismet（アキスメット）は、WordPressに標準でインストールされているスパム対策プラグインで、元々はコメントスパム用ですが、Contact Form 7の入力内容にもスパム判定を適用できます。

🧩 よくあるカスタマイズ例
完了メッセージを変更したい
→「メッセージ」タブで自由に設定可能

フォーム送信後にサンクスページへ遷移したい
→ JavaScriptや「Redirect」プラグインで実現可能

バリデーションの条件を追加したい
→ 必須（*）を付けるか、フィルターやJSで拡張

🚨 注意点
メールが届かない場合は、サーバーのメール送信設定やSPF/DKIMなどの設定確認が必要。

確認画面のようなステップは標準ではなし。別プラグインが必要。

データベース保存は標準ではできない。「Flamingo」などで対応可能。

🔄 より高機能にするには？
以下のような連携プラグインを使うとさらに便利です：

Flamingo：送信履歴をDB保存

Contact Form 7 – Conditional Fields：入力内容に応じて表示を変える

Contact Form 7 Multi-Step Forms：ステップ形式フォームを実現

📝 まとめ
特徴	        詳細
メリット	    無料・柔軟・多機能
デメリット	    UIがやや技術者向け・確認画面なし
向いている人	HTMLに少し慣れている方・シンプルで軽いフォームがほしい人



✅ Contact Form 7の「あるあるトラブル」一覧
① 📩 メールが届かない
🔍 原因：
サーバー側のメール送信設定（PHP mail関数）に問題あり
迷惑メールフォルダに入っている
メール設定ミス（宛先メールの打ち間違いなど）
reCAPTCHAやAkismetがスパムとしてブロックしている

✅ 対処法：
WordPress SMTP プラグイン（例：WP Mail SMTP）を導入してメール送信設定を改善
管理者のメールアドレスをGmailなどに変更してテスト
Akismet/reCAPTCHA設定を見直す

② 🛑 送信ボタンを押してもエラーが出る（赤枠など）
🔍 原因：
必須項目が空欄
メール設定のプレースホルダ（例：[your-name]）が正しく設定されていない
JavaScriptのエラー（他のプラグインやテーマとの競合）

✅ 対処法：
フォームタグと「メール」タブのタグ名が一致しているか確認
コンソールでJSエラーが出ていないか確認
プラグインを一時停止して競合チェック

③ 🔁 フォーム送信後、リロードされるだけで完了メッセージが出ない
🔍 原因：
JavaScriptの読み込みに失敗（jQueryやCF7のスクリプトが動いてない）
キャッシュ系プラグインが悪影響（例：Autoptimize、LiteSpeedなど）

✅ 対処法：
キャッシュ系プラグインの設定を見直す（JavaScript結合を無効に）
テーマに <footer> 直前に <?php wp_footer(); ?> があるか確認
他のJSプラグインとの干渉を検証

④ 🔃 フォーム送信後にサンクスページへ遷移しない
🔍 原因：
Contact Form 7には標準で「確認画面」や「サンクスページ遷移」機能がない

✅ 対処法：
JavaScriptでフォーム送信成功イベントを検知し、手動でページ遷移させる
js
document.addEventListener('wpcf7mailsent', function (event) {
  location.href = '/thanks/';
}, false);

⑤ 🔐 reCAPTCHA設定後、フォームが送れなくなる
🔍 原因：
スコア（reCAPTCHA v3の評価）が低く、送信がブロックされている
キーが間違っている、または有効でない
同一ページにreCAPTCHAを多重読み込み（複数フォーム）

✅ 対処法：
reCAPTCHAキーを再取得して正しく入力
Akismetと併用に切り替える
サーバーのJS圧縮やキャッシュ設定も見直す

⑥ 📦 ファイル添付が送られてこない
🔍 原因：
メールテンプレートでファイル添付のプレースホルダが抜けている
サーバーのファイルアップロード制限
MIMEタイプの制限

✅ 対処法：
「メール」タブの「ファイル添付」に [your-file] などのタグを追記
サーバーの php.ini で upload_max_filesize を確認
ファイル形式（例：.exeや.zipなど）は制限を見直す

⑦ 🧪 ローカル環境では動くのに、本番環境では動かない
🔍 原因：
サーバー側の設定やSSL未対応など環境差異
SMTPやPHPバージョン差によるエラー

✅ 対処法：
サーバーログやブラウザのコンソールでエラーを確認
本番環境でのフォーム動作をしっかりテスト
WP Mail SMTPでメールログも確認

📌 まとめ：トラブル別チェックポイント早見表
トラブル内容	            主な原因	                    対処方法
メールが届かない	        サーバー設定、SMTP未設定	    WP Mail SMTP導入
送信できない（赤枠）	    必須ミス、JS競合	            タグ名確認＋JSチェック
完了メッセージ出ない	    JS未読み込み	                wp_footer()確認＋キャッシュ見直し
サンクスページへ行かない	 標準非対応	                    JSカスタムで遷移
reCAPTCHAで送れない	        スコア低・設定ミス	            Akismetへ切替 or 再設定
添付ファイルが送れない	     メール設定ミス	                 添付設定を追記＋PHP制限確認
















✅ 公式サイト：
https://ja.wordpress.org/plugins/contact-form-7/

Code for Fun
【PHP】コンタクトフォームの作り方
https://codeforfun.jp/php-contact-form


ワードプレスでお問い合わせフォーム（Contact Form7）を設置する方法（基礎編）
https://www.youtube.com/watch?v=2q_vJrEdMIE&t=0s

Contact Form 7（コンタクトフォーム）の項目の追加・変更・削除の方法について
https://www.youtube.com/watch?v=tXl_XO2NWyA&t=1s

Contact Form 7（コンタクトフォーム）でメールの届く先を設定する方法！
Contact Form 7　TCD　テンプレート
https://tcd-theme.com/2015/09/contactform7.html

ワードプレスでお問い合わせフォームの作り方！（案件にも練習にもピッタリ！）【Contact Form 7】よしお
https://www.youtube.com/watch?v=kv1qxXivDIQ

code tips
https://lorem-co-ltd.com/form-coding/
https://www.youtube.com/watch?v=raWySN0oErs&t=756s

【解決】ワードプレスで、お問い合わせフォーム（Contact Form7）や予約システム（Booking Packageなど）からメールが届かない！
https://www.youtube.com/watch?v=23BDRoW7OaE


https://media.tricorn.co.jp/form/inquiry-form/154/

https://webukatu.com/wordpress/blog/10756/

https://www.tagindex.com/html_tag/form/form.html

https://logsuke.com/web/design/html/html-form-input