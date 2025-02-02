import { Component } from 'react';
import styles from './Header.module.scss';

class Header extends Component {
  state = {};
  render() {
    return <header className={styles.header}></header>;
  }
}

export default Header;
