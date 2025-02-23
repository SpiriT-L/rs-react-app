import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './Main.module.scss';
import { LayoutProps } from '../../types/Interface';

const Main: React.FC<LayoutProps> = ({ className }) => {
  return (
    <div className={`${style.main} ${className}`}>
      <Outlet />
    </div>
  );
};

export default Main;
