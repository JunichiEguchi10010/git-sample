//画像の基本の切り出し機能
function setCrop(x, y, duration = 300) {
    const crop = document.getElementById('crop-area');
    crop.style.transition = `background-position ${duration}ms ease`;
    crop.style.backgroundPosition = `-${x}px -${y}px`;
}

// 動的な切り出し制御
let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

function enableDragCrop() {
    const crop = document.getElementById('crop-area');
    
    // マウスイベント
    crop.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    
    // タッチイベント（モバイル対応）
    crop.addEventListener('touchstart', startDragTouch);
    document.addEventListener('touchmove', dragTouch);
    document.addEventListener('touchend', stopDrag);
}

function startDrag(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const crop = document.getElementById('crop-area');
    crop.classList.add('dragging');
    e.preventDefault();
}

function startDragTouch(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    const crop = document.getElementById('crop-area');
    crop.classList.add('dragging');
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    currentX = Math.max(0, Math.min(600, currentX - deltaX));
    currentY = Math.max(0, Math.min(600, currentY - deltaY));
    
    const crop = document.getElementById('crop-area');
    crop.style.backgroundPosition = `-${currentX}px -${currentY}px`;
    
    startX = e.clientX;
    startY = e.clientY;
    e.preventDefault();
}

function dragTouch(e) {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    
    currentX = Math.max(0, Math.min(600, currentX - deltaX));
    currentY = Math.max(0, Math.min(600, currentY - deltaY));
    
    const crop = document.getElementById('crop-area');
    crop.style.backgroundPosition = `-${currentX}px -${currentY}px`;
    
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    e.preventDefault();
}

function stopDrag() {
    isDragging = false;
    const crop = document.getElementById('crop-area');
    crop.classList.remove('dragging');
}

// ページ読み込み時にドラッグ機能を有効化
document.addEventListener('DOMContentLoaded', function() {
    enableDragCrop();
});


// 🧩コードの全体構造と役割
// 🎯目的
// 背景画像を1枚読み込み、それを crop-area 要素内で表示。
// ユーザーがマウスや指でドラッグ操作すると、表示位置（background-position）が動く。
// 見えている部分を「切り出し領域」として扱うことで、画像を擬似的にスクロール／移動できる。

// 🏗️主な構成
// セクション	                    内容
// setCrop(x, y, duration)	    指定位置へスムーズに背景画像を移動。切り出しの初期化／更新に使える。
// 変数定義	                     ドラッグ制御のための状態を記録する（開始位置、現在位置、状態フラグ）。
// enableDragCrop()	             ページ上にマウス／タッチイベントを登録して、インタラクションを有効化。
// startDrag, startDragTouch	 ユーザーが操作開始したときに状態記録＋準備（CSSクラス追加など）。
// drag, dragTouch	             ユーザーの移動に合わせて背景画像の表示位置を更新。
// stopDrag()	                 操作終了時に状態を解除し、CSSクラスを元に戻す。
// DOMContentLoadedイベント      ページ読み込み完了時に enableDragCrop() を呼び出し、イベントをセット。

// 🖼️挙動の例
// 画像全体が背景として読み込まれている。
// 表示領域（たとえば300×300px）の中で背景位置を変更することで、見える部分を操作。
// マウス操作にもスマホ操作にも対応していて、UXの柔軟性が高い。


// 疑似コード
// ✅ 基本の切り出し処理：setCrop(x, y, duration)
// 指定された座標 (x, y) に応じて、背景画像の表示位置を変更する
// 変更は duration ミリ秒で滑らかに動く（デフォルト：300ms）
// 操作対象は ID crop-area の要素

// ✅ ドラッグ操作のための初期変数定義
// isDragging：ドラッグ中かどうかのフラグ
// startX, startY：ドラッグ開始時の座標
// currentX, currentY：現在表示している背景画像の位置

// 🖱️ enableDragCrop()：マウス・タッチイベントの登録
// ID crop-area 要素に、ドラッグ開始のイベントを登録（マウス・タッチ両方）
// document 全体に、ドラッグ中の移動処理と終了処理を登録

// 🖱️ startDrag(event)：マウスでドラッグ開始
// isDragging を true に
// 開始時のマウス座標を取得して記録
// crop-area に「dragging中」のCSSクラスを追加（視覚効果などに使える）

// 📱 startDragTouch(event)：タッチでドラッグ開始
// スマホ・タブレット対応のため、タッチイベントで開始
// 指先の座標を取得して記録
// crop-area に「dragging中」のCSSクラスを追加

// 🖱️ drag(event)：マウス移動に応じて背景画像を動かす
// ドラッグ中なら処理を実行
// 移動量（deltaX, deltaY）を計算
// 現在の背景位置を更新（範囲は 0〜600px に制限）
// background-position を更新して、切り出し位置を変える
// 現在のマウス座標を再記録

// 📱 dragTouch(event)：タッチ移動に応じて背景画像を動かす
// タッチドラッグ中なら処理を実行
// 指の移動量を計算して、背景画像位置を更新
// 座標の制限・再記録もマウスと同様

// 🛑 stopDrag()：ドラッグ操作の終了
// isDragging を false に戻す
// crop-area の CSSクラス dragging を削除

