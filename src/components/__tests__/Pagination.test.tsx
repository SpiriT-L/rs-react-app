import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Pagination, { PaginationProps } from '../Pagination/Pagination';

const PaginationWithRouter: React.FC<PaginationProps> = (props) => (
  <Router>
    <Pagination {...props} />
  </Router>
);

describe('Pagination Component', () => {
  it('updates URL query parameter when page changes', () => {
    const handlePageChange = vi.fn((page: number) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('page', page.toString());
      window.history.pushState({}, '', `?${searchParams.toString()}`);
    });

    render(
      <PaginationWithRouter
        totalPages={10}
        currentPage={1}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('Next'));

    expect(handlePageChange).toHaveBeenCalledWith(2);

    expect(window.location.search).toContain('page=2');
  });

  it('disables the "Previous" button on the first page', () => {
    render(
      <PaginationWithRouter
        totalPages={10}
        currentPage={1}
        onPageChange={vi.fn()}
      />
    );

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('disables the "Next" button on the last page', () => {
    render(
      <PaginationWithRouter
        totalPages={10}
        currentPage={10}
        onPageChange={vi.fn()}
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });
});
