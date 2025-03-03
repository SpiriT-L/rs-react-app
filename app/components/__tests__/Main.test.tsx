import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Main from '../Main/Main';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: vi.fn(),
  }),
}));

describe('Main Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(ui);
  };

  it('renders children correctly', () => {
    renderWithProviders(
      <Main className="custom-class">
        <div>Child Component</div>
      </Main>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders with correct className', () => {
    const className = 'custom-class';
    const { container } = renderWithProviders(
      <Main className={className}>
        <div>Content</div>
      </Main>
    );
    expect(container.firstChild).toHaveClass(className);
  });
});
