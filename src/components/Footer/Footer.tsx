import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.itemList}>
          <Link to="/courses" className={styles.linkList}>
            RSSchool
          </Link>
        </li>
        <li className={styles.itemList}>React 2025 Q1</li>
        <li className={styles.itemList}>
          <Link to="/profile" className={styles.linkList}>
            GitHub
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
