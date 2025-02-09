import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useCharacterDetails from '../../hooks/useCharacterDetails';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

const mockCharacterDetails = {
  character: {
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
  isLoading: false,
  error: null,
};

// Mocking the hook manually
vi.mock('../../hooks/useCharacterDetails');

const mockedUseCharacterDetails = useCharacterDetails as jest.Mock;

describe('CharacterDetails Component', () => {
  beforeEach(() => {
    mockedUseCharacterDetails.mockReturnValue(mockCharacterDetails);
  });

  it('fetches detailed information on component render', async () => {
    render(<CharacterDetails characterId="1" onClose={() => {}} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(mockedUseCharacterDetails).toHaveBeenCalledWith('1');
  });

  it('displays loading indicator while fetching data', () => {
    mockedUseCharacterDetails.mockReturnValue({
      ...mockCharacterDetails,
      isLoading: true,
    });

    render(<CharacterDetails characterId="1" onClose={() => {}} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('hides the component when the close button is clicked', () => {
    const handleClose = vi.fn();

    render(<CharacterDetails characterId="1" onClose={handleClose} />);

    fireEvent.click(screen.getByText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
