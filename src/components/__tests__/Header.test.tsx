import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import store from '../../store/store';
import Header from '../Header/Header';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

describe('Header', () => {
  it('renders the title with a link to the homepage', () => {
    renderWithProviders(<Header />);
    const titleLink = screen.getByText(/Rick & Morty/i);
    expect(titleLink).toBeInTheDocument();
    expect(titleLink.getAttribute('href')).toBe('/');
  });

  test('renders the Home link', () => {
    renderWithProviders(<Header />);
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  test('toggles the burger menu when clicked', () => {
    renderWithProviders(<Header />);
    const burgerButton = screen.getByText(/☰/i);
    fireEvent.click(burgerButton);
    const overlay = screen.getByText(/✖/i);
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);
    expect(screen.queryByText(/✖/i)).not.toBeInTheDocument();
  });

  test('closes the menu when clicking on the Home link', () => {
    renderWithProviders(<Header />);
    const burgerButton = screen.getByText(/☰/i);
    fireEvent.click(burgerButton);
    const homeLink = screen.getByText(/Home/i);
    fireEvent.click(homeLink);
    expect(screen.queryByText(/✖/i)).not.toBeInTheDocument();
  });

  it('renders the ThemeSwitcher component', () => {
    renderWithProviders(<Header />);
    const themeSwitcher = screen.getByTestId('theme-switcher');
    expect(themeSwitcher).toBeInTheDocument();
  });
});
