import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Card from '../Card/Card';

const character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://example.com/rick.png',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  location: { name: 'Earth' },
  origin: { name: 'Earth' },
};

describe('Card Component', () => {
  it('renders relevant card data', () => {
    render(
      <Card
        name={character.name}
        image={character.image}
        status={character.status}
        species={character.species}
        type={character.type}
        gender={character.gender}
        locationName={character.location.name}
        originName={character.origin.name}
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'https://example.com/rick.png'
    );

    expect(
      screen.queryByText(
        (content, element) => element?.textContent === 'Status: Alive'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (content, element) => element?.textContent === 'Species: Human'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (content, element) => element?.textContent === 'Gender: Male'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (content, element) => element?.textContent === 'Location: Earth'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (content, element) => element?.textContent === 'Origin: Earth'
      )
    ).toBeInTheDocument();
  });

  it('clicking on card triggers onClick handler', () => {
    const handleClick = vi.fn();
    render(
      <Card
        name={character.name}
        image={character.image}
        status={character.status}
        species={character.species}
        type={character.type}
        gender={character.gender}
        locationName={character.location.name}
        originName={character.origin.name}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
