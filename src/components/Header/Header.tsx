import { FC } from 'react';
import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Rick & Morty</h1>
    </header>
  );
};

export default Header;
