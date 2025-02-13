import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../../pages/Home/Home';

describe('Home Component', () => {
  it('renders Catalog components', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
