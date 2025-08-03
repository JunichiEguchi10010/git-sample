JavaScriptユーティリティ関数（formatDate(date)、escapeHTML(str)、deepClone(obj)）について 20250803

📅 formatDate(date)
目的：Dateオブジェクトを "YYYY-MM-DD" の文字列に変換する

🔧 仕組み
js
function formatDate(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
getFullYear()、getMonth()、getDate() で年月日を取得

slice(-2) でゼロ埋めして2桁に整形

💼 ユースケース
日付をAPIに渡すときのフォーマット統一
DB保存時のキー整形
UI表示の整形（例：カレンダー、履歴）

🔐 escapeHTML(str)
目的：HTMLタグやスクリプトを無害化して、XSS攻撃を防ぐ

🔧 仕組み（基本例）
js
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
特殊文字をHTMLエンティティに置換

innerHTML に直接表示する前に使うことで、スクリプトの実行を防止

💼 ユースケース
ユーザー入力の表示（掲示板、チャット、コメント欄）

MarkdownやHTMLエディタのプレビュー
フォームのバリデーションと安全表示

🧬 deepClone(obj)
目的：オブジェクトを完全にコピーして、元の参照と切り離す

🔧 代表的な方法
✅ JSON方式（簡易）
js
const clone = JSON.parse(JSON.stringify(obj));
ただし undefined や Date、Function は失われる

✅ structuredClone()（標準関数）
js
const clone = structuredClone(obj);
ネイティブで深いコピーが可能（ただし関数はコピー不可）

✅ lodash方式（最も安定）
js
import _ from 'lodash';
const clone = _.cloneDeep(obj);
複雑な構造でも安全にコピーできる

💼 ユースケース
モーダルやフォームの一時編集用データ
ReduxやVuexなどの状態管理での履歴保存
Undo/Redo機能の実装
