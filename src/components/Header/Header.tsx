import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/uncontrolled-form">Form1</Link>
          </li>
          <li>
            <Link to="/hook-form">Form2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
