import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className || ''}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
