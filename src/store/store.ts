import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import charactersReducer from './charactersSlice';
import selectedItemsReducer from './selectedItemsSlice';
import selectionReducer from './selectionSlice';
import themeReducer from './themeSlice';

export const initializeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      characters: charactersReducer,
      selectedItems: selectedItemsReducer,
      selection: selectionReducer,
      theme: themeReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });
};

const store = initializeStore();

interface PreloadedState {
  characters?: ReturnType<typeof charactersReducer>;
  selectedItems?: ReturnType<typeof selectedItemsReducer>;
  selection?: ReturnType<typeof selectionReducer>;
  theme?: ReturnType<typeof themeReducer>;
  [api.reducerPath]?: ReturnType<typeof api.reducer>;
}

interface UseStore {
  (initialState: PreloadedState): ReturnType<typeof initializeStore>;
}

export const useStore: UseStore = (initialState) => {
  const store = initializeStore(initialState);
  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
