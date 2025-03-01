// src/pages/404.tsx
import Link from 'next/link';
import React from 'react';
import styles from './404.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.portal}></div>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
    </div>
  );
};

export default NotFound;
