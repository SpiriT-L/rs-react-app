import { FC } from 'react';
import styles from './ErrorButton.module.scss';

interface ErrorButtonProps {
  onClick: () => void;
}

const ErrorButton: FC<ErrorButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.errorButton}>
      Error
    </button>
  );
};

export default ErrorButton;
