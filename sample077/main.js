import { message, greet } from './module.js';
import saySomething from './module.js';// export defaultで定義した関数は、importするときに名前をつけなくてもよい

console.log(message); // Hello, World!
console.log(greet("Alice")); // Hello, Alice!
console.log(saySomething()); // Hello from default function!

// DOMに表示して確認
document.getElementById("output").textContent =
  `${message} | ${greet("Taro")} | ${saySomething()}`;
