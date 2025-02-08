import { Component } from 'react';
import styles from './Loader.module.scss';

interface LoadingProps {
  message?: string;
}

class Loading extends Component<LoadingProps> {
  render() {
    const { message = 'Loading...' } = this.props;

    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingMessage}>{message}</p>
      </div>
    );
  }
}

export default Loading;
