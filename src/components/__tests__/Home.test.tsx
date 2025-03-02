import { render, screen } from '@testing-library/react';
import React from 'react'; // Добавлен импорт React
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest'; // Импортируйте vi из vitest
import Home from '../../pages/index';
import store from '../../store/store';

// Мокируем next/router
vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: vi.fn(),
  }),
}));

// Мокируем компоненты Catalog и Popup
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
