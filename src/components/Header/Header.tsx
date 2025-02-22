import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import styles from './Header.module.scss';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isDarkMode = document.body.classList.contains('dark');

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/" className={styles.title} onClick={closeMenu}>
          Rick & Morty
        </Link>
      </h1>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <Link to="/" className={styles.link} onClick={closeMenu}>
          Home
        </Link>
        <ThemeSwitcher />
      </nav>
      <button
        className={`${styles.burger} ${isDarkMode ? styles.darkMode : ''}`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? '✖' : '☰'}
      </button>
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
