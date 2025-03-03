'use client';

import Link from 'next/link';
import React, { FC, useState } from 'react';
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

  const isDarkMode =
    typeof document !== 'undefined' && document.body.classList.contains('dark');

  return (
    <header className={styles.header}>
      <h1>
        <Link href="/" passHref className={styles.title}>
          Rick & Morty
        </Link>
      </h1>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <Link href="/" passHref className={styles.link}>
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
