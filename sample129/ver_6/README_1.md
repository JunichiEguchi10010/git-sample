WebDesign HTML5＋JavaScript（JS）でフロントサイドバリデーション 20250719

# 📁 ファイル構成
sample129/ver_6/
├── 📄 index.html          (1.2KB)  - メインHTMLファイル（お問い合わせフォーム）
├── 📄 script.js           (2.0KB)  - JavaScriptファイル（フロントエンドバリデーション）
├── 📄 style.css           (734B)   - CSSファイル（スタイリング）
├── 📄 send.php            (3.4KB)  - PHPファイル（メール送信処理）
├── 📄 mail_template.html  (1.0KB)  - メールテンプレート
├── 📄 composer.json       (102B)   - Composer設定ファイル
├── 📄 composer.lock       (20KB)   - 依存関係のロックファイル
├── 📁 vendor/                    - Composerでインストールされたライブラリ（PHPMailer等）
├── 📄 README_1.md         (11KB)  - フロントエンドバリデーションの詳細説明
├── 📄 README_2.md         (12KB)  - バックエンド処理の詳細説明
└── 📄 .gitignore          (143B)  - Git除外設定ファイル

## 🎯 プロジェクト概要
HTML5 + JavaScript + PHPを使用した**お問い合わせフォーム**です。
- ✅ フロントエンド・バックエンド両方でバリデーション実装
- ✅ Google reCAPTCHA統合
- ✅ PHPMailerによるメール送信機能

サイトキー（sitekey）
6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ

シークレットキー（secretkey）
6LfKOoQrAAAAAJrnu1ZHDwoKXvoUa8UiEw_HGItI

グーグルアプリパスワード
liaccngouowhcbrq'

グーグルメールアドレス
m100010eguchi@gmail.com

パス
cd C:\Users\eguchijunichi\git-sample\sample129\ver_6\

ターミナルで起動：ローカルホスト立上げ
bash
php -S localhost:8000

phpmailerインストール（composer）
composer require phpmailer/phpmailer

composer require vlucas/phpdotenv



✅ フロントサイド（JavaScript）とサーバーサイド（PHP）両方でバリデーションを行う理由

✅ なぜ「両方でバリデーション」が必要なのか？
種別	                目的・役割	                                                    実務的な意義
フロントサイド（JS）	入力ミスを即時に通知し、ユーザー体験を向上させる	               UX向上、送信前の簡易チェック、不要なリクエストの削減
バックサイド（PHP）	    信頼できない入力の最終防御線として、改ざんや不正アクセスを防止	    セキュリティ確保、スパム・攻撃対策、信用性の担保

✅ フロントサイドだけでは 危険
JavaScript はユーザーのブラウザ上で動作するため、無効化や改ざんが可能です。
例：
開発者ツールで JS を無効化 → バリデーションスルー
HTML フォームを改造 → 想定外のデータ送信
curl や Postman などで 直接 POST → バリデーションなしでサーバーに侵入
したがって、バックエンド側のバリデーションがないと防げません。

✅ 実務での必須性
官公庁、ECサイト、BtoBサイトなどでは情報漏洩やスパム送信リスクを防ぐため、両方実装されているのが標準です。
JSバリデーションは“親切な注意”、**PHPバリデーションは“防衛策”**です。
Web制作会社・SIer・フリーランス問わず、信頼性の高いサイト構築には両方を組み合わせるのがプロの基本姿勢とされています。

✅ 結論
フロントサイド = ユーザー体験（UX）向上のために必要
サーバーサイド = セキュリティ・品質確保のために必須
よって、両方のバリデーションは実務で「ほぼ必須」です。片方だけでは危険です。


✅　疑似コード
ページの読み込みが完了したら以下の処理を始める：

フォーム要素（id="contactForm"）と、結果表示用の要素（id="result"）を取得する。

入力チェック対象の3つのフィールド（名前、メール、メッセージ）をまとめて管理するオブジェクトを用意する。

それぞれのフィールドに対応する入力欄、エラーメッセージ表示欄、エラー文言をセット。

それぞれの入力欄に対して「文字が入力された（inputイベント）」ときに次の処理をする：

入力が有効（valid）なら、そのフィールドのエラーメッセージ表示を空にする。

無効なら、あらかじめ決めたエラーメッセージを表示する。

フォームが送信されそうになったら（submitイベント発生時）次の処理をする：

送信を一旦止める（ページ遷移や送信を防ぐ）。

すべての入力フィールドを順にチェックする：

