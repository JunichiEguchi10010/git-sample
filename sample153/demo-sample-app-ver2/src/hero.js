export function renderHero() {
    return `
      <section class="bg-indigo-600 text-white py-20 text-center" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4" data-aos="zoom-in">
          Tailwindで作るモダンサイト
        </h2>
        <p class="mb-6 text-lg" data-aos="fade-up" data-aos-delay="200">
          シンプルで美しいUIを素早く構築しましょう
        </p>
        <a href="#cards"
          class="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
          data-aos="fade-up"
          data-aos-delay="400">
          詳しく見る
        </a>
      </section>
    `;
  }
  