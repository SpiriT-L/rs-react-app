import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header/Header';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header', () => {
  test('renders the title with a link to the homepage', () => {
    renderWithRouter(<Header />);
    const titleLink = screen.getByText(/Rick & Morty/i);
    expect(titleLink).toBeInTheDocument();
    expect(titleLink.getAttribute('href')).toBe('/');
  });

  test('renders the Home link', () => {
    renderWithRouter(<Header />);
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  test('toggles the burger menu when clicked', () => {
    renderWithRouter(<Header />);
    const burgerButton = screen.getByText(/☰/i);
    fireEvent.click(burgerButton);
    const overlay = screen.getByText(/✖/i);
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);
    expect(screen.queryByText(/✖/i)).not.toBeInTheDocument();
  });

  test('closes the menu when clicking on the Home link', () => {
    renderWithRouter(<Header />);
    const burgerButton = screen.getByText(/☰/i);
    fireEvent.click(burgerButton);
    const homeLink = screen.getByText(/Home/i);
    fireEvent.click(homeLink);
    expect(screen.queryByText(/✖/i)).not.toBeInTheDocument();
  });
});
