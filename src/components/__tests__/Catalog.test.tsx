import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Catalog from '../../components/Catalog/Catalog';
import useCharacters from '../../hooks/useCharacters';

vi.mock('../../hooks/useCharacters');

describe('Catalog Component', () => {
  const mockUseCharacters = useCharacters as jest.Mock;

  const mockData = {
    characters: [
      { id: '1', name: 'Character 1' },
      { id: '2', name: 'Character 2' },
    ],
    isLoading: false,
    error: null as string | null,
    fetchCharacters: vi.fn().mockResolvedValue(undefined),
    totalPages: 1,
  };

  beforeEach(() => {
    mockUseCharacters.mockReturnValue(mockData);
  });

  const setup = () => {
    return render(
      <Router>
        <Catalog />
      </Router>
    );
  };

  it('renders input and search button', () => {
    setup();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls fetchCharacters on mount', async () => {
    setup();
    await waitFor(() => {
      expect(mockData.fetchCharacters).toHaveBeenCalled();
    });
  });

  it('updates input value and calls onChange', async () => {
    setup();
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(input).toHaveValue('New value');
  });

  it('calls fetchCharacters on Enter key press', async () => {
    setup();
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Valid input' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    await waitFor(() => {
      expect(mockData.fetchCharacters).toHaveBeenCalled();
    });
  });

  it('displays characters when fetchCharacters is successful', async () => {
    setup();
    await waitFor(() => {
      mockData.characters.forEach((character) => {
        expect(screen.getByText(character.name)).toBeInTheDocument();
      });
    });
  });

  it('displays loader while fetching characters', () => {
    mockData.isLoading = true;
    setup();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message if fetchCharacters fails', () => {
    mockData.error = 'Error fetching characters';
    setup();
    expect(screen.getByText('Error fetching characters')).toBeInTheDocument();
  });

  it('navigates to character details on character click', async () => {
    setup();
    const characterElement = screen.getByText((_, element) => {
      return element?.textContent === 'Character';
    });
    fireEvent.click(characterElement);
    await waitFor(() => {
      expect(screen.getByText('Character')).toBeInTheDocument();
    });
  });

  it('handles deliberate error throw', () => {
    setup();
    const errorButton = screen.getByText('Error');
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow('This error was deliberately caused.');
  });
});
