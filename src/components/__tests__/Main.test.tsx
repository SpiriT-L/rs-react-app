import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Main from '../../components/Main/Main';

describe('Main Component', () => {
  const setup = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/child" element={<div>Child Component</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders Outlet component', () => {
    setup('/child');
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders with correct className', () => {
    const className = 'custom-class';
    const { container } = render(
      <MemoryRouter>
        <Main className={className} />
      </MemoryRouter>
    );
    expect(container.firstChild).toHaveClass(className);
  });
});
