import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import styles from './input.module.scss';

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onEnter: (valid: boolean) => void;
  showError: (message: string) => void;
}

const Input: FC<InputProps> = ({
  label,
  value: initialValue,
  onChange,
  onEnter,
  showError,
}) => {
  const [value, setValue] = useState(initialValue.trim());

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trimEnd();
    setValue(newValue);
    onChange(newValue);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      validateInput();
    }
  };

  const validateInput = () => {
    if (value.trim().length === 0) {
      onEnter(true);
    } else if (value.length < 3) {
      showError('The query must contain a minimum of three characters.');
      onEnter(false);
    } else {
      onEnter(true);
    }
  };

  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type="text"
        value={value}
        placeholder="Search"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
