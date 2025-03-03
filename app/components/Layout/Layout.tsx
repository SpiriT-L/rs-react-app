import React from 'react';
import { LayoutProps } from '../../types/Interface';
import Main from '../Main/Main';
import style from './Layout.module.scss';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Main className={style.main}>{children}</Main>
    </>
  );
};
