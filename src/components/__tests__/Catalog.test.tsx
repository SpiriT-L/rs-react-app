import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { useGetCharactersQuery } from '../../services/api';
import store from '../../store/store';
import Catalog from '../Catalog/Catalog';

vi.mock('../../services/api', async () => {
  const original =
    await vi.importActual<typeof import('../../services/api')>(
      '../../services/api'
    );
  return {
    ...original,
    useGetCharactersQuery: vi.fn(),
  };
});

vi.mock('../../hooks/usePopup', () => ({
  usePopup: () => ({
    showPopup: vi.fn(),
  }),
}));

vi.mock('../../hooks/useSelection', () => ({
  default: () => ({
    selectedItems: [],
  }),
}));

describe('Catalog Component', () => {
  const renderCatalog = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders search input and button', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    renderCatalog();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('renders character cards', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { id: '1', name: 'Rick Sanchez' },
          { id: '2', name: 'Morty Smith' },
        ],
        info: { pages: 2 },
      },
      error: null,
      isLoading: false,
    });

    renderCatalog();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('renders loader when loading', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true,
    });

    renderCatalog();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      error: { status: 500, message: 'Error loading data' },
      isLoading: false,
    });

    renderCatalog();
    expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
  });

  it('navigates to character details on card click', async () => {
    renderCatalog();
    fireEvent.click(screen.getByText('Rick Sanchez'));
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('handles page change', () => {
    renderCatalog();
    fireEvent.click(screen.getByText('Next'));
    waitFor(() => {
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('displays search results when input value changes and search is triggered', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValueOnce({
      data: {
        results: [{ id: '1', name: 'Rick Sanchez' }],
        info: { pages: 1 },
      },
      error: null,
      isLoading: false,
    });

    renderCatalog();
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });
  });

  it('clears search results and returns to first page when input is cleared', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValueOnce({
      data: {
        results: [{ id: '1', name: 'Rick Sanchez' }],
        info: { pages: 1 },
      },
      error: null,
      isLoading: false,
    });

    renderCatalog();
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText((content, element) => {
          return (
            element !== null &&
            element.tagName.toLowerCase() === 'h2' &&
            content.includes('Rick Sanchez')
          );
        })
      ).toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });
});
