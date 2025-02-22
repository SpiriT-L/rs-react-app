import { createSlice } from '@reduxjs/toolkit';

interface SelectionState {
  selectedItems: string[];
}

const initialState: SelectionState = {
  selectedItems: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelectItem: (state, action) => {
      const itemId = action.payload;
      if (state.selectedItems.includes(itemId)) {
        state.selectedItems = state.selectedItems.filter((id) => id !== itemId);
      } else {
        state.selectedItems.push(itemId);
      }
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleSelectItem, unselectAllItems } = selectionSlice.actions;
export default selectionSlice.reducer;
