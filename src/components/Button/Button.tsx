import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '../../types/Interface';

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
