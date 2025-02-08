import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const createPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(Number(e.target.value));
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        Previous
      </button>
      {totalPages <= 10 ? (
        createPageNumbers().map((page) => (
          <button
            key={page}
            className={
              page === currentPage
                ? `${styles.pageButton} ${styles.active}`
                : styles.pageButton
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))
      ) : (
        <>
          {createPageNumbers()
            .slice(0, 3)
            .map((page) => (
              <button
                key={page}
                className={
                  page === currentPage
                    ? `${styles.pageButton} ${styles.active}`
                    : styles.pageButton
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
          <select
            value={currentPage}
            onChange={handleSelectChange}
            className={`${styles.pageButton} ${styles.pageSelect}`}
          >
            {createPageNumbers().map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          {createPageNumbers()
            .slice(-3)
            .map((page) => (
              <button
                key={page}
                className={
                  page === currentPage
                    ? `${styles.pageButton} ${styles.active}`
                    : styles.pageButton
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
