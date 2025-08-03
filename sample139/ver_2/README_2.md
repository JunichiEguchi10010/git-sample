ユーティリティ関数やツール集の命名ルール 20250803

📐 命名ルールの基本原則
動詞＋目的語形式：escapeHTML や formatDate のように、何をするか明確に
短く・意味のある語句に統一：略語や造語を避け、初見でもわかる名前に
キャメルケース（camelCase）推奨：JSでは主流。例：calculateScore, cloneObject

一貫したプレフィックスで分類化：
format*: 表示・変換系 → formatDate, formatCurrency
validate*: 検証系 → validateEmail, validateInput
escape*: サニタイズ系 → escapeHTML, escapeURL
clone*: コピー系 → cloneShallow, cloneDeep

📦 共通ユーティリティでの命名カテゴリ例
カテゴリ	    プレフィックス	        使用例
日付・時間系	format	            formatDate, formatTime
表示安全系	    escape	            escapeHTML, escapeAttr
検証ロジック系	validate	        validateScore, validateForm
クローン系	    clone	            cloneObject, deepClone
比較系	        compare	            compareDates, compareStrings
計算系	        calculate	        calculateRank, calculateTotal
ローカル化	    localize	        localizeDate, localizeCurrency
🧭 Junichi流にカスタマイズすると…
✔ スコアリング系なら computeScore, rankAssets など機能中心に 
✔ 整形系は formatOutput, highlightContrast など表示やアクセシビリティに直結 
✔ 命名に「目的・対象・処理方法」を盛り込むと、読み手に優しくなります


✅ 「自分用ルール集」や「命名テンプレートシート」
スクリプト設計と命名スタイルに関する“自分用ルール集”を整理します

🧭 「自分用ルール集」— 命名編
🔸 1. 命名の基本スタイル
形式：動詞＋目的語 を基本に、処理の意図を端的に伝える
文字種：JavaScript では camelCase、CSSでは kebab-case
目的を明示：冗長を避けつつ、初見でも機能がわかるように
略語は慎重に使用：fmtDate や escHTML など略語は統一された文脈がある場合のみ

🔸 2. プレフィックス（機能ごとの分類語）
機能カテゴリ	    プレフィックス	    例
日付・時間処理	    format	        formatDate, formatTime
安全処理（XSS等）	escape	        escapeHTML, escapeAttribute
検証	           validate	       validateInput, validateScore
コピー・参照分離	clone	        cloneDeep, cloneShallow
比較	           compare	       compareDates, compareValues
計算	           calculate	   calculateScore, calculateRank
ローカライズ	    localize    	localizeDate, localizeNumber
変換	           convert	       convertToText, convertFromJson

📝 命名テンプレートシート
下記のテンプレートに従って、自作関数・スニペットを設計することで、将来的に関数辞典や共通モジュールにまとめやすくなります！

markdown
### 🚀 [関数名]

- **分類**： [例: 表示整形 / 安全処理 / 検証 など]
- **形式**： 動詞＋目的語（camelCase）
- **目的**： [この関数が何をするか（端的に）]
- **引数**：
  - [引数名]: [型] — [説明]
- **戻り値**： [型] — [返す値の意味]
- **使用例**：
```js
const result = 関数名(引数);
関連関数： [同カテゴリ・補助的な関数名]

備考： [制限事項、拡張アイデア、参考URLなど]


## ✒ 例：`escapeHTML()` のテンプレート登録例

```markdown
### 🚀 escapeHTML

- **分類**： 安全処理（XSS対策）
- **形式**： 動詞＋目的語（camelCase）
- **目的**： HTML文字列を安全なエンティティに変換し、XSSを防ぐ
- **引数**：
  - `str`: `string` — 処理対象のHTML文字列
- **戻り値**： `string` — 安全化された文字列
- **使用例**：
```js
const safe = escapeHTML('<script>alert("xss")</script>');