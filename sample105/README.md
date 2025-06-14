html css レスポンシブル レイアウト　202050614

基本のブレイクポイント
カラム切り替え・フレックス調整
ヘッダー・フッター対応
ボタン・余白・フォントサイズの最適化
スマホ専用表示の設定


/* ------------------------------
   ✅ 基本のブレイクポイント
------------------------------ */

/* PC（幅1024px以上） */
@media (min-width: 1024px) {
  body {
    font-size: 16px;
  }
}

/* タブレット（768px〜1023px） */
@media (min-width: 768px) and (max-width: 1023px) {
  body {
    font-size: 15px;
  }
}

/* スマホ（〜767px） */
@media (max-width: 767px) {
  body {
    font-size: 14px;
  }
}

/* ------------------------------
   ✅ レイアウト調整パターン
------------------------------ */

/* グリッドカラム数切り替え */
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* カード横並び → 縦並び */
.card-list {
  display: flex;
  gap: 24px;
}
@media (max-width: 767px) {
  .card-list {
    flex-direction: column;
  }
}

/* ヘッダーメニュー表示切り替え */
.header-nav {
  display: flex;
}
@media (max-width: 767px) {
  .header-nav {
    display: none;
  }
}

/* 画像サイズ調整 */
img.responsive {
  width: 100%;
  height: auto;
  max-width: 600px;
}

/* 見出しサイズ調整 */
h1 {
  font-size: 2.5rem;
}
@media (max-width: 767px) {
  h1 {
    font-size: 1.8rem;
  }
}

/* 余白調整 */
.section {
  padding: 80px 40px;
}
@media (max-width: 767px) {
  .section {
    padding: 60px 20px;
  }
}

/* フッターのカラム切り替え */
.footer-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 767px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

/* ボタンの大きさ調整 */
.btn {
  padding: 16px 32px;
  font-size: 1rem;
}
@media (max-width: 767px) {
  .btn {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
}

/* スマホ専用表示 */
.sp-only {
  display: none;
}
@media (max-width: 767px) {
  .sp-only {
    display: block;
  }
}
