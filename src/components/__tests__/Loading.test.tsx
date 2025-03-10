import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loading from '../Loader/Loader';

describe('Loading Component', () => {
  it('renders Loading component with default message', () => {
    render(<Loading />);

    const loaderElement = screen.getByTestId('loader');
    const messageElement = screen.getByText('Loading...');

    expect(loaderElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  it('renders Loading component with custom message', () => {
    const customMessage = 'Please wait...';
    render(<Loading message={customMessage} />);

    const loaderElement = screen.getByTestId('loader');
    const messageElement = screen.getByText(customMessage);

    expect(loaderElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });
});
