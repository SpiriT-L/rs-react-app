import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../../context/ThemeContext';
import store from '../../store/store';
import { setTheme } from '../../store/themeSlice';
import { ThemeProviderProps } from '../../types/Interface';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>
  );
};

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    query: {},
    push: vi.fn(),
  }),
}));

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('applies the saved theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    renderWithProviders(<div data-testid="child">Child Component</div>);
    expect(document.body.className).toBe('dark');
  });

  it('saves the theme to localStorage on change', () => {
    renderWithProviders(<div data-testid="child">Child Component</div>);

    store.dispatch(setTheme('dark'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('renders children correctly', () => {
    renderWithProviders(<div data-testid="child">Child Component</div>);
    const childComponent = screen.getByTestId('child');
    expect(childComponent).toBeInTheDocument();
  });

  it('matches the ThemeProviderProps interface', () => {
    const props: ThemeProviderProps = { children: <div>Test</div> };

    renderWithProviders(<ThemeProvider {...props} />);

    const childComponent = screen.getByText('Test');
    expect(childComponent).toBeInTheDocument();
  });
});
