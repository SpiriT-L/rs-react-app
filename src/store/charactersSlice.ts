import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types/Interface';

interface CharactersState {
  characters: Character[];
  isLoading: boolean;
  error: string;
  totalPages: number;
}

const initialState: CharactersState = {
  characters: [],
  isLoading: false,
  error: '',
  totalPages: 0,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (
      state,
      action: PayloadAction<{ characters: Character[]; totalPages: number }>
    ) => {
      state.characters = action.payload.characters;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
      state.error = '';
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCharacters, setLoading, setError } = charactersSlice.actions;

export default charactersSlice.reducer;
