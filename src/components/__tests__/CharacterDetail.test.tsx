import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import store from '../../store/store';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

vi.mock('../../services/api', async () => {
  const actual =
    await vi.importActual<typeof import('../../services/api')>(
      '../../services/api'
    );
  return {
    ...actual,
    useGetCharacterByIdQuery: vi.fn(),
  };
});

import { useGetCharacterByIdQuery } from '../../services/api';

describe('CharacterDetails Component', () => {
  const characterId = '1';
  const mockOnClose = vi.fn();

  beforeEach(() => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: {
        id: 1,
        name: 'Rick Sanchez',
        image: 'rick_image_url',
        species: 'Human',
        status: 'Alive',
        location: { name: 'Earth' },
        origin: { name: 'Earth' },
        gender: 'Male',
        type: '',
        episode: [],
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterDetails characterId={characterId} onClose={mockOnClose} />
        </BrowserRouter>
      </Provider>
    );
  });

  it('fetches detailed information on component render', () => {
    const characterName = screen.getByText('Rick Sanchez');
    expect(characterName).toBeInTheDocument();
  });

  it('displays loading indicator while fetching data', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterDetails characterId={characterId} onClose={mockOnClose} />
        </BrowserRouter>
      </Provider>
    );

    const loaderElements = screen.getAllByTestId('loader');
    expect(loaderElements.length).toBe(1);
    expect(loaderElements[0]).toBeInTheDocument();
  });

  it('displays error message when error occurs', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: { status: 500, data: 'An error occurred during data retrieval.' },
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterDetails characterId={characterId} onClose={mockOnClose} />
        </BrowserRouter>
      </Provider>
    );

    const errorElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.tagName.toLowerCase() === 'p' &&
        content.includes('An error occurred during data retrieval.')
      );
    });
    expect(errorElement).toBeInTheDocument();
  });

  it('hides the component when the close button is clicked', () => {
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
