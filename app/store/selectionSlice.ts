import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedItem } from '../types/Interface';

interface SelectionState {
  selectedItems: SelectedItem[];
}

const initialState: SelectionState = {
  selectedItems: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelectItem: (state, action: PayloadAction<SelectedItem>) => {
      const itemId = action.payload.name;
      const existingIndex = state.selectedItems.findIndex(
        (item) => item.name === itemId
      );
      if (existingIndex >= 0) {
        state.selectedItems.splice(existingIndex, 1);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleSelectItem, unselectAllItems } = selectionSlice.actions;
export default selectionSlice.reducer;
