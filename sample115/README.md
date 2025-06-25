ソフトウェア開発における「テスト（テスト設計・テスト手法・TDD）」について　20250626

✅ 全体概要：なぜテストが必要か？
「動かなければユーザーが離れる」 → 信頼を得るためには品質管理が重要
テストは「コードが仕様通り動くことを確認する」だけでなく、「ミスやバグを未然に防ぐ」ための手段。
個人開発でも「最低限のテスト」は必須。

✅ テストの2分類
種類	                    内容	                    例
性的テスト（静的）	    コードを「動かさず」に確認	        リンター、型チェック、コードレビュー
動的テスト（同的）  	実際に「動かして」確認	            単体テスト、結合テスト、システムテスト、受け入れテスト

✅ 動的テストの4レイヤー（粒度による違い）
テスト名	                内容
ユニットテスト（単体）	  1関数・1メソッド単位で確認
結合テスト	            モジュール同士の連携（例：コントローラー⇄モデル⇄ビュー）
システムテスト	        アプリ全体が仕様通り動くか
受け入れテスト	        クライアントやユーザー視点での最終確認

✅ テストの視点：ホワイトボックスとブラックボックス
名称	                        テスト対象	                        担当者
ホワイトボックス	コード内部のロジックを知った上で全分岐を確認	    開発者
ブラックボックス	UIや仕様をもとに外部から入力して確認	           QA、クライアントなど

✅ テスト設計技法（代表的な4つ）
名称	                内容	                                        例
同値クラステスト	妥当・不当な入力クラスに分けて確認	              1〜100なら、50, -1, 150 など
境界値分析	        境界の前後をチェック	                        0, 1, 100, 101
状態遷移テスト	    状態変化（例：ログイン⇄ログアウト）を網羅	
組み合わせテスト	入力の全パターンをテスト（ペアワイズ法で効率化）	

✅ TDD（テスト駆動開発）
テスト → コード → リファクタリング の順で進める開発手法。
エラーから始める → 最小限のコードでパス → 本実装
メリット：仕様がブレない、テスト漏れを防げる、リズムで開発が進む

✅ 自動テスト vs 手動テスト
自動テスト	                    手動テスト
正確・高速・再現性あり	     柔軟・目視・人間の直感に対応
ユニット・CI/CD向き	        UI崩れ・違和感などに対応
コスト効率良し	            リリース直前の最終確認で重要

✅ テスト設計の戦略
テストピラミッド
下に行くほどコストが安く・壊れにくい
ユニットテストはしっかり、UIテストは必要最低限

  ▲ UIテスト（高コスト・壊れやすい）
  ▲ 結合テスト
  ▲ ユニットテスト（安定・高速）

リスクベースドテスト
重要度が高く、壊れたら困る箇所にリソース集中
例：決済、認証、機密情報処理部分は厳重にテスト

✅ テストのタイミングと担当者（開発フローとの連携）
フェーズ	内容	                        担当
要件定義	E2E条件、受け入れ条件の設計 	プロダクトオーナー、QA
実装前	    TDD、単体設計	               エンジニア
実装中	    単体・結合テスト（CI）	        エンジニア
実装後	    UIテスト、探索的テスト	        QA、ディレクター、開発者
リリース前	スモークテスト	                全員で確認

✅ まとめ
テストは「品質保証の根幹」。設計段階から重要。
テストの種類・粒度・手法を理解すると「何をどう確認すべきか」が明確になる。
TDDを意識することで「仕様通りで漏れのない開発」が可能に。
自動／手動・ホワイト／ブラック・戦略的分配が大事。


具体的なテストコード
✅ 1. ユニットテスト（単体テスト）
対象：関数単体のテスト
js
// sum.js
export function sum(a, b) {
  return a + b;
}

js
// sum.test.js
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

✅ 2. 結合テスト（モジュール連携のテスト）
対象：複数関数・モジュール間の連携確認
js
// userService.js
import { getUserFromDB } from './db';
import { formatUser } from './formatter';

export function getFormattedUser(id) {
  const user = getUserFromDB(id);
  return formatUser(user);
}

js
// userService.test.js
import { getFormattedUser } from './userService';
import * as db from './db';
import * as formatter from './formatter';

