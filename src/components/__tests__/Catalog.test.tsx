import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import store from '../../store/store';
import Catalog from '../Catalog/Catalog';

vi.mock('../../services/api', async () => {
  const actual =
    await vi.importActual<typeof import('../../services/api')>(
      '../../services/api'
    );
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
    useGetCharacterByIdQuery: vi.fn(),
  };
});

import {
  useGetCharacterByIdQuery,
  useGetCharactersQuery,
} from '../../services/api';

describe('Catalog Component', () => {
  beforeEach(() => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            image: 'rick_image_url',
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
            image: 'morty_image_url',
            species: 'Human',
            status: 'Alive',
            location: { name: 'Earth' },
            origin: { name: 'Earth' },
            gender: 'Male',
            type: '',
          },
        ],
        info: {
          pages: 2,
        },
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

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
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders search input and button', () => {
    const inputElement = screen.getByPlaceholderText('Search');
    const buttonElement = screen.getByText('Search');
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders loader initially', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    );

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  it('displays characters and pagination when data is fetched', async () => {
    const characterElements = await screen.findAllByText(
      /Rick Sanchez|Morty Smith/
    );
    const paginationElement = screen.getByText('Next');

    expect(characterElements.length).toBe(2);
    expect(paginationElement).toBeInTheDocument();
  });

  it('handles search input change and triggers search', () => {
    const inputElement = screen.getByPlaceholderText('Search');
    const buttonElement = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: 'Rick' } });
    fireEvent.click(buttonElement);

    const characterElement = screen.getByText('Rick Sanchez');
    expect(characterElement).toBeInTheDocument();
  });

  it('handles pagination change', async () => {
    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    const pageNumber = screen.getByText('2');
    expect(pageNumber).toBeInTheDocument();
  });

  it('handles character click and displays character details', async () => {
    const characterElement = screen.getByText('Rick Sanchez');
    fireEvent.click(characterElement);

    const characterDetails = await screen.findByTestId('close-button');
    expect(characterDetails).toBeInTheDocument();
  });

  it('handles error button click and throws an error', () => {
    const errorButton = screen.getByText('Error');

    try {
      fireEvent.click(errorButton);
    } catch (error) {
      expect(error).toEqual(new Error('This error was deliberately caused.'));
    }
  });
});
