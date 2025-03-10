import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer/Footer';

describe('Footer', () => {
  test('renders RSSchool link', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/RSSchool/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });

  test('renders React 2025 Q1 text', () => {
    render(<Footer />);
    const textElement = screen.getByText(/React 2025 Q1/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders GitHub link', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/GitHub/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://github.com/SpiriT-L');
  });
});
