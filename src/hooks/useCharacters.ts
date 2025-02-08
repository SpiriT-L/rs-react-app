import { useCallback, useState } from 'react';
import { getCharacters } from '../api/rickAndMortyApi';
import { Character } from '../types/Interface';

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCharacters = useCallback(async (inputValue: string) => {
    setIsLoading(true);
    try {
      const characters = await getCharacters();
      if (inputValue.trim().length === 0) {
        setCharacters(characters);
        setError('');
      } else if (inputValue.length < 3) {
        setCharacters([]);
        setError('Enter at least 3 characters to filter');
      } else {
        const filteredCharacters = characters.filter((character) =>
          character.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (filteredCharacters.length === 0) {
          setCharacters([]);
          setError('No results found. Try changing the query.');
        } else {
          setCharacters(filteredCharacters);
          setError('');
        }
      }
    } catch (err) {
      console.error('Error fetching characters:', err);
      setCharacters([]);
      setError('An error occurred during data retrieval.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { characters, isLoading, error, fetchCharacters };
};

export default useCharacters;
