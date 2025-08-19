export function renderHeader() {
    return `
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto flex justify-between items-center p-4">
          <!-- ロゴ -->
          <h1 class="text-xl font-bold text-indigo-600">DemoSite</h1>
          <!-- ナビ -->
          <nav class="hidden md:flex gap-6">
            <a href="#" class="text-gray-600 hover:text-indigo-600">ホーム</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600">サービス</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600">お問い合わせ</a>
          </nav>
          <!-- モバイル用メニューアイコン -->
          <button class="md:hidden text-gray-600">
            ☰
          </button>
        </div>
      </header>
    `;
  }
  