import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './Main.module.scss';

interface Props {
  className?: string;
}

const Main: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${style.main} ${className}`}>
      <Outlet />
    </div>
  );
};

export default Main;
