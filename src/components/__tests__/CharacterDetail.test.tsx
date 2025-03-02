import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import store from '../../store/store';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

// Мокируем useGetCharacterByIdQuery из services/api
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
    (useGetCharacterByIdQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        id: 1,
        name: 'Rick Sanchez',
        image: 'rick_image_url',
        species: 'Human',
        status: 'Alive',
        location: { name: 'Earth', url: '' },
        origin: { name: 'Earth', url: '' },
        gender: 'Male',
        type: '',
        episode: [],
        url: '',
        created: '',
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it('fetches and displays detailed information on component render', async () => {
    render(
      <Provider store={store}>
        <CharacterDetails characterId={characterId} onClose={mockOnClose} />
      </Provider>
    );

    const characterName = await screen.findByText('Rick Sanchez');
    const characterImage = await screen.findByAltText('Rick Sanchez');
    const closeButton = await screen.findByTestId('close-button');

    expect(characterName).toBeInTheDocument();
    expect(characterImage).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it('hides the component when the close button is clicked', async () => {
    render(
      <Provider store={store}>
        <CharacterDetails characterId={characterId} onClose={mockOnClose} />
      </Provider>
    );

    const closeButton = await screen.findByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
