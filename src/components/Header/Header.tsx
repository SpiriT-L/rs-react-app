import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title} onClick={closeMenu}>
        Rick & Morty
      </Link>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <Link to="/" className={styles.link} onClick={closeMenu}>
          Home
        </Link>
      </nav>
      <button className={styles.burger} onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </button>
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
