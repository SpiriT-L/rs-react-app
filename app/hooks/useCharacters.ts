import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../api/getCharacters';
import { setCharacters, setError, setLoading } from '../store/charactersSlice';
import { RootState } from '../store/store';

const useCharacters = (
  inputValue: string,
  page: number,
  itemsPerPage: number
) => {
  const dispatch = useDispatch();
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  const isLoading = useSelector(
    (state: RootState) => state.characters.isLoading
  );
  const error = useSelector((state: RootState) => state.characters.error);
  const totalPages = useSelector(
    (state: RootState) => state.characters.totalPages
  );

  useEffect(() => {
    const fetchCharacters = async () => {
      dispatch(setLoading());
      try {
        const { results, totalPages } = await getCharacters(
          inputValue,
          page,
          itemsPerPage
        );
        dispatch(setCharacters({ characters: results, totalPages }));
      } catch {
        dispatch(setError('An error occurred during data retrieval.'));
      }
    };

    fetchCharacters();
  }, [inputValue, page, itemsPerPage, dispatch]);

  return { characters, isLoading, error, totalPages };
};

export default useCharacters;
