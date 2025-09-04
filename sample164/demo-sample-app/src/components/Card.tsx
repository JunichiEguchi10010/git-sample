import styles from './Card.module.css';
import { Button } from './Button';

type CardProps = {
  title: string; // サービス名などのタイトル
  content: string; // 説明文
};

export const Card = ({ title, content }: CardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
      <Button>詳細を見る</Button>
    </div>
  );
};