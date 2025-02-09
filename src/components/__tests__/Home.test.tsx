import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../../pages/Home/Home';

describe('Home Component', () => {
  it('renders Header, Main, and Footer components', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
