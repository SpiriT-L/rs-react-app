import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from '../../pages/NotFound/NotFound';

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();

    expect(
      screen.getByText('Oops! The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });
});
