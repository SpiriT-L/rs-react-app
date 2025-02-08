import { useCallback, useState } from 'react';
import { getCharacters } from '../api/getCharacters';
import { Character } from '../types/Interface';

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const fetchCharacters = useCallback(
    async (inputValue: string, page: number, itemsPerPage: number) => {
      setIsLoading(true);
      try {
        const { results, totalPages } = await getCharacters(
          inputValue,
          page,
          itemsPerPage
        );
        setTotalPages(totalPages);
        setCharacters(results);
        setError('');
      } catch (err) {
        console.error('Error fetching characters:', err);
        setCharacters([]);
        setTotalPages(0);
        setError('An error occurred during data retrieval.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { characters, isLoading, error, fetchCharacters, totalPages };
};

export default useCharacters;
