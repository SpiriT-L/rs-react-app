import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './Layout.module.scss';
import { LayoutProps } from '../../types/Interface';

export const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
