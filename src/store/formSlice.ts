// filepath: src/store/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  hookForm: Record<string, unknown> | null;
  uncontrolledForm: Record<string, unknown> | null;
  countries: { label: string; value: string }[];
}

const initialState: FormState = {
  hookForm: null,
  uncontrolledForm: null,
  countries: [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'UK' },
    // Добавьте остальные страны здесь
  ],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveHookForm(state, action: PayloadAction<Record<string, unknown>>) {
      state.hookForm = action.payload;
    },
    saveUncontrolledForm(
      state,
      action: PayloadAction<Record<string, unknown>>
    ) {
      state.uncontrolledForm = action.payload;
    },
  },
});

export const { saveHookForm, saveUncontrolledForm } = formSlice.actions;
export default formSlice.reducer;
