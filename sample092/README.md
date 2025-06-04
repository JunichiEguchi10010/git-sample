Vite × React ボタンを押すと現在の時刻を表示する　20250604

擬似コード：
「今の時刻」ボタンを押すと：
  現在の時刻を取得する
  表示エリアに表示する

❌悪い例：ボタン内で時刻処理も全部やる
⭕良い例：時刻の取得は getCurrentTime() に分離


sample092/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ App.jsx       ← 時刻ボタンの中身を書く
   ├─ main.jsx      ← Reactのエントリポイント
   └─ index.css     ← 全体的なスタイル


✅ コード解説
「今の時刻」 ボタンをクリックすると
関数 getCurrentTime() が実行されて
new Date().toLocaleTimeString() で現在時刻（例：14:32:10）を取得し
currentTime に反映
画面に時刻が表示される

function App() {
  const [currentTime, setCurrentTime] = useState('')

  // 時刻を取得する関数
  const getCurrentTime = () => {
    const now = new Date()
    const time = now.toLocaleTimeString()
    setCurrentTime(time)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>現在の時刻を表示</h1>
      <button onClick={getCurrentTime}>今の時刻</button>
      <p style={{ fontSize: '24px', marginTop: '20px' }}>{currentTime}</p>
    </div>
  )
}

export default App

✅詳細な解説
import { useState } from 'react'
👉 React の中にある useState という機能（フック）を読み込んでいます。
これは「状態（State）」という、画面の内容を管理するための道具です。
ここでは「現在の時刻」を画面に表示するために使います。

function App() {
👉 Reactのアプリの中身を定義しています。App という関数は、見た目と動作を返す コンポーネント です。

  const [currentTime, setCurrentTime] = useState('')
👉 「現在の時刻（currentTime）」を記録しておく変数です。
currentTime: 現在の時刻を入れておく場所（例：「14:30:10」）
setCurrentTime: その時刻を変更する関数
useState(''): 最初は空っぽ（空文字）で始めます
🔁 画面に出す情報は useState を使って管理します！

  // 時刻を取得する関数
この下にある関数が「時刻を取得するものだよ」と書いています。

  const getCurrentTime = () => {
👉 関数（ボタンが押されたときに実行する処理）を定義しています。
名前は getCurrentTime（「時刻を取得する」という意味）です。

    const now = new Date()
👉 現在の日付と時刻を取得しています。
JavaScriptの Date() オブジェクトを使っています。

    const time = now.toLocaleTimeString()
👉 now から「時刻だけ」を取り出して、読みやすい形（例：13:55:02）に変換しています。
toLocaleTimeString() は、パソコンの言語設定に合わせて表示します。

    setCurrentTime(time)
👉 画面に表示する「時刻の値」を更新します。
つまり、さっきの currentTime に新しい時刻をセットしています。

  }
👉 関数 getCurrentTime の終わりです。

  return (
👉 ここから「画面に表示する内容」を書いていきます。
Reactコンポーネントは return の中で HTML を返します。

    <div style={{ textAlign: 'center', marginTop: '50px' }}>
👉 画面の中央に揃えて、上に少しスペースを取ったボックスです。
CSSスタイルを直接指定しています。

      <h1>現在の時刻を表示</h1>
👉 見出しです。「現在の時刻を表示」と画面に出ます。

      <button onClick={getCurrentTime}>今の時刻</button>
👉 ボタンです。
押すと getCurrentTime() 関数が呼ばれて、時刻が表示されるようになります。
onClick={...} で「クリックされたときの動作」を指定します。

      <p style={{ fontSize: '24px', marginTop: '20px' }}>{currentTime}</p>
👉 ここが「時刻の表示エリア」です。
画面には currentTime に入っている文字（例：13:32:45）が表示されます。
大きめの文字サイズで、少しスペースを空けて下に表示されます。

    </div>
  )
👉 div と return の閉じカッコです。

export default App

👉 この App コンポーネントを、他のファイル（例：main.jsx）で使えるように外に出しています。
これがないと、Reactの画面に表示できません。

✅ まとめ
このコードは：
🟢 useState で状態（currentTime）を管理し、
🟢 ボタンをクリックすると現在の時刻を取得し、
🟢 それを画面に表示するアプリです。