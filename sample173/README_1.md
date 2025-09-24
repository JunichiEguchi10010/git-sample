JavaScriptで実務でもよく使う標準組み込みメソッド 20250925

✅ よく使う標準組み込みメソッド
1. 配列関連 (Array)
メソッド	    説明	例
push()	    配列の末尾に要素を追加	[1,2].push(3) → [1,2,3]
pop()	    配列の末尾を削除	[1,2,3].pop() → [1,2]
shift()	    配列の先頭を削除	[1,2,3].shift() → [2,3]
unshift()	配列の先頭に追加	[2,3].unshift(1) → [1,2,3]
map()	    各要素を変換して新配列を返す	[1,2,3].map(x => x*2) → [2,4,6]
filter()	条件を満たす要素だけ抽出	[1,2,3,4].filter(x => x%2===0) → [2,4]
reduce()	配列を集計して1つの値にまとめる	[1,2,3].reduce((sum,x)=>sum+x,0) → 6
some()	    条件を満たす要素が1つでもあるか	[1,2,3].some(x=>x>2) → true
every()	    全要素が条件を満たすか	[1,2,3].every(x=>x>0) → true
find()	    条件を満たす最初の要素を返す	[1,2,3].find(x=>x>1) → 2

2. 文字列関連 (String)
メソッド	    説明	例
includes()	文字列に特定文字が含まれるか	"Hello".includes("ell") → true
indexOf()	文字列の位置を取得	"Hello".indexOf("l") → 2
slice() 	部分文字列を取得	"Hello".slice(1,4) → "ell"
toUpperCase()	大文字に変換	"abc".toUpperCase() → "ABC"
toLowerCase()	小文字に変換	"ABC".toLowerCase() → "abc"
trim()	    前後の空白を削除	" hi ".trim() → "hi"
split()	    区切り文字で分割して配列に	"a,b,c".split(",") → ["a","b","c"]
replace()	文字列を置換	"abc".replace("b","B") → "aBc"

3. 数学関連 (Math)
メソッド	    説明	例
Math.max()	最大値を取得	Math.max(1,5,3) → 5
Math.min()	最小値を取得	Math.min(1,5,3) → 1
Math.floor()	小数切り捨て	Math.floor(3.7) → 3
Math.ceil()	小数切り上げ	Math.ceil(3.2) → 4
Math.round()	四捨五入	Math.round(3.5) → 4
Math.random()	0以上1未満の乱数	Math.random() → 0.123456…

4. JSON関連 (JSON)
メソッド	            説明	例
JSON.stringify()	JSオブジェクト → JSON文字列	JSON.stringify({a:1}) → '{"a":1}'
JSON.parse()	    JSON文字列 → JSオブジェクト	JSON.parse('{"a":1}') → {a:1}

5. 日付関連 (Date)
メソッド	        説明	例
getFullYear()	年を取得	(new Date()).getFullYear() → 2025
getMonth()	    月を取得（0〜11）	(new Date()).getMonth() → 8 （9月）
toISOString()	ISO形式文字列に変換	(new Date()).toISOString() → "2025-09-25T03:00:00.000Z"

6. コレクション関連 (ES6以降)
「コレクション関連」というのは、複数の値やオブジェクトをまとめて扱うための標準オブジェクトやその操作のことを指します。
要は「データの集まり（集合やマップ）を効率よく扱うための機能」のことです。

Map 「キーと値」のペアを保持。オブジェクトより柔軟にキーを扱える。
メソッド	        説明	例
set(key, value)	キーと値を追加/更新	map.set('a',1)
get(key)	    キーに対応する値を取得	map.get('a') → 1
has(key)	    キーが存在するか	map.has('a') → true
delete(key)	    キーと値を削除	map.delete('a')
clear()	        全て削除	map.clear()
size	        要素数を取得	map.size → 0

Set 重複を許さない値の集合。値の有無チェックや追加・削除が簡単。
メソッド	        説明	例
add(value)	    値を追加	set.add(1)
has(value)	    値が存在するか	set.has(1) → true
delete(value)	値を削除	set.delete(1)
clear()	        全て削除	set.clear()
size	        要素数を取得	set.size → 3

WeakMap Mapの弱参照版。キーはオブジェクトのみでガベージコレクションされる。
メソッド	        説明	例
set(obj, value)	キーと値を追加/更新	wm.set(obj,1)
get(obj)	    キーに対応する値を取得	wm.get(obj)
has(obj)	    キーが存在するか	wm.has(obj) → true
delete(obj)	    キーを削除	wm.delete(obj)

WeakSet Setの弱参照版。オブジェクトのみでガベージコレクションされる。
メソッド	    説明	例
add(obj)	オブジェクトを追加	ws.add(obj)
has(obj)	存在チェック	ws.has(obj) → true
delete(obj)	削除	ws.delete(obj)

🔹 どういうときに使うか
Map / WeakMap → 「オブジェクトをキーにして値を管理したいとき」
Set / WeakSet → 「重複を避けつつ集合として値を管理したいとき」
Array → 「順序付きのリストとして値を扱いたいとき」

7. 非同期関連 (Promise)
メソッド	                        説明	例
then(onFulfilled, onRejected)	成功/失敗時の処理	p.then(v=>console.log(v))
catch(onRejected)	            失敗時の処理	p.catch(e=>console.error(e))
finally(onFinally)	            成否に関わらず実行	p.finally(()=>console.log('done'))
Promise.all([p1,p2])	        全てのPromise完了で結果取得	Promise.all([p1,p2]).then(...)
Promise.race([p1,p2])	        最初に完了したPromiseの結果	Promise.race([p1,p2]).then(...)
Promise.allSettled([p1,p2])	    全ての結果（成功/失敗）取得	Promise.allSettled([p1,p2]).then(...)
Promise.any([p1,p2])	        成功した最初のPromise結果	Promise.any([p1,p2]).then(...)