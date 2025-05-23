import { jest } from '@jest/globals';
import { fetchUserData } from './script';
//  jest.fn() を使ってAPIのレスポンスをモック化。  fetchUserData() の結果が正しく表示されるかをテスト。
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ name: 'Junichi', email: 'junichi@example.com' })
  })
);

test('APIからユーザーデータを取得できる', async () => {
  document.body.innerHTML = `
    <button id="fetchButton"></button>
    <div id="userData"></div>
  `;
  
  await fetchUserData();
  
  expect(document.getElementById('userData').innerHTML).toBe('名前: Junichi, メール: junichi@example.com');
});

// Jestをインストールし、テストを実行。
// npm install --save-dev jest
// npm test(package.jsonに以下のテストスクリプト追加)
// {
//     "scripts": {
//       "test": "jest"
//     }

// ボタンをクリックすると、APIからデータを取得&表示
// Jestを使ってAPIの通信結果を検証