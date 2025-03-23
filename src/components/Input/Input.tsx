import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button: React.FC<InputProps> = ({ type, placeholder, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
    />
  );
};

export default Button;
