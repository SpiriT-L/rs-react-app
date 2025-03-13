import React from 'react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={styles.SectionHome}>
      <div className={styles.home}>
        <h1>Home Page</h1>
        <p>Welcome to the home page!</p>
      </div>
    </section>
  );
};

export default Home;
