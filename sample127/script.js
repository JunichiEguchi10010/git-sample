// DOMの読み込みが完了したら処理を実行
document.addEventListener('DOMContentLoaded', () => {

    // 動画の親コンテナを取得（今後複数対応も可能）
    const containers = document.querySelectorAll('.video-container');
  
    // 各コンテナに対して処理を実行
    containers.forEach(container => {
      // すでにiframeが入っている場合はスキップ（手動埋め込み対応）
      if (container.querySelector('iframe')) return;
  
      // iframe要素を新しく作成
      const iframe = document.createElement('iframe');
  
      // YouTubeの動画URLを設定（ここは任意のIDに変更可能）
      iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  
      // YouTubeの埋め込みに必要な属性を設定
      iframe.setAttribute('title', 'YouTube video player');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
  
      // 作成したiframeを親コンテナに追加
      container.appendChild(iframe);
    });
  });
  