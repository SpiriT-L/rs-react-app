import React, { useEffect } from 'react';
import { usePopup } from '../../hooks/usePopup';
import useSelection from '../../hooks/useSelection';
import style from './Popup.module.scss';

const Popup: React.FC = () => {
  const { isVisible, hidePopup } = usePopup();
  const { selectedItems, handleUnselectAllItems } = useSelection();

  useEffect(() => {
    if (selectedItems.length === 0) {
      hidePopup();
    }
  }, [selectedItems, hidePopup]);

  const handleUnselectAllAndHidePopup = () => {
    handleUnselectAllItems();
    hidePopup();
  };

  if (!isVisible) return null;

  return (
    <div className={style.popup}>
      <p>Number of selected items: {selectedItems.length}</p>
      <button onClick={handleUnselectAllAndHidePopup}>Unselect all</button>
      <button onClick={hidePopup}>Load</button>
    </div>
  );
};

export default Popup;
