import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotFound from '../../pages/404';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: vi.fn(),
  }),
}));

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('Oops! The page you are looking for does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByText('Go back to Home')).toBeInTheDocument();
  });
});
