import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Layout } from '../../components/Layout/Layout';

vi.mock('../../components/Footer/Footer', () => ({
  __esModule: true,
  default: () => <div>Mocked Footer</div>,
}));

vi.mock('../../components/Header/Header', () => ({
  __esModule: true,
  default: () => <div>Mocked Header</div>,
}));

describe('Layout Component', () => {
  const setup = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/child" element={<div>Child Component</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders Header component', () => {
    setup();
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    setup();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });

  it('renders Outlet component', () => {
    setup('/child');
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
