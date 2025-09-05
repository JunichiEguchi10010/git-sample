// CSS Modulesをインポート（クラス名の衝突を防ぎ、スタイルをコンポーネント単位で管理）
import styles from './Card.module.css';

// ボタンコンポーネントをインポート（共通UI部品として再利用）
import { Button } from './Button';

// Cardコンポーネントに渡されるpropsの型定義（タイトルと説明文を受け取る）
type CardProps = {
  title: string;   // サービス名などのタイトル
  content: string; // サービスの説明文
};

// Cardコンポーネントの定義（サービス紹介用の再利用可能なUIブロック）
export const Card = ({ title, content }: CardProps) => {
  return (
    // カード全体のラッパー要素（CSS Modulesでスタイルを適用）
    <div className={styles.card}>
      {/* タイトル表示（propsから受け取ったtitleを表示） */}
      <h2 className={styles.title}>{title}</h2>

      {/* 説明文表示（propsから受け取ったcontentを表示） */}
      <p className={styles.content}>{content}</p>

      {/* 詳細ボタン（共通のButtonコンポーネントを使用） */}
      <Button>詳細を見る</Button>
    </div>
  );
};


// 元コード
// import styles from './Card.module.css';
// import { Button } from './Button';

// type CardProps = {
//   title: string; // サービス名などのタイトル
//   content: string; // 説明文
// };

// export const Card = ({ title, content }: CardProps) => {
//   return (
//     <div className={styles.card}>
//       <h2 className={styles.title}>{title}</h2>
//       <p className={styles.content}>{content}</p>
//       <Button>詳細を見る</Button>
//     </div>
//   );
// };