import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFound from '../../pages/NotFound/NotFound';

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();

    expect(
      screen.getByText('Oops! The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });
});
