import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div>
        <Image
          src="/portal.png"
          alt="portal"
          width={500}
          height={300}
          className={styles.portal}
        />
      </div>
      <h2 className={styles.title}>404 - Page Not Found</h2>
      <p className={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
