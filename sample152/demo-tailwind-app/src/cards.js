export function renderCards(container) {
    container.innerHTML = `
      <!-- カード 1: シンプルカード -->
      <div class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <img src="https://picsum.photos/seed/picsum/400/200" alt="sample" class="w-full h-48 object-cover">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">シンプルカード</h2>
          <p class="text-gray-600 mb-4">基本的なカード。画像＋タイトル＋テキスト。</p>
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">詳細</button>
        </div>
      </div>
  
      <!-- カード 2: ホバー拡大カード -->
      <div class="bg-white rounded-lg shadow overflow-hidden group">
        <div class="overflow-hidden">
          <img src="https://picsum.photos/seed/picsum/400/200" alt="sample"
            class="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500">
        </div>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">ホバー拡大カード</h2>
          <p class="text-gray-600 mb-4">画像がホバー時にズームインします。</p>
          <a href="#" class="text-blue-500 font-semibold hover:underline">続きを読む</a>
        </div>
      </div>
  
      <!-- カード 3: フッター付きカード -->
      <div class="bg-white rounded-lg shadow flex flex-col justify-between">
        <div>
          <img src="https://picsum.photos/seed/picsum/400/200" alt="sample" class="w-full h-48 object-cover">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-2">フッター付きカード</h2>
            <p class="text-gray-600">下部にアクションフッターを持つカード。</p>
          </div>
        </div>
        <div class="px-6 py-4 border-t flex justify-end space-x-2">
          <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">キャンセル</button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">保存</button>
        </div>
      </div>
    `;
  }
  