有効でなければ、そのフィールドのエラーメッセージを表示し、全体のバリデーション状態を「無効」にする。

有効ならエラーメッセージをクリアする。

もしバリデーションが無効なら、

「入力内容に不備があります。ご確認ください。」と画面に表示して処理を終了する。

バリデーションがすべてOKなら、

「送信中です...」と画面に表示。

Google reCAPTCHAの準備ができたら、

reCAPTCHAを実行してトークンを取得する。

取得したトークンをフォームの隠しフィールドにセット。

フォームを送信（submit）する。

✅ コードスニペット
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
        result.textContent = '入力内容に不備があります。ご確認ください。';
        return;
      }
  
      result.textContent = '送信中です...';
  
      grecaptcha.ready(() => {
        grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', { action: 'submit' })
          .then(token => {
            document.getElementById('recaptchaToken').value = token;
            form.submit();
          });
      });
    });
  });
  
✅ 1行づつコード解説
document.addEventListener('DOMContentLoaded', () => {
ページのHTMLがすべて読み込まれてDOMツリーが完成したときに、ここから中の処理を実行します。

  const form = document.getElementById('contactForm');
HTML内のフォーム要素（id="contactForm"）を取得して変数 form に保存します。

  const result = document.getElementById('result');
送信結果やエラーメッセージを表示するための要素（id="result"）を取得して変数 result に保存します。

  const fields = {
入力チェックを行う各フォーム項目の情報をまとめたオブジェクト fields を作成します。

    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      message: 'お名前は2文字以上で、日本語または英字で入力してください。'
    },
「name」フィールドの入力要素（id="name"）、エラーメッセージ表示用の要素（id="nameError"）、表示するエラーメッセージ文言をセット。

    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      message: '正しいメールアドレス形式で入力してください。'
    },
「email」フィールドの入力要素とエラーメッセージ要素、エラーメッセージ文言をセット。

    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      message: 'お問い合わせ内容は10文字以上で入力してください。'
    }
  };
「message」フィールドの入力要素とエラーメッセージ要素、エラーメッセージ文言をセット。これで fields オブジェクトの定義が終わり。

  Object.values(fields).forEach(({ input, error, message }) => {
fields オブジェクトのすべての値（name, email, messageそれぞれの情報）を取り出して1つずつ処理します。

    input.addEventListener('input', () => {
各入力欄に対して「文字が入力された（inputイベント）」時の処理を設定。

      if (input.validity.valid) {
        error.textContent = '';
      } else {
        error.textContent = message;
      }
入力内容がブラウザの標準バリデーションで「有効(valid)」ならエラーメッセージを消し、無効なら設定したメッセージを表示。

    });
  });
ここまでで「入力時にリアルタイムでエラーメッセージ表示を切り替える処理」が完成。

  form.addEventListener('submit', function (e) {
フォーム送信時のイベント処理を設定。

    e.preventDefault();
フォームの本来の送信動作（ページ遷移やサーバー送信）を一旦止める。

    let isValid = true;
全体のバリデーション状態を記録するためのフラグ変数 isValid を初期値 true に設定。

    Object.values(fields).forEach(({ input, error, message }) => {
先ほどの fields の各項目を順に処理してバリデーションチェック。

      if (!input.validity.valid) {
        error.textContent = message;
        isValid = false;
      } else {
        error.textContent = '';
      }
入力が無効ならエラーメッセージを表示し、isValid を false に変更。 有効ならエラーメッセージを消す。

    });
これで全フィールドのバリデーション結果をチェックし終える。

    if (!isValid) {
      result.textContent = '入力内容に不備があります。ご確認ください。';
      return;
    }
もし1つでも不備があれば、画面に注意文を表示して処理終了（送信しない）。

    result.textContent = '送信中です...';
全て問題なければ、送信中であることを画面に表示。

    grecaptcha.ready(() => {
Google reCAPTCHAが準備できたタイミングで以下を実行。

      grecaptcha.execute('6LfKOoQrAAAAAF3803H5UvwNyeYrGleM93KVGVOQ', { action: 'submit' })
reCAPTCHAを「submit」アクションとして実行し、スコア付きのトークンを取得。

        .then(token => {
トークンの取得が成功したら次の処理へ。

          document.getElementById('recaptchaToken').value = token;
フォームの隠し入力（id="recaptchaToken"）に取得したトークンをセット。

          form.submit();
トークンをセットしたフォームを実際に送信する。

        });
    });
  });
});
これで送信処理の完了。すべての処理が終わる。