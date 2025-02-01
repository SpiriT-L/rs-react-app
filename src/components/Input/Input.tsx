import React, { Component } from 'react';
import styles from './input.module.scss';

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

interface InputState {
  value: string;
}

class Input extends Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ value });
    this.props.onChange(value);
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onEnter();
    }
  };

  render() {
    const { label } = this.props;
    const { value } = this.state;

    return (
      <div className={styles.inputContainer}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          type="text"
          value={value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          className={styles.input}
        />
      </div>
    );
  }
}

export default Input;
