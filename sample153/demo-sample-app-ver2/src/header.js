// サイトのヘッダーを生成する関数（HTML文字列として返す）
export function renderHeader() {
    return `
      <!-- ヘッダー全体のスタイル：白背景＋シャドウ -->
      <header class="bg-white shadow">
        <!-- コンテンツの最大幅を設定し、中央寄せ＋Flexで配置 -->
        <div class="max-w-7xl mx-auto flex justify-between items-center p-4">
          
          <!-- サイトロゴ：左側に配置 -->
          <h1 class="text-xl font-bold text-indigo-600">DemoSite</h1>
          
          <!-- ナビゲーションメニュー：中画面以上で表示、リンク間に余白 -->
          <nav class="hidden md:flex gap-6">
            <a href="#" class="text-gray-600 hover:text-indigo-600">ホーム</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600">サービス</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600">お問い合わせ</a>
          </nav>
          
          <!-- モバイル用メニューアイコン：中画面未満で表示 -->
          <button class="md:hidden text-gray-600">
            ☰
          </button>
        </div>
      </header>
    `;
  }


//   max-w-7xl mx-auto：中央寄せ＋最大幅制限でレイアウトが整います
//   md:flex と md:hidden：レスポンシブ対応で、画面サイズに応じて表示/非表示を切り替え
//   hover:text-indigo-600：マウスホバー時に色が変わることで、ユーザーの操作感を向上

// export function renderHeader() {
//     return `
//       <header class="bg-white shadow">
//         <div class="max-w-7xl mx-auto flex justify-between items-center p-4">
//           <!-- ロゴ -->
//           <h1 class="text-xl font-bold text-indigo-600">DemoSite</h1>
//           <!-- ナビ -->
//           <nav class="hidden md:flex gap-6">
//             <a href="#" class="text-gray-600 hover:text-indigo-600">ホーム</a>
//             <a href="#" class="text-gray-600 hover:text-indigo-600">サービス</a>
//             <a href="#" class="text-gray-600 hover:text-indigo-600">お問い合わせ</a>
//           </nav>
//           <!-- モバイル用メニューアイコン -->
//           <button class="md:hidden text-gray-600">
//             ☰
//           </button>
//         </div>
//       </header>
//     `;
//   }
  