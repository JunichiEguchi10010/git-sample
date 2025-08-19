import "./style.css";
import { renderCards } from "./cards.js";

document.getElementById("app").innerHTML = `
  <h1 class="text-3xl font-bold mb-8 text-center">Tailwind v3 カード例</h1>
  <div id="cards" class="grid gap-8 md:grid-cols-3"></div>
`;

renderCards(document.getElementById("cards"));
