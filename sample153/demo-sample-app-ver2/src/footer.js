// フッター要素を生成する関数（HTML文字列として返す）
export function renderFooter() {
  return `
    <!-- サイトのフッターセクション -->
    <footer class="bg-gray-800 text-white text-center p-6 mt-10">
      <!-- 著作権情報を表示 -->
      <p>&copy; 2025 DemoSite. All rights reserved.</p>
    </footer>
  `;
}

// export function によって、この関数は他のモジュールからインポート可能になります。
// Tailwind CSSのクラス（bg-gray-800, text-white, text-center, p-6, mt-10）を使って、スタイルを簡潔に定義しています。
// HTML文字列として返しているので、JavaScriptでDOMに挿入する用途に適しています（例：document.getElementById("app").innerHTML = renderFooter(); など）。

// 元コード
// export function renderFooter() {
//     return `
//       <footer class="bg-gray-800 text-white text-center p-6 mt-10">
//         <p>&copy; 2025 DemoSite. All rights reserved.</p>
//       </footer>
//     `;
//   }
  