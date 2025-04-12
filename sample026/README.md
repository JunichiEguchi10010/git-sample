React 配列を表示・追加・削除する方法(簡単なメモアプリ作成)

Reactにおいて、配列の操作は基本的に「元の配列を直接変更せず」に、
新しい配列を作って状態を更新する（イミュータブルな方法）が推奨される。





📌 配列操作の基本パターン集（React/JavaScript）
1. 配列の表示（map）
jsx
コピーする
編集する
const memos = ['html', 'css', 'js']

return (
  <ul>
    {memos.map((memo, index) => (
      <li key={index}>{memo}</li>
    ))}
  </ul>
)

2. 配列に要素を追加（useState + スプレッド構文）
配列に要素を追加するのはuseStateで、スプレッド構文で既存の要素を展開し、新しい要素を加える。
この形で、元の配列を壊さず（イミュータブルに）新しい要素を追加します。

jsx
コピーする
編集する
const [memos, setMemos] = useState(['html', 'css'])

const addMemo = (newMemo) => {
  setMemos([...memos, newMemo]) // 末尾に追加
}
🔁 ['html', 'css', 'js'] のように更新される

3. 配列の特定要素を削除（filter + index）
配列から要素を削除するのはfilterメソッドで!== index 等価演算子を使い、削除したい要素以外の要素を指定し配列を作ることで、実質的に削除する

jsx
コピーする
編集する
const deleteMemo = (indexToDelete) => {
  setMemos(memos.filter((_, i) => i !== indexToDelete))
}
❌ 指定された index の要素を削除
✅ イミュータブル（元配列を壊さない）

4. 配列の特定要素を更新（map + 条件分岐）
jsx
コピーする
編集する
const updateMemo = (indexToUpdate, newValue) => {
  setMemos(memos.map((memo, i) => i === indexToUpdate ? newValue : memo))
}
✏️ index が一致したときだけ新しい値に置き換える

5. 配列の先頭に要素を追加（unshift 的）
jsx
コピーする
編集する
setMemos([newMemo, ...memos])
🆕 新しい要素を配列の先頭に入れる

6. 条件に合う要素だけを残す（filter）
js
コピーする
編集する
setMemos(memos.filter(memo => memo.includes('s')))
🔍 「s」を含む要素だけ残す

7. 配列を空にする（全削除）
js
コピーする
編集する
setMemos([]) // 配列をリセット
8. 重複を除いた配列を作る（Setを使う）
js
コピーする
編集する
setMemos([...new Set(memos)])
✨ 重複を自動的に排除（例: ['html', 'css', 'html'] → ['html', 'css']）

9. 昇順・降順に並び替え（sort）
js
コピーする
編集する
// アルファベット順に昇順
setMemos([...memos].sort())

// 長さ順に降順
setMemos([...memos].sort((a, b) => b.length - a.length))
❗元の配列を変更しないよう、[...memos] でコピーしてからソートします。



Reactで簡単なメモアプリを作りながら、配列を表示・追加・削除する方法
https://www.youtube.com/watch?v=GKMDcx38nyY