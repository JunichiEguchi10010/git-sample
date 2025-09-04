Vite + React + TypeScript + CSS Modules の構成 20250904

demo-sample-app/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── global.css
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Card.tsx
│   │   └── Card.module.css

🧩 children と通常の props の違い
項目	        children	                                    通常の props（例：title, onClick）
定義方法	    <Component>中身</Component>	                    <Component title="..." onClick={...} />
渡され方	    タグの中に書いた内容が自動的に渡される	            明示的に属性として渡す
型定義	        children: React.ReactNode	                    任意の型（string, number, function など）
用途	        コンポーネントの「中身」や「表示内容」	            コンポーネントの「設定」や「動作制御」
柔軟性	        JSX, テキスト, HTML, コンポーネントなど何でもOK	    型に応じて制限あり
テンプレート性	高い（中身を差し替えるだけで再利用可能）	        高い（動作や表示を制御できる）

🔍 具体例で比較
✅ children を使う場合
tsx
<Button>購入する</Button>
→ "購入する" が children として渡され、Button.tsx ではこう使われます：

tsx
export const Button = ({ children }: ButtonProps) => (
  <button>{children}</button>
);
✅ 通常の props を使う場合
tsx
<Card title="サービスA" content="高品質なWeb制作を提供します。" />
→ title と content が明示的に渡され、Card.tsx ではこう使われます：

tsx
export const Card = ({ title, content }: CardProps) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

🧠 設計者としての視点
children は 「中身を差し替えるテンプレート」に最適。
ボタンやカードの中身を柔軟に変えたいときに使います。

通常の props は 「構造や動作を制御する設定値」として使います。
たとえば variant, size, disabled, onClick など。

この違いを意識することで、「中身を渡すべきか、設定を渡すべきか」の判断が明確になります。