import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
