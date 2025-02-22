import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectItem, unselectAllItems } from '../store/selectionSlice';
import { RootState } from '../store/store';
import { usePopup } from './usePopup';

const useSelection = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.selection.selectedItems
  );
  const dispatch = useDispatch();
  const { hidePopup, showPopup } = usePopup();

  const handleToggleSelectItem = (itemId: string) => {
    dispatch(toggleSelectItem(itemId));
    if (selectedItems.length === 1 && selectedItems.includes(itemId)) {
      hidePopup();
    } else {
      showPopup();
    }
  };

  const handleUnselectAllItems = () => {
    dispatch(unselectAllItems());
    hidePopup();
  };

  return {
    selectedItems,
    handleToggleSelectItem,
    handleUnselectAllItems,
  };
};

export default useSelection;
