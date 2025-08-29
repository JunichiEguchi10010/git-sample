可読性を高めるコード 20250829

マジックナンバーは定数化
変数名の明確化
ガード節の使用
純粋関数でテスタブルなコード
フォーマット出力の明確化
責務分離の徹底
コードの関数化（責務分離の徹底の一部）


✅ マジックナンバーは定数化
意味：コード中に直接書かれた数値（例：if (score > 60)）を、意味のある名前の定数に置き換えること。

理由：
意味が明確になる（例：PASSING_SCORE = 60）
値の変更が一箇所で済む
読みやすく、保守しやすい

例：
js
const MAX_RETRY_COUNT = 3;
for (let i = 0; i < MAX_RETRY_COUNT; i++) {
  // 再試行処理
}

✅ 変数名の明確化
意味：変数名を見ただけで「何を表しているか」がわかるようにすること。

理由：
読み手の理解が早くなる
バグを防げる
チームでの開発がスムーズになる
例： NG: data, temp, x 
OK: userList, isLoggedIn, retryCount

✅ ガード節の使用
意味：早期に異常系を処理して、ネストを減らす書き方。

理由：
コードがフラットになり、読みやすくなる
正常系の処理に集中できる

例：
js
function process(user) {
  if (!user) return;
  if (!user.isActive) return;

  // 正常処理
}

✅ 純粋関数でテスタブルなコード
意味：副作用がなく、同じ入力に対して常に同じ出力を返す関数を書くこと。

理由：
単体テストが簡単になる
バグが起きにくくなる
並列処理やキャッシュがしやすくなる

例：
js
function calculateTax(price) {
  return price * 0.1;
}

✅ フォーマット出力の明確化
意味：出力形式（JSON, CSV, HTMLなど）を明示的に定義し、整えること。

理由：
他システムとの連携がしやすくなる
表示崩れやデータ不整合を防げる
ユーザーや管理者にとって見やすくなる

例：
js
function formatUser(user) {
  return {
    id: user.id,
    name: user.name,
    joined: formatDate(user.joinedAt),
  };
}

✅ 責務分離の徹底
意味：1つの関数やモジュールが「1つの役割」に集中するように設計すること。
理由：
テストしやすくなる
再利用性が高まる
バグの原因を特定しやすくなる

例： NG: ユーザー情報を取得して、画面に表示して、ログも出す OK:
fetchUser()：取得
renderUser()：表示
logUserAccess()：ログ出力

✅ コードの関数化？
関数化とは、ひとまとまりの処理を名前付きで切り出すことです。
たとえば：

python
def greet(name):
    print(f"こんにちは、{name}さん！")
このように、処理を関数にすることで、何をしているかが明確になります。

✅ 関数化のメリット
メリット	                内容
可読性の向上	        処理の意図が明確になり、他人にも自分にも読みやすくなる
保守性の向上	        修正が必要なとき、関数内だけを直せばよくなる2
再利用性の向上	        同じ処理を複数箇所で使える。仕様変更にも強くなる
テストしやすさ	        入力と出力が明確なので、ユニットテストがしやすくなる
意図の明示	           「何をしたいか」が関数名で伝わる。手段ではなく目的を表現できる

🔍 どんな処理を関数化すべき？
繰り返し使う処理（例：日付フォーマット、バリデーション）
意味のある処理単位（例：「ユーザー認証」「データ取得」など）
1回しか使わない処理でも、読みやすさや保守性のために関数化する価値あり

💡関数名の付け方のコツ
処理の「目的」を表す名前にする（例：calculateTax()、fetchUserData()）
手段ではなく「何をしたいか」を意識する（例：splitName()よりもgetFirstAndLastName()）


✅ 実例：1回しか使わないけど関数化するケース
❌ 関数化していないコード
js
const user = getUser();
const date = new Date(user.joinedAt);
const formatted = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
console.log(`ようこそ ${user.name} さん（登録日: ${formatted}）`);

✅ 関数化したコード（1回しか使わないけど価値あり）
js
function formatJapaneseDate(date) {
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
}

const user = getUser();
const formatted = formatJapaneseDate(new Date(user.joinedAt));
console.log(`ようこそ ${user.name} さん（登録日: ${formatted}）`);
→ formatJapaneseDate という関数名があるだけで、「これは日付を日本語形式に整形する処理なんだな」と一目でわかるようになります。