test('gets user and formats it', () => {
  jest.spyOn(db, 'getUserFromDB').mockReturnValue({ name: 'John', age: 30 });
  jest.spyOn(formatter, 'formatUser').mockImplementation(user => `Name: ${user.name}, Age: ${user.age}`);

  const result = getFormattedUser(1);
  expect(result).toBe('Name: John, Age: 30');
});

✅ 3. システムテスト（アプリ全体の仕様確認）
対象：アプリケーションの流れ（例：フォーム送信）
jsx
// ContactForm.jsx
import React, { useState } from 'react';

export function ContactForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(message); }}>
      <input
        type="text"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

jsx
// ContactForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from './ContactForm';

test('submits the form with user input', () => {
  const handleSubmit = jest.fn();
  render(<ContactForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByPlaceholderText(/your message/i), {
    target: { value: 'Hello' },
  });
  fireEvent.click(screen.getByText(/send/i));

  expect(handleSubmit).toHaveBeenCalledWith('Hello');
});

✅ 4. 受け入れテスト（ユーザー視点の最終確認）
対象：e2eテスト。Cypressなどでブラウザ動作確認
js
// contact_form.cy.js (Cypress)
describe('Contact Form', () => {
  it('should allow a user to submit a message', () => {
    cy.visit('/contact');
    cy.get('input[placeholder="Your message"]').type('Test message');
    cy.contains('Send').click();
    cy.contains('Message sent!').should('be.visible');
  });
});
🔍 補足：どれを使うべき？
テスト種別	    実行タイミング	           工数	        ツール例
ユニットテスト  開発中随時	                低	        Jest, Mocha, Vitest
結合テスト	    各モジュール完成時	        中	        Jest + Mock/Spy
システムテスト	機能が一通り完成した段階で	やや高	      React Testing Library
受け入れテスト	リリース前	                高	        Cypress, Playwright, Puppeteer


✅ 1. ユニットテストの使い方（Jest）
目的：
「1つの関数が正しく動くか」をチェック
例：sum(a, b)という関数が正しいか？
1. ファイルを作る
sum.js

js
export function sum(a, b) {
  return a + b;
}
2. テストファイルを作る
sum.test.js

js
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
3. テスト実行方法（ターミナル）
bash
npx jest
✅ 成功すると「✓ adds 1 + 2 to equal 3」と表示されます。


✅ 2. 結合テストの使い方
目的：
複数の関数が正しく連携できるかをテスト
例：DBからユーザーを取得して、整形する関数をテストしたい
js
// userService.js
import { getUserFromDB } from './db';
import { formatUser } from './formatter';

export function getFormattedUser(id) {
  const user = getUserFromDB(id);
  return formatUser(user);
}
テストファイル（userService.test.js）

js
import { getFormattedUser } from './userService';
import * as db from './db';
import * as formatter from './formatter';

test('gets user and formats it', () => {
  jest.spyOn(db, 'getUserFromDB').mockReturnValue({ name: 'John', age: 30 });
  jest.spyOn(formatter, 'formatUser').mockImplementation(user => `Name: ${user.name}, Age: ${user.age}`);

  const result = getFormattedUser(1);
  expect(result).toBe('Name: John, Age: 30');
});
テスト実行：
bash
npx jest
✅ 依存モジュールの動きを「仮に決めて」連携だけをテストします。


✅ 3. システムテストの使い方（Reactコンポーネント）
目的：
「画面での動作」を確認（例：フォームが送信されるか）
例：Reactのフォームコンポーネントをテスト
jsx
// ContactForm.jsx
export function ContactForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(message); }}>
      <input
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

テストファイル（ContactForm.test.jsx）
jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from './ContactForm';

test('form submits the user input', () => {
  const handleSubmit = jest.fn();
  render(<ContactForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByPlaceholderText(/your message/i), {
    target: { value: 'Hello' },
  });
  fireEvent.click(screen.getByText(/send/i));

  expect(handleSubmit).toHaveBeenCalledWith('Hello');
});
テスト実行：
bash
npx jest
✅ @testing-library/react を使って、「ボタンを押したらどうなるか？」をチェック

