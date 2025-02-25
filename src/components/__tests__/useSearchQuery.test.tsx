import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useSearchQuery from '../../hooks/useSearchQuery';
import Button from '../Button/Button';
import Input from '../Input/Input';

const setItemMock = vi.spyOn(Storage.prototype, 'setItem');
const getItemMock = vi.spyOn(Storage.prototype, 'getItem');

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useSearchQuery('searchQuery');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleButtonClick = () => {
    localStorage.setItem('searchQuery', inputValue);
  };

  return (
    <div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onEnter={() => {}}
        showError={() => {}}
      />
      <Button onClick={handleButtonClick}>Search</Button>
    </div>
  );
};

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
    setItemMock.mockClear();
    getItemMock.mockClear();
  });

  it('saves the entered value to the local storage when clicking the Search button', () => {
    render(
      <Router>
        <Search />
      </Router>
    );

    const input = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('searchQuery', 'Rick');
  });
});
