import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../../pages/Home/Home';
import store from '../../store/store';

describe('Home Component', () => {
  it('renders Catalog components', () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
