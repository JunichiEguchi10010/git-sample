// DOMの読み込みが完了したら処理を実行
document.addEventListener('DOMContentLoaded', () => {

  // 動画の親コンテナを取得（今後複数対応も可能）
  const containers = document.querySelectorAll('.video-container');
  
  // 各コンテナに対して処理を実行
  containers.forEach(container => {
    // 既存のiframeがある場合は、そのiframeの属性を更新
    let iframe = container.querySelector('iframe');
    
    if (iframe) {
      // 既存のiframeの属性を更新
      iframe.src = 'https://www.youtube.com/embed/Px2Xyt2MhsU';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.border = 'none';
    } else {
      // iframe要素を新しく作成
      iframe = document.createElement('iframe');
      
      // YouTubeの動画URLを設定（ここは任意のIDに変更可能）
      iframe.src = 'https://www.youtube.com/embed/IqKz0SfHaqI';
      
      // YouTubeの埋め込みに必要な属性を設定
      iframe.setAttribute('title', 'YouTube video player');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      
      // 作成したiframeを親コンテナに追加
      container.appendChild(iframe);
    }
  });
});
  

//　コード解説
//  1. ページのHTML（DOM）の読み込みが完了したら、次の処理を開始する。

// 2. クラス名が「video-container」の要素をすべて取得する。
//    → 今後、複数の動画埋め込みにも対応できるように、すべてに対して処理する。

// 3. それぞれのvideo-containerに対して、以下の処理を順番に行う：

// 　3-1. containerの中にすでに<iframe>タグがあるか調べる。

// 　3-2. もしiframeが存在する場合：
// 　　　・そのiframeの動画URLを、指定されたYouTube動画のURLに変更する。
// 　　　・動画再生に必要な属性（allow、allowfullscreenなど）を設定し直す。
// 　　　・iframeの枠線（border）を非表示にする。

// 　3-3. もしiframeが存在しない場合：
// 　　　・新しくiframe要素をJavaScriptで作る。
// 　　　・そのiframeにYouTubeの動画URLを設定する。
// 　　　・YouTube埋め込みに必要な各種属性（title、frameborder、allowなど）を設定する。
// 　　　・作成したiframeをvideo-containerの中に追加する。

// 4. 全てのvideo-containerについてこの処理を繰り返す。

// ✅ まとめ（このスクリプトの目的）
// 既存のiframeがあれば再利用し、動画を差し替える
// iframeがなければ新しく作って追加する
// レスポンシブや属性の設定も自動で行う