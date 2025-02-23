import React, { useEffect } from 'react';
import { usePopup } from '../../hooks/usePopup';
import useSelection from '../../hooks/useSelection';
import { SelectedItem } from '../../types/Interface';
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

  const handleSaveToCsv = () => {
    const csvHeader = 'Name;Image\n';
    const csvContent = selectedItems
      .map((item: SelectedItem) => `${item.name};${item.image}`)
      .join('\n');
    const csvBlob = new Blob([csvHeader + csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedItems.length}_selected_items.csv`;
    document.body.appendChild(link); // Append the link to the body
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link); // Remove the link after clicking
  };

  if (!isVisible) return null;

  return (
    <div className={style.popup} data-testid="popup">
      <p className={style.info}>
        Number of selected items: {selectedItems.length}
      </p>
      <button onClick={handleUnselectAllAndHidePopup}>Unselect all</button>
      <button onClick={handleSaveToCsv}>Load</button>
    </div>
  );
};

export default Popup;
