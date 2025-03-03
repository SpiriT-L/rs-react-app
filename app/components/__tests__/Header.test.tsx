import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import store from '../../store/store';
import Header from '../Header/Header';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: vi.fn(),
  }),
}));

describe('Header Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('renders the header correctly', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('Rick & Morty')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('toggles the menu when the burger button is clicked', () => {
    renderWithProviders(<Header />);

    const burgerButton = screen.getByRole('button');
    fireEvent.click(burgerButton);

    fireEvent.click(burgerButton);
    expect(screen.getByRole('navigation')).not.toHaveClass('open');
  });

  it('closes the menu when the overlay is clicked', () => {
    renderWithProviders(<Header />);

    const burgerButton = screen.getByRole('button');
    fireEvent.click(burgerButton);

    expect(screen.getByRole('navigation')).not.toHaveClass('open');
  });
});
