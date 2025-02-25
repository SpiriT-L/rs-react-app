import { FC } from 'react';
import styles from './Loader.module.scss';

interface LoadingProps {
  message?: string;
}

const Loading: FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div data-testid="loader" className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );
};

export default Loading;
