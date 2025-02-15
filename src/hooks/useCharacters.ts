import { useEffect } from 'react';
import { getCharacters } from '../api/getCharacters';
import { useAppContext } from '../context/context';

const useCharacters = (
  inputValue: string,
  page: number,
  itemsPerPage: number
) => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const fetchCharacters = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        const { results, totalPages } = await getCharacters(
          inputValue,
          page,
          itemsPerPage
        );
        dispatch({
          type: 'SET_CHARACTERS',
          payload: { characters: results, totalPages },
        });
      } catch {
        dispatch({
          type: 'SET_ERROR',
          payload: 'An error occurred during data retrieval.',
        });
      }
    };

    fetchCharacters();
  }, [inputValue, page, itemsPerPage, dispatch]);
};

export default useCharacters;
