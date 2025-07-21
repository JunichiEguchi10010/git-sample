WebDesgin Javascript fetch を使った非同期フォーム送信 処理時間のチェック(alert) 20250721

サイトキー（sitekey）
6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ

シークレットキー（secretkey）
6LfKOoQrAAAAAJrnu1ZHDwoKXvoUa8UiEw_HGItI

グーグルアプリパスワード
liaccngouowhcbrq'

グーグルメールアドレス
m100010eguchi@gmail.com

パス
cd C:\Users\eguchijunichi\git-sample\sample129\ver_7\

phpmailerインストール（composer）
composer require phpmailer/phpmailer

composer require vlucas/phpdotenv

ターミナルで起動：ローカルホスト立上げ
bash
php -S localhost:8000



✅ fetch の“意味がある”パターン
fetch を使う真価はこのあたり：

機能・目的	                                    fetch使用のメリット
🟥入力チェック（バリデーション）を非同期で処理	  JSでその場でエラー表示できる
🟥エラー時に遷移せずメッセージ表示	             UX向上、離脱防止
🟥サンクス画面をモーダル表示や動的表示にする	  よりリッチな演出が可能
🟥入力データを他のAPIと連携する（DB保存など）	  JSで柔軟に処理できる
🟥送信中のローディング表示、ボタン無効化など	  見た目や操作性が向上
🟥Google Tag Manager 等で送信イベントを検知	    JSでトラッキングしやすい


🟥 fetch によるフォーム送信
「ユーザー体験の質を左右する重要ポイント」として積極的に採用されています。

🚀 よくある現場での利用例
企業コーポレートサイトのお問い合わせフォーム
ECサイトの商品レビュー・問い合わせ投稿
メンバー登録／ニュースレター登録
Webアプリケーションでのデータ送信

✅ 採用される理由
理由	                解説
ユーザー体験の向上	    送信後に画面がリロードされず、反応が速いため使いやすい
UIの柔軟性	           成功・失敗などに応じて動的にフィードバック表示できる
保守性	               JavaScript上でロジックが完結するため、設計管理がしやすい
外部サービス連携	    Formspree、Zapier、Google Apps Script などと直接通信可能
SPAやPWAなどモダン構成への適合性	ReactやVueなどのフレームワークとの親和性が非常に高い

🔍 補足ポイント：
特に複雑なバリデーションや、reCAPTCHAなどの非同期処理が混在するフォームには fetch が適しています。
🟥 サーバーサイドの header() でリダイレクトできない場合も、fetch経由なら window.location で制御可能。

🎯 結論：
実務では「手軽」「高速」「柔軟」「安全」といった要求が重なる場面が多いため、 fetch は単なる選択肢ではなく、スタンダードな手法として定着しています。


📮 HTMLフォーム送信時（通常の POST）
サーバーから返されたレスポンス（成功・失敗メッセージなど）は、 新しいページ（例：thanks.html）に遷移することでしかユーザーに伝えられません。
そのため、「送れたのか？」「間違ってた？」といった不安が遷移後まで解消されない。

📱 fetchを使った送信時
サーバーから返されたレスポンスは、JavaScriptで受け取って任意の場所・方法で画面内に表示可能。
result.textContent = '送信成功！' みたいに、目の前にメッセージが現れる🎉
サーバーがステータスコードや詳細な文言（例：400、エラーメッセージ）を返した場合、 細かく分岐させて、必要に応じたUIに切り替えることができる。
例：「reCAPTCHAのスコアが低すぎてスパム判定された」→その旨を画面に表示可能

🪄 たとえるなら…
HTML送信：返事が来るまでドキドキして待つ「文通」体験 💌
fetch送信：既読ついて反応がすぐわかる「チャット」体験 💬✨

