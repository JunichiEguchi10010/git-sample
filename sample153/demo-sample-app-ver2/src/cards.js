export function renderCards(container) {
    const cards = [
      { title: "高速開発", text: "TailwindのユーティリティでCSS不要の素早い開発。" },
      { title: "レスポンシブ", text: "モバイルからデスクトップまで美しいUIを自動調整。" },
      { title: "拡張性", text: "自由なカスタマイズで実務でも耐えられる設計。" },
    ];
  
    container.innerHTML = cards
      .map(
        (card, i) => `
          <div class="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
               data-aos="fade-up"
               data-aos-delay="${i * 200}">
            <h3 class="text-xl font-semibold mb-2">${card.title}</h3>
            <p class="text-gray-600">${card.text}</p>
          </div>
        `
      )
      .join("");
  }
  