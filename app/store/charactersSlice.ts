import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  location: { name: string };
  origin: { name: string };
  gender: string;
  type: string;
}

interface CharactersState {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: CharactersState = {
  characters: [],
  isLoading: false,
  error: null,
  totalPages: 0,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(
      state,
      action: PayloadAction<{ characters: Character[]; totalPages: number }>
    ) {
      state.characters = action.payload.characters;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
      state.error = null;
    },
    setLoading(state) {
      state.isLoading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setCharacters, setLoading, setError } = charactersSlice.actions;
export default charactersSlice.reducer;
