import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Catalog from '../../components/Catalog/Catalog';
import { useAppContext } from '../../context/context';

vi.mock('../../context/context');

describe('Catalog Component', () => {
  const mockDispatch = vi.fn();
  const mockState = {
    characters: [
      {
        id: 1,
        name: 'Character 1',
        image: 'image1',
        species: 'Human',
        status: 'Alive',
        location: { name: 'Earth' },
        origin: { name: 'Earth' },
        gender: 'Male',
        type: '',
      },
      {
        id: 2,
        name: 'Character 2',
        image: 'image2',
        species: 'Alien',
        status: 'Dead',
        location: { name: 'Mars' },
        origin: { name: 'Mars' },
        gender: 'Female',
        type: '',
      },
    ],
    isLoading: false,
    error: '',
    totalPages: 1,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useAppContext as Mock).mockReturnValue({
      state: mockState,
      dispatch: mockDispatch,
    });
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
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING' });
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
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING' });
    });
  });

  it('displays characters when fetchCharacters is successful', async () => {
    setup();
    await waitFor(() => {
      mockState.characters.forEach((character) => {
        expect(screen.getByText(character.name)).toBeInTheDocument();
      });
    });
  });

  it('displays loader while fetching characters', () => {
    mockState.isLoading = true;
    setup();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message if fetchCharacters fails', () => {
    mockState.error = 'Error fetching characters';
    setup();
    expect(screen.getByText('Error fetching characters')).toBeInTheDocument();
  });

  it('handles deliberate error throw', () => {
    setup();
    const errorButton = screen.getByText('Error');
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow('This error was deliberately caused.');
  });
});
