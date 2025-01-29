import { Component } from 'react';
import styles from './Footer.module.scss';

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className={styles.footer}>
        <ul className={styles.list}>
          <li className={styles.itemList}>
            <a
              className={styles.linkList}
              href="https://rs.school/courses/reactjs"
            >
              RSSchool
            </a>
          </li>
          <li className={styles.itemList}>React 2025 Q1</li>
          <li className={styles.itemList}>
            <a className={styles.linkList} href="https://github.com/SpiriT-L">
              GitHub
            </a>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
