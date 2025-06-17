html css section構成テンプレート　20250617

BEM設計 + CSS変数ベース

スマホ・タブレット・PC向けレスポンシブ対応

スクロールアニメーションはCSSで初期設計（動的処理は別ロジック化）

✅ HTML（セクション構成／.fade-in クラスは装飾用）
html
<main>

  <!-- About Section -->
  <section class="section section--about bg-light fade-in">
    <div class="section__inner">
      <h2 class="section__title">会社概要</h2>
      <p class="section__text">私たちは中小企業をサポートするWeb制作会社です。</p>
    </div>
  </section>

  <!-- Services Section -->
  <section class="section section--services bg-white fade-in">
    <div class="section__inner">
      <h2 class="section__title">サービス</h2>
      <ul class="service-list">
        <li class="service-list__item">ホームページ制作</li>
        <li class="service-list__item">WordPress開発</li>
        <li class="service-list__item">SEO対策</li>
      </ul>
    </div>
  </section>

  <!-- Works Section -->
  <section class="section section--works bg-gray fade-in">
    <div class="section__inner">
      <h2 class="section__title">実績</h2>
      <div class="works">
        <article class="works__item">A社コーポレートサイト</article>
        <article class="works__item">BショップECサイト</article>
      </div>
    </div>
  </section>

  <!-- Recruit Section -->
  <section class="section section--recruit bg-light fade-in">
    <div class="section__inner">
      <h2 class="section__title">採用情報</h2>
      <p class="section__text">現在、新しい仲間を募集しています。</p>
    </div>
  </section>

</main>

🎨 CSS（レスポンシブ + スクロールアニメーション基礎）
css
/* 1. 変数・基礎設定 */
:root {
  --color-bg-light: #f9f9f9;
  --color-bg-white: #ffffff;
  --color-bg-gray: #eeeeee;

  --color-text: #333;
  --color-accent: #3A99C9;

  --section-padding-pc: 6rem;
  --section-padding-tab: 4rem;
  --section-padding-sp: 2rem;

  --max-width: 1080px;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background-color: #fff;
  color: var(--color-text);
}

.bg-light { background-color: var(--color-bg-light); }
.bg-white { background-color: var(--color-bg-white); }
.bg-gray  { background-color: var(--color-bg-gray); }

/* 2. セクション共通スタイル */
.section {
  padding: var(--section-padding-pc) 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.section.visible {
  opacity: 1;
  transform: translateY(0);
}
.section__inner {
  max-width: var(--max-width);
  margin: 0 auto;
}
.section__title {
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 2rem;
}
.section__text {
  font-size: 1.25rem;
  line-height: 1.8;
}

/* 3. サービスリスト */
.service-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.service-list__item {
  position: relative;
  padding-left: 1.2em;
  margin-bottom: 1rem;
}
.service-list__item::before {
  content: "✔";
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

/* 4. 実績 */
.works {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.works__item {
  padding: 1rem;
  background: #fff;
  border-left: 4px solid var(--color-accent);
}

/* 5. レスポンシブ対応 */
@media (max-width: 1024px) {
  .section {
    padding: var(--section-padding-tab) 1rem;
  }
  .section__title {
    font-size: 2rem;
  }
  .section__text {
    font-size: 1.1rem;
  }
  .works {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .section {
    padding: var(--section-padding-sp) 1rem;
  }
  .section__title {
    font-size: 1.5rem;
  }
  .section__text {
    font-size: 1rem;
  }
}

💻 JavaScript（スクロールアニメーション別ロジック）
html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  });
</script>

🔍 まとめ
特徴	                                内容
🎯 設計基準	            BEM＋CSS変数で保守性・再利用性を担保
📱 レスポンシブ	         PC・タブレット・スマホ対応（ブレークポイント 1024px / 600px）
🎞 アニメーション	     スクロール時フェードイン（CSS基盤 + JS制御）
💡 拡張しやすさ	        .section--[name]でセクションを自由に増やせます