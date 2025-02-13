import React from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  className?: string;
}

const Main: React.FC<Props> = () => {
  return <Outlet />;
};

export default Main;
