import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import selectionReducer from '../../store/selectionSlice';
import { Character } from '../../types/Interface';
import CardList from '../CardList/CardList';

const store = configureStore({
  reducer: {
    selection: selectionReducer,
  },
  preloadedState: {
    selection: {
      selectedItems: [],
    },
  },
});

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'rick.png',
    species: 'Human',
    status: 'Alive',
    location: { name: 'Earth' },
    origin: { name: 'Earth' },
    gender: 'Male',
    type: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    image: 'morty.png',
    species: 'Human',
    status: 'Alive',
    location: { name: 'Earth' },
    origin: { name: 'Earth' },
    gender: 'Male',
    type: '',
    episode: [],
    url: '',
    created: '',
  },
];

describe('CardList component', () => {
  it('renders the specified number of cards', () => {
    render(
      <Provider store={store}>
        <CardList characters={mockCharacters} onCharacterClick={() => {}} />
      </Provider>
    );
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(mockCharacters.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    render(
      <Provider store={store}>
        <CardList characters={[]} onCharacterClick={() => {}} />
      </Provider>
    );
    const message = screen.getByText(/no characters available/i);
    expect(message).toBeInTheDocument();
  });

  it('calls onCharacterClick when a card is clicked', () => {
    const handleCharacterClick = vi.fn();
    render(
      <Provider store={store}>
        <CardList
          characters={mockCharacters}
          onCharacterClick={handleCharacterClick}
        />
      </Provider>
    );
    const card = screen.getByText(/Rick Sanchez/i);
    fireEvent.click(card);
    expect(handleCharacterClick).toHaveBeenCalledWith('1');
  });

  it('renders the correct character names and images', () => {
    render(
      <Provider store={store}>
        <CardList characters={mockCharacters} onCharacterClick={() => {}} />
      </Provider>
    );
    mockCharacters.forEach((character) => {
      const nameElement = screen.getByText(character.name);
      const imageElement = screen.getByAltText(character.name);
      expect(nameElement).toBeInTheDocument();
      expect(imageElement).toBeInTheDocument();
    });
  });
});
