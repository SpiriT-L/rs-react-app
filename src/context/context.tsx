import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { Character } from '../types/Interface';

interface State {
  characters: Character[];
  isLoading: boolean;
  error: string;
  totalPages: number;
}

type Action =
  | {
      type: 'SET_CHARACTERS';
      payload: { characters: Character[]; totalPages: number };
    }
  | { type: 'SET_LOADING' }
  | { type: 'SET_ERROR'; payload: string };

const initialState: State = {
  characters: [],
  isLoading: true,
  error: '',
  totalPages: 0,
};

const AppContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: action.payload.characters,
        totalPages: action.payload.totalPages,
        isLoading: false,
        error: '',
      };
    case 'SET_LOADING':
      return { ...state, isLoading: true };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
