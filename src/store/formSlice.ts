// filepath: src/store/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean;
  picture?: string;
  country: string;
}

interface FormState {
  uncontrolledForm: FormData | null;
  hookForm: FormData | null;
}

const initialState: FormState = {
  uncontrolledForm: null,
  hookForm: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveUncontrolledForm(state, action: PayloadAction<FormData>) {
      state.uncontrolledForm = action.payload;
    },
    saveHookForm(state, action: PayloadAction<FormData>) {
      state.hookForm = action.payload;
    },
  },
});

export const { saveUncontrolledForm, saveHookForm } = formSlice.actions;
export default formSlice.reducer;