✅ 4. 受け入れテスト（E2E）の使い方（Cypress）
目的：
「ユーザーが実際に触ったときと同じ動作」をブラウザ上で確認
例：ブラウザでメッセージ送信ができるか？
js
// contact_form.cy.js
describe('Contact Form', () => {
  it('should allow user to submit message', () => {
    cy.visit('/contact'); // ページにアクセス
    cy.get('input[placeholder="Your message"]').type('Test message');
    cy.contains('Send').click();
    cy.contains('Message sent!').should('be.visible');
  });
});

実行手順（Cypressインストール済の場合）：
bash
npx cypress open
✅ GUIでブラウザが開き、ボタンクリックや送信が目で見て確認できます。

📌 補足：テスト導入のイメージ
ステップ	            目的	            ツール
sum()が正しい？ 	 ユニットテスト	        Jest
getUser → format	モジュールの連携確認	Jest + Mock
ボタン押すと送信？    UIの動作確認	        React Testing Library
本番環境で動く？	  ブラウザの自動操作テスト	Cypress

迷ったらこの順！
🧪 まず ユニットテスト
🔗 次に 結合テスト
🖥️ UIができたら システムテスト
🌍 本番直前に 受け入れテスト


🛠️ 1. テスト環境の構築手順（Jest + React + Cypress 編）
① Node.jsが必要です（インストール済ならスキップ）
https://nodejs.org/ にアクセス
「LTS版」をインストール（推奨）

② プロジェクト作成（ない場合）
bash
mkdir my-app
cd my-app
npm init -y
③ 必要なパッケージをインストール
✅ 基本（Jest）
bash
npm install --save-dev jest
✅ React（使っている場合）
bash
npm install react react-dom
npm install --save-dev @testing-library/react @testing-library/jest-dom
✅ Babel（必要に応じて）
bash
npm install --save-dev babel-jest @babel/preset-env @babel/preset-react
📄 .babelrc を作成：

json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
④ Jestの設定
📄 package.json に以下を追記：

json
"scripts": {
  "test": "jest"
},
"jest": {
  "testEnvironment": "jsdom"
}
⑤ Cypressの導入（受け入れテスト/E2E）
bash
npm install --save-dev cypress
初期化コマンド：

bash
npx cypress open
➡️ 自動的に cypress/ フォルダとサンプルが生成されます。

💻 2. VS Code での設定手順
✅ 拡張機能を入れる
拡張機能名	                    説明
Jest	                テスト実行・失敗箇所のハイライト
Testing Library	        React Testing Library に特化した補完
ESLint + Prettier	    コード整形＆エラー検知
Cypress Snippets	    Cypress 用の入力補完

✅ 設定ファイルの例（.vscode/settings.json）
json
{
  "jest.autoRun": {
    "watch": true
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.eol": "\n"
}

✅ テスト用ファイルの命名ルール（Jest）
ファイル名	            意味
sum.test.js	        通常のユニットテスト
App.test.jsx	    Reactコンポーネントのテスト
*.cy.js	            Cypressテストファイル

✅ テスト実行方法
方法	                コマンド
Jest テスト実行	       npx jest
UI付きテスト実行	   npx jest --watchAll
ReactのUIテスト実行	   npx jest（同上）
Cypress起動	          npx cypress open

🔍 3. よくあるエラーと解決法
問題	                                解決法
SyntaxError: Cannot use import	    Babelを導入し、babel-jestを設定
jest is not recognized	            npm install --save-dev jest を忘れていないか確認
JSXがエラーになる	                  .babelrcが正しく設定されているか確認
DOM関連でエラー	                     "testEnvironment": "jsdom" を設定

✅ 補足：React + Viteの場合の特別対応
bash
npm install --save-dev vitest @testing-library/react jsdom
vitest.config.js：

js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
package.json:

json
"scripts": {
  "test": "vitest"
}
🎯 結論：まずこれから！
bash
# まずユニットテストを始めたいなら
npm install --save-dev jest
npx jest --init


ソフトウェアテスト手法完全マスター！基本のテスト手法からTDDまで
https://www.youtube.com/watch?v=EOEt6kcadeQ