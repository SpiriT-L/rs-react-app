import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import charactersReducer from './charactersSlice';
import selectedItemsReducer from './selectedItemsSlice';
import selectionReducer from './selectionSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    selectedItems: selectedItemsReducer,
    selection: selectionReducer,
    theme: themeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
