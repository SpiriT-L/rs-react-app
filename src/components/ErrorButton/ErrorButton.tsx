import { FC } from 'react';
import { ErrorButtonProps } from '../../types/Interface';
import styles from './ErrorButton.module.scss';

const ErrorButton: FC<ErrorButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.errorButton}>
      Error
    </button>
  );
};

export default ErrorButton;
