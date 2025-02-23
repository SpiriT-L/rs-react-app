import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.portal}></div>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
