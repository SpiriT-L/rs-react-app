'use client';

import React, { createContext, ReactNode, useState } from 'react';
import { PopupContextProps } from '../types/Interface';

export const PopupContext = createContext<PopupContextProps | undefined>(
  undefined
);

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const showPopup = () => setIsVisible(true);
  const hidePopup = () => setIsVisible(false);

  return (
    <PopupContext.Provider value={{ isVisible, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
};
