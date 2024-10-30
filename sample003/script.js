document.querySelectorAll(".videos video").forEach((video) => {
  video.onclick = () => {
    // モーダルのdisplayスタイルをblockに設定し、画面に表示します。.modalクラスのdisplay: noneは解除され、モーダルが見えるようになります。
    document.querySelector(".modal").style.display = "block";
    // それぞれの動画のvideoタグのsrc属性を取得
    // クリックした動画のsrc（動画ファイルのパス）を取得し、モーダル内の<video>タグのsrc属性に設定します。この設定により、モーダルで表示される動画がクリックした動画に変更されます。
    document.querySelector(".modal video").src = video.getAttribute("src");
    // モーダル内の<video>タグの再生を開始します。.play()メソッドで動画が再生されます。
    document.querySelector(".modal video").play();
  };
});

// .modal内の<span>（×ボタン）にクリックイベントを設定します。クリック時に以下の処理を実行します。
const span = (document.querySelector(".modal span").onclick = () => {
  // モーダルのdisplayスタイルをnoneに設定して非表示にします。モーダルが見えなくなり、動画も見えなくなります。
  document.querySelector(".modal").style.display = "none";
  // モーダル内の<video>タグの再生を停止します。.pause()メソッドで動画の再生が中断されます。
  document.querySelector(".modal video").pause();
});
