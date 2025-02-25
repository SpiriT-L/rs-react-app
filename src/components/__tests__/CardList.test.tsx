import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Character } from '../../types/Interface';
import CardList from '../CardList/CardList';

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
  },
];

describe('CardList component', () => {
  it('renders the specified number of cards', () => {
    render(
      <CardList characters={mockCharacters} onCharacterClick={() => {}} />
    );
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(mockCharacters.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    render(<CardList characters={[]} onCharacterClick={() => {}} />);
    const message = screen.getByText(/no characters available/i);
    expect(message).toBeInTheDocument();
  });

  it('calls onCharacterClick when a card is clicked', () => {
    const handleCharacterClick = vi.fn();
    render(
      <CardList
        characters={mockCharacters}
        onCharacterClick={handleCharacterClick}
      />
    );
    const card = screen.getByText(/Rick Sanchez/i);
    fireEvent.click(card);
    expect(handleCharacterClick).toHaveBeenCalledWith('1');
  });

  it('renders the correct character names and images', () => {
    render(
      <CardList characters={mockCharacters} onCharacterClick={() => {}} />
    );
    mockCharacters.forEach((character) => {
      const nameElement = screen.getByText(character.name);
      const imageElement = screen.getByAltText(character.name);
      expect(nameElement).toBeInTheDocument();
      expect(imageElement).toBeInTheDocument();
    });
  });
});
