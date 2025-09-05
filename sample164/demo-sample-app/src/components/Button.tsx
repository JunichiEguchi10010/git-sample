// CSS Modulesをインポート（スタイルのスコープをこのコンポーネントに限定）
import styles from './Button.module.css';

// Buttonコンポーネントが受け取るpropsの型定義
type ButtonProps = {
  children: React.ReactNode; // ボタン内に表示する要素（テキストやアイコンなど）
  onClick?: () => void;      // クリック時に実行される関数（任意）
  disabled?: boolean;        // ボタンの無効化フラグ（任意）
};

// 💡 なぜ void を明示するのか？
// 型安全性の向上：戻り値を使わないことを明示することで、意図しない返却値によるバグを防げます。
// 設計の意図を伝える：この関数は「何かを返すため」ではなく、「何かを実行するため」だと明確になります。
// 教育的にも有効：初心者に「副作用と戻り値の違い」を教える良いきっかけになります。


// Buttonコンポーネントの定義（汎用的なボタンとして再利用可能）
export const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    // HTMLのbutton要素を使用し、CSS Modulesでスタイルを適用
    <button
      className={styles.primary} // primaryスタイルを適用（Button.module.cssで定義）
      onClick={onClick}          // クリックイベントをバインド（存在すれば実行）
      disabled={disabled}        // 無効化フラグに応じてボタンを非活性化
    >
      {/* ボタン内に表示する内容（テキストやアイコンなど） */}
      {children}
    </button>
  );
};


// 元コード
// import styles from './Button.module.css';

// type ButtonProps = {
//   children: React.ReactNode;
//   onClick?: () => void;
//   disabled?: boolean;
// };

// export const Button = ({ children, onClick, disabled }: ButtonProps) => {
//   return (
//     <button
//       className={styles.primary}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {children}
//     </button>
//   );
// };
