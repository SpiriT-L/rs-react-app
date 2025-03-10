import React from 'react';
import Link from 'next/link';
import { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.itemList}>
          <Link
            className={styles.linkList}
            target="_blank"
            rel="noopener noreferrer"
            href="https://rs.school/courses/reactjs"
          >
            RSSchool
          </Link>
        </li>
        <li className={styles.itemList}>React 2025 Q1</li>
        <li className={styles.itemList}>
          <Link
            className={styles.linkList}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/SpiriT-L"
          >
            GitHub
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
