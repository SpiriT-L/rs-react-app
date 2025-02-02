import { Component } from 'react';
import styles from './ErrorButton.module.scss';

interface ErrorButtonProps {
  onClick: () => void;
}

class ErrorButton extends Component<ErrorButtonProps> {
  render() {
    const { onClick } = this.props;
    return (
      <button onClick={onClick} className={styles.errorButton}>
        Error
      </button>
    );
  }
}

export default ErrorButton;
