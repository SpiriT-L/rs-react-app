import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeProvider } from '../../context/ThemeContext';
import store from '../../store/store';
import { setTheme } from '../../store/themeSlice';
import { ThemeProviderProps } from '../../types/Interface';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('applies the saved theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    renderWithProviders(
      <ThemeProvider>
        <div data-testid="child">Child Component</div>
      </ThemeProvider>
    );
    expect(document.body.className).toBe('dark');
  });

  it('saves the theme to localStorage on change', () => {
    renderWithProviders(
      <ThemeProvider>
        <div data-testid="child">Child Component</div>
      </ThemeProvider>
    );

    store.dispatch(setTheme('dark'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('renders children correctly', () => {
    renderWithProviders(
      <ThemeProvider>
        <div data-testid="child">Child Component</div>
      </ThemeProvider>
    );
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
