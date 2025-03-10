import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Layout } from '../Layout/Layout';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: vi.fn(),
  }),
}));

describe('Layout Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(ui);
  };

  it('renders children correctly', () => {
    renderWithProviders(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
