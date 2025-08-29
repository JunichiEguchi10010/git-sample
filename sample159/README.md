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


✅ コードの関数化(コードの切り出し：コンポーネント化に近い感じ)

🧱 Before：関数化されていないコード
javascript
const user = { name: "Junichi", age: 35 };

console.log("名前：" + user.name);
console.log("年齢：" + user.age);
console.log("こんにちは、" + user.name + "さん！");
このように、同じオブジェクトから情報を取り出して表示する処理がバラバラに書かれていると、後で変更が必要になったときに手間がかかります。

🛠️ After：関数化して再利用可能に
javascript
function displayUserInfo(user) {
  console.log("名前：" + user.name);
  console.log("年齢：" + user.age);
}

function greetUser(user) {
  console.log("こんにちは、" + user.name + "さん！");
}

// 関数を使って処理を整理
const user = { name: "Junichi", age: 35 };
displayUserInfo(user);
greetUser(user);

🟦 関数化の意図と実行
① 注目したポイント
同じ user オブジェクトから複数の情報（name, age）を取り出している
console.log() が3回使われていて、表示処理が分散している
表示内容が意味的にまとまりを持っている（ユーザー情報の表示、あいさつ）

② 問題点の認識
表示処理がバラバラだと、修正や再利用がしづらい
たとえば、user.name を user.fullName に変更したい場合、複数箇所を直す必要がある
表示の目的が混在していて、コードの意図が読み取りにくい
「ユーザー情報の表示」と「あいさつ」が混ざっている

③ 関数化の判断
「ユーザー情報の表示」は displayUserInfo(user) にまとめる
「あいさつの表示」は greetUser(user) に分離する
それぞれ意味のある処理単位として関数化することで、役割が明確になる

④ 関数化の実行
function displayUserInfo(user) を定義して、名前と年齢の表示をまとめる
function greetUser(user) を定義して、あいさつの表示を分離
元のコードの console.log() を関数呼び出しに置き換える

⑤ ✅ 関数化のメリット
意味のまとまりごとに処理を分離できた
再利用性が向上（他のユーザーにも使える）
保守性が向上（表示内容の変更が関数内だけで済む）
テストがしやすくなる（関数単位で動作確認できる）
読みやすさが向上（コードの意図が一目でわかる）

🧠 補足：関数化の判断基準
判断ポイント	                    関数化すべき？	            理由
処理が意味的にまとまっている	    ✅	                      「ユーザー情報の表示」「あいさつ」など
同じ処理が複数箇所にある	        ✅	                      再利用性と保守性の向上
処理が長くなっている	            ✅	                      読みやすさとテストのしやすさ
一度しか使わない処理	            ❌（場合による）	         短くて明確なら関数化しなくてもOK


✅ 実践的な例：レビューの平均点を計算する
Before（関数化なし）
javascript
const reviews = [4, 5, 3, 4, 5];
let total = 0;
for (let i = 0; i < reviews.length; i++) {
  total += reviews[i];
}
const average = total / reviews.length;
console.log("平均点：" + average);

After（関数化）
javascript
function calculateAverage(scores) {
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
}

const reviews = [4, 5, 3, 4, 5];
const average = calculateAverage(reviews);
console.log("平均点：" + average);


🧠 関数化の意図と実行：レビュー平均点の例
① 注目したポイント
配列 reviews の中身を合計して平均を出す処理がある
for 文で合計を計算 → 平均を算出 → console.log() で表示
処理の流れが一連の「平均点を計算する」目的に沿っている

② 問題点の認識（Beforeのコード）
処理が1つの場所にベタ書きされていて、再利用できない
他のレビューでも平均を出したい場合、同じコードをコピーする必要がある
total や average の変数がグローバルに存在し、スコープが曖昧になりやすい

③ 関数化の判断
「平均点を計算する処理」は意味のあるまとまりなので、関数に切り出せる
引数に配列を渡して、任意のレビュー配列に対応できるようにする
処理結果（平均点）を return で返すことで、柔軟に使い回せる

④ 関数化の実行（Afterのコード）
calculateAverage(scores) 関数を定義
reduce() を使って合計を計算
平均を算出して return
元のコードでは calculateAverage(reviews) を呼び出して結果を取得
表示処理は console.log() に分離されているので、ロジックと表示が分離されている


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