import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import selectedItemsReducer from '../../store/selectedItemsSlice';
import Card from '../Card/Card';

// Создаем функцию для создания mock store
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
    preloadedState: {
      selectedItems: {
        selectedItems: [],
      },
      ...preloadedState,
    },
  });
};

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
    const store = createMockStore();
    render(
      <Provider store={store}>
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
      </Provider>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'https://example.com/rick.png'
    );

    expect(
      screen.queryByText(
        (_, element) => element?.textContent === 'Status: Alive'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (_, element) => element?.textContent === 'Species: Human'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (_, element) => element?.textContent === 'Gender: Male'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (_, element) => element?.textContent === 'Location: Earth'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        (_, element) => element?.textContent === 'Origin: Earth'
      )
    ).toBeInTheDocument();
  });

  it('clicking on card triggers onClick handler', () => {
    const store = createMockStore();
    const handleClick = vi.fn();
    render(
      <Provider store={store}>
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
      </Provider>
    );

    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders checkbox and handles checkbox change', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
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
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(store.getState().selectedItems.selectedItems).toContain(
      character.name
    );
  });

  it('keeps checkbox checked if character is selected', () => {
    // Создаем новый mock store с заранее установленным состоянием
    const store = createMockStore({
      selectedItems: {
        selectedItems: [character.name],
      },
    });

    render(
      <Provider store={store}>
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
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });
});
