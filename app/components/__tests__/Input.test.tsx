import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Input from '../Input/Input';

describe('Input Component', () => {
  const setup = (initialValue = '', label = 'Test Label') => {
    const onChange = vi.fn();
    const onEnter = vi.fn();
    const showError = vi.fn();
    const utils = render(
      <Input
        label={label}
        value={initialValue}
        onChange={onChange}
        onEnter={onEnter}
        showError={showError}
      />
    );
    const input = utils.getByPlaceholderText('Search');
    return { input, onChange, onEnter, showError, ...utils };
  };

  it('renders the input with label', () => {
    const { getByText } = setup();
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('calls onChange function when input value changes', () => {
    const { input, onChange } = setup();
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledWith('Hello');
  });

  it('calls onEnter with true if input is empty on enter key press', () => {
    const { input, onEnter } = setup();
    fireEvent.change(input, { target: { value: ' ' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onEnter).toHaveBeenCalledWith(true);
  });

  it('shows error if input length is less than 3 characters and enter key is pressed', () => {
    const { input, showError, onEnter } = setup();
    fireEvent.change(input, { target: { value: 'Hi' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(showError).toHaveBeenCalledWith(
      'The query must contain a minimum of three characters.'
    );
    expect(onEnter).toHaveBeenCalledWith(false);
  });

  it('calls onEnter with true if input length is valid on enter key press', () => {
    const { input, onEnter } = setup();
    fireEvent.change(input, { target: { value: 'Valid input' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onEnter).toHaveBeenCalledWith(true);
  });
});
