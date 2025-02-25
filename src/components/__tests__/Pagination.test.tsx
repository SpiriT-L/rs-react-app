import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '../../components/Pagination/Pagination';

describe('Pagination Component', () => {
  const setup = (totalPages: number, currentPage: number) => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );
    return { onPageChange };
  };

  it('renders correct number of page buttons', () => {
    setup(5, 1);
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(7); // 5 page buttons + 2 navigation buttons (Previous, Next)
  });

  // it('disables the current page button', () => {
  //   setup(5, 3);
  //   const currentPageButton = screen.getByText('3');
  //   expect(currentPageButton).toBeDisabled();
  // });

  it('calls onPageChange with correct page number on button click', () => {
    const { onPageChange } = setup(5, 1);
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when navigating to the next page', () => {
    const { onPageChange } = setup(5, 1);
    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when navigating to the previous page', () => {
    const { onPageChange } = setup(5, 2);
    const prevPageButton = screen.getByText('Previous');
    fireEvent.click(prevPageButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('disables the "Previous" button on the first page', () => {
    setup(5, 1);
    const prevPageButton = screen.getByText('Previous');
    expect(prevPageButton).toBeDisabled();
  });

  it('disables the "Next" button on the last page', () => {
    setup(5, 5);
    const nextPageButton = screen.getByText('Next');
    expect(nextPageButton).toBeDisabled();
  });

  it('renders page select when total pages exceed 10', () => {
    setup(15, 1);
    const pageSelect = screen.getByRole('combobox');
    expect(pageSelect).toBeInTheDocument();
    fireEvent.change(pageSelect, { target: { value: '12' } });
    expect(screen.getByRole('option', { name: '12' })).toBeInTheDocument();
  });

  it('calls onPageChange when a page is selected from the dropdown', () => {
    const { onPageChange } = setup(15, 1);
    const pageSelect = screen.getByRole('combobox');
    fireEvent.change(pageSelect, { target: { value: '5' } });
    expect(onPageChange).toHaveBeenCalledWith(5);
  });
});
