import React from 'react';
import { LayoutProps } from '../../types/Interface';

const Main: React.FC<LayoutProps> = ({ className, children }) => {
  return <main className={`${className}`}>{children}</main>;
};

export default Main;
