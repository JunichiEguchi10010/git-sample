import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={styles.primary}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
