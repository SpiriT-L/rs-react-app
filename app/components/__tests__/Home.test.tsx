import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import Home from '../../page';
import store from '../../store/store';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: vi.fn(),
  }),
}));

vi.mock('../../components/Catalog/Catalog', () => ({
  __esModule: true,
  default: () => <div>Mocked Catalog</div>,
}));

vi.mock('../../components/Popup/Popup', () => ({
  __esModule: true,
  default: () => <div>Mocked Popup</div>,
}));

describe('Home Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('renders Catalog component', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Mocked Catalog')).toBeInTheDocument();
  });

  it('renders Popup component', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Mocked Popup')).toBeInTheDocument();
  });
});
