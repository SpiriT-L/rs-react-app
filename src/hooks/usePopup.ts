import { useContext } from 'react';
import { PopupContext } from '../context/PopupContext';
import { PopupContextProps } from '../types/Interface';

export const usePopup: () => PopupContextProps = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
