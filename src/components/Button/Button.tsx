import { Component, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children } = this.props;

    return (
      <button onClick={onClick} className={styles.button}>
        {children}
      </button>
    );
  }
}

export default Button;
