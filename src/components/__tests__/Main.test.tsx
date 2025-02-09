import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useCharacters from '../../hooks/useCharacters';
import useSearchQuery from '../../hooks/useSearchQuery';
import Main from '../Main/Main';

vi.mock('../../hooks/useCharacters');
vi.mock('../../hooks/useSearchQuery');

describe('Main Component', () => {
  beforeEach(() => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [],
      isLoading: false,
      error: '',
      fetchCharacters: vi.fn(),
      totalPages: 0,
    });

    (useSearchQuery as jest.Mock).mockReturnValue(['', vi.fn()]);
  });

  it('displays character list and pagination when data is fetched', async () => {
    const fetchCharacters = vi.fn(() => Promise.resolve());
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [
        {
          id: 1,
          name: 'Rick Sanchez',
          image: 'https://example.com/rick.png',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          location: { name: 'Earth' },
          origin: { name: 'Earth' },
        },
      ],
      isLoading: false,
      error: '',
      fetchCharacters,
      totalPages: 1,
    });

    (useSearchQuery as jest.Mock).mockReturnValue(['Rick', vi.fn()]);

    render(
      <Router>
        <Main />
      </Router>
    );

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalled());

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
