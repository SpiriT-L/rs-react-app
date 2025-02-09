import '@testing-library/jest-dom'; // Изменено
import { render, screen } from '@testing-library/react';
import Header from '../Header/Header';

test('renders Header component', () => {
  render(<Header />);
  expect(screen.getByText('Rick & Morty')).toBeInTheDocument();
});