// 🚀 ページ読み込み時：イベント初期化
// ページが読み込まれたら enableDragCrop() を実行し、すべてのイベントを登録しておく

// 📌まとめ
// このコードでできることは：
// 画像の一部を動的に表示し、切り出し領域を操作可能にする
// マウスでもスマホでも自然な操作感が得られる
// シンプルながら実務的にも拡張しやすい構造

// コード解説

// 🌱 切り出し操作の初期設定
// function setCrop(x, y, duration = 300) {
// setCrop 関数：背景画像の表示位置を (x, y) に設定。アニメーションの長さは duration ミリ秒（初期値は 300ms）。

//     const crop = document.getElementById('crop-area');
// DOM から id="crop-area" の要素を取得。

//     crop.style.transition = `background-position ${duration}ms ease`;
// 背景画像の移動にスムーズなアニメーションを追加。

//     crop.style.backgroundPosition = `-${x}px -${y}px`;
// CSSで背景画像の位置をマイナス方向に移動（切り出しの座標変更）。

// 🛠 ドラッグ操作に使う変数の定義
// let isDragging = false;
// ドラッグ中かどうかを判定するフラグ。

// let startX, startY;
// ドラッグ開始位置（マウスやタッチ）を保存。

// let currentX = 0, currentY = 0;
// 現在の背景位置。初期値は 0,0。

// 🖱️ イベントリスナーの登録
// function enableDragCrop() {
// マウス・タッチ操作を有効化する初期化関数。

//     const crop = document.getElementById('crop-area');
// crop-area を取得。

// 🖱️ マウス操作
//     crop.addEventListener('mousedown', startDrag);
// マウスダウン（クリック）でドラッグ開始。

//     document.addEventListener('mousemove', drag);
// マウス移動で背景を動かす。

//     document.addEventListener('mouseup', stopDrag);
// マウスボタンを離したときにドラッグ終了。

// 📱 タッチ操作
//     crop.addEventListener('touchstart', startDragTouch);
// 指で触れたときにドラッグ開始。

//     document.addEventListener('touchmove', dragTouch);
// 指を動かすと背景も動く。

//     document.addEventListener('touchend', stopDrag);
// 指を離したらドラッグ終了。

// 🖱️ マウスでドラッグ開始
// function startDrag(e) {
// マウスダウン時に呼ばれる。

//     isDragging = true;
// ドラッグ状態に。

//     startX = e.clientX;
//     startY = e.clientY;
// マウス位置を保存。

//     const crop = document.getElementById('crop-area');
// 切り出しエリア取得。

//     crop.classList.add('dragging');
// CSSクラスを追加（スタイル切り替えなどに使える）。

//     e.preventDefault();
// デフォルト動作（画像選択など）を防止。

// 📱 タッチでドラッグ開始
// function startDragTouch(e) {
// 指で触れたときに呼ばれる。

//     isDragging = true;
// ドラッグ状態に。

//     startX = e.touches[0].clientX;
//     startY = e.touches[0].clientY;
// 指の座標を取得（touches[0]は最初の指）。

//     const crop = document.getElementById('crop-area');
//     crop.classList.add('dragging');
//     e.preventDefault();
// 同様にドラッグ開始処理。

// 🖱️ マウス移動で背景画像を動かす
// function drag(e) {
//     if (!isDragging) return;
// ドラッグ状態でなければ処理しない。

//     const deltaX = e.clientX - startX;
//     const deltaY = e.clientY - startY;
// 移動量を計算。

//     currentX = Math.max(0, Math.min(600, currentX - deltaX));
//     currentY = Math.max(0, Math.min(600, currentY - deltaY));
// 表示位置を更新（0〜600pxの範囲に制限）。

//     const crop = document.getElementById('crop-area');
//     crop.style.backgroundPosition = `-${currentX}px -${currentY}px`;
// 背景の表示位置を変更。

//     startX = e.clientX;
//     startY = e.clientY;
//     e.preventDefault();
// 現在位置を再更新して次の差分計算に備える。

// 📱 指で移動したら背景画像を動かす
// function dragTouch(e) {
//     if (!isDragging) return;
// 同様に指での移動処理。

//     const deltaX = e.touches[0].clientX - startX;
//     const deltaY = e.touches[0].clientY - startY;
// 指の移動量を計算。

//     currentX = Math.max(0, Math.min(600, currentX - deltaX));
//     currentY = Math.max(0, Math.min(600, currentY - deltaY));
// 背景位置の更新。

//     const crop = document.getElementById('crop-area');
//     crop.style.backgroundPosition = `-${currentX}px -${currentY}px`;
//     startX = e.touches[0].clientX;
//     startY = e.touches[0].clientY;
//     e.preventDefault();
// 表示変更＋位置更新。

// 🛑 ドラッグ終了
// function stopDrag() {
//     isDragging = false;
//     const crop = document.getElementById('crop-area');
//     crop.classList.remove('dragging');
// }
// 状態解除と CSSクラス削除。

// 🧭 ページが読み込まれたらイベントをセット
// document.addEventListener('DOMContentLoaded', function() {
//     enableDragCrop();
// });
// ページ読み込み完了時に、イベントリスナーを登録する。