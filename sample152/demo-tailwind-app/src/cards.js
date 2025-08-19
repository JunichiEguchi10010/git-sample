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

  
//  ✅ 全体像の流れ

// 関数定義
// ・renderCards(container) が呼ばれると、渡された container の中身をカード群の HTML に置き換える。

// カード 1: シンプルカード
// ・画像 → タイトル → テキスト → 詳細ボタン
// ・ベーシックな「カードの雛形」として機能。

// カード 2: ホバー拡大カード
// ・画像部分を group-hover で拡大アニメーション。
// ・ユーザーがマウスを乗せたときの視覚的効果を確認できる。

// カード 3: フッター付きカード
// ・本文の下に「キャンセル」「保存」ボタンを並べる。
// ・実務でよくある「アクション付きカード」のパターン。

// 全体の特徴
// ・すべて bg-white shadow rounded で共通スタイルを持つ。
// ・ホバーアニメーションやフッターアクションなど、実務で頻出するカードの基本パターンを網羅。

// 👉 まとめると、この renderCards は
// 「カードデザインの典型例を3種類（基本・ホバー効果・フッター付き）まとめて表示するサンプル」

// ✅ 疑似コード
// 関数 renderCards(コンテナ) を定義する
//   コンテナの中身を以下のHTMLに置き換える

//     ▼ カード 1（シンプルカード）
//       - 画像（固定サイズ、横幅いっぱい）
//       - タイトル
//       - 説明テキスト
//       - 「詳細」ボタン（ホバー時に色変化）

//     ▼ カード 2（ホバー拡大カード）
//       - 画像（通常表示だが、ホバー時に拡大アニメーション）
//       - タイトル
//       - 説明テキスト
//       - 「続きを読む」リンク（青文字、ホバーで下線）

//     ▼ カード 3（フッター付きカード）
//       - 画像
//       - タイトル
//       - 説明テキスト
//       - 下部フッター部分にアクションボタン2つ
//           ・キャンセルボタン（灰色、ホバーで濃くなる）
//           ・保存ボタン（青色、ホバーで濃くなる）


// ✅ コード解説
// export function renderCards(container) {
// ➡ renderCards という関数を定義して外部から使えるようにエクスポートしている。
// 引数 container は「HTMLを描画する場所（要素）」。

//     container.innerHTML = `
// ➡ 引数で渡された要素（例: <div id="cards">）の中身を、以下のカード群のHTMLに置き換える。

//       <!-- カード 1: シンプルカード -->
// ➡ コメント。1つ目のカードは「シンプルなカード」。

//       <div class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
// ➡ カード本体を囲む要素。
// bg-white → 背景白
// rounded-lg → 角丸
// shadow → 通常の影
// hover:shadow-lg → ホバーすると影が大きくなる
// transition → アニメーションを滑らかに
// overflow-hidden → 内容がはみ出た場合に切り取る

//         <img src="https://picsum.photos/seed/picsum/400/200" alt="sample" class="w-full h-48 object-cover">
// ➡ カードの上部に表示する画像。
// 横幅いっぱい (w-full)
// 高さ固定 (h-48)
// object-cover → 画像が縦横比を保ちながらトリミングされて収まる。

//         <div class="p-6">
// ➡ カードの本文部分を包む。内側に余白 (p-6) を入れる。

//           <h2 class="text-xl font-semibold mb-2">シンプルカード</h2>
// ➡ タイトル。「大きめ文字」「太字」「下に余白」。

//           <p class="text-gray-600 mb-4">基本的なカード。画像＋タイトル＋テキスト。</p>
// ➡ 説明文。「灰色の文字」「下に余白」。

//           <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">詳細</button>
// ➡ ボタン。
// 青背景 (bg-blue-500)
// 白文字
// 丸み
// ホバー時に濃い青に変化 (hover:bg-blue-600)

//         </div>
//       </div>
// ➡ カード1の本文と外枠を閉じる。

//       <!-- カード 2: ホバー拡大カード -->
// ➡ コメント。2つ目のカードは「ホバー時に画像が拡大するカード」。
//       <div class="bg-white rounded-lg shadow overflow-hidden group">

// ➡ 2つ目のカード枠。group を付けて内部で「ホバー時の連動アニメーション」に利用。
//         <div class="overflow-hidden">

// ➡ 画像を枠で切り取るためのラッパー。
//           <img src="https://picsum.photos/seed/picsum/400/200" alt="sample"
//             class="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500">
// ➡ 画像。
// 通常は普通に表示。
// group-hover:scale-110 → 親要素にマウスを乗せると1.1倍に拡大。
// transition duration-500 → 0.5秒かけて拡大する。
//         </div>
//         <div class="p-6">
// ➡ 本文部分。内側に余白を設定。
//           <h2 class="text-xl font-semibold mb-2">ホバー拡大カード</h2>
// ➡ タイトル。
//           <p class="text-gray-600 mb-4">画像がホバー時にズームインします。</p>
// ➡ 説明文。
//           <a href="#" class="text-blue-500 font-semibold hover:underline">続きを読む</a>
// ➡ 「続きを読む」リンク。青文字で、ホバーすると下線が出る。
//         </div>
//       </div>
// ➡ カード2を閉じる。

//       <!-- カード 3: フッター付きカード -->
// ➡ コメント。3つ目は「フッター付きカード」。
//       <div class="bg-white rounded-lg shadow flex flex-col justify-between">
// ➡ 外枠。
// flex flex-col → 縦方向のFlexboxで配置。
// justify-between → 上部（本文）と下部（フッター）を離して配置。
//         <div>
// ➡ 本文部分の開始。
//           <img src="https://picsum.photos/seed/picsum/400/200" alt="sample" class="w-full h-48 object-cover">
// ➡ 画像（カード上部）。
//           <div class="p-6">
//             <h2 class="text-xl font-semibold mb-2">フッター付きカード</h2>
//             <p class="text-gray-600">下部にアクションフッターを持つカード。</p>
//           </div>

// ➡ タイトルと説明文を本文に表示。
//         </div>
//         <div class="px-6 py-4 border-t flex justify-end space-x-2">

// ➡ フッター部分。
// 上に線 (border-t)
// 右寄せ配置 (justify-end)
// ボタン間に余白 (space-x-2)
//           <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">キャンセル</button>
// ➡ 灰色の「キャンセル」ボタン。
//           <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">保存</button>
// ➡ 青色の「保存」ボタン。
//         </div>
//       </div>
//     `;
// }
// ➡ フッター付きカードを閉じ、container のHTMLを完成させ、関数終了。

// ✅ まとめ
// カード1 → 基本（画像＋テキスト＋ボタン）
// カード2 → ホバー時に画像が拡大する動き付き
// カード3 → フッターにボタンが付いた「実務でよく使うカード」