👀 まとめると：
項目	                    HTMLフォーム送信	            fetchによる送信
レスポンスの受け取り方	    ページ遷移が必要	            JavaScriptでその場で受け取れる
表示の柔軟性	           thanks.htmlなどで限定	       任意の場所・形式で表示可能
エラー処理	               画面遷移前に検出しづらい	        状況ごとに即表示・UI連携も可能
UX（体験）	                昔ながら	                  モダンで快適


🟥 fetch 実装テンプレ
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const result = document.getElementById('result');

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      message: 'お名前は2文字以上で、日本語または英字で入力してください。'
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      message: '正しいメールアドレス形式で入力してください。'
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      message: 'お問い合わせ内容は10文字以上で入力してください。'
    }
  };

  Object.values(fields).forEach(({ input, error, message }) => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        error.textContent = '';
      } else {
        error.textContent = message;
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    Object.values(fields).forEach(({ input, error, message }) => {
      if (!input.validity.valid) {
        error.textContent = message;
        isValid = false;
      } else {
        error.textContent = '';
      }
    });

    if (!isValid) {
      result.textContent = '入力内容に不備があります。';
      return;
    }

    result.textContent = '送信中...';

    grecaptcha.ready(() => {
      grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', { action: 'submit' })
        .then(token => {
          document.getElementById('recaptchaToken').value = token;

          const formData = new FormData(form);

          fetch('send.php', {
            method: 'POST',
            body: formData
          })
          .then(async response => {
            const text = await response.text();
            if (response.ok) {
              result.textContent = '送信が完了しました。ありがとうございます！';
              form.reset();
              // 必要なら画面遷移も可能 → window.location.href = 'thanks.html';
            } else {
              result.textContent = '送信エラー：' + text;
            }
          })
          .catch(error => {
            result.textContent = '通信エラーが発生しました。';
            console.error('通信エラー:', error);
          });
        });
    });
  });
});

✅ form.submit() を fetch に置き換えて非同期化
✅ エラー文言や reCAPTCHA をそのまま活用
✅ PHP側の send.php は変更不要（そのまま $_POST 受信でOK）
✅ 必要であれば fetch 成功時に thanks.html へ遷移も可能



🟥 擬似コード
🟥✉️HTMLフォーム送信（ページ遷移あり）
html
<!-- ユーザー入力フォーム -->
<form action="処理用PHPファイル" method="POST">
  名前：<input type="text" name="name" /><br />
  メール：<input type="email" name="email" /><br />
  メッセージ：<textarea name="message"></textarea><br />
  <button type="submit">送信する</button>
</form>
php
// PHP側（例：send.php）

// 入力値を受け取る
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// バリデーション処理（未記入チェックなど）

// メール送信やデータ保存の処理など

// 処理が完了したら「ありがとうございます」ページに遷移
header('Location: thanks.html');
📝 特徴：

ページ遷移あり（ユーザーは送信後に別ページに移動）

実装がシンプルで、広く使われている手法

フォームの再読み込みが発生するため、UX的にはやや古典的

🚀fetch を使った非同期送信（ページ遷移なし）
html
<!-- 非同期送信用のフォーム -->
<form id="contactForm">
  名前：<input type="text" name="name" /><br />
  メール：<input type="email" name="email" /><br />
  メッセージ：<textarea name="message"></textarea><br />
  <button type="submit">送信</button>
</form>

<div id="result"></div> <!-- 送信結果表示用 -->
javascript
// JavaScript側
document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // 通常の送信をキャンセル

  const form = event.target;
  const formData = new FormData(form);

  const response = await fetch('send.php', {
    method: 'POST',
    body: formData
  });

  const resultArea = document.getElementById('result');

  if (response.ok) {
    resultArea.textContent = '送信完了しました！';
    form.reset();
  } else {
    resultArea.textContent = '送信に失敗しました。';
  }
});
📝 特徴：

ページを移動せずに裏側で送信（ユーザーは同じ画面のまま）

スムーズな UX を提供できる

成功／失敗のメッセージなどを自由に表示できる