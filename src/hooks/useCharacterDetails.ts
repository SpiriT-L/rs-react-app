import { useEffect, useState } from 'react';
import { Character } from '../types/Interface';

const useCharacterDetails = (characterId: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        if (!response.ok) {
          throw new Error('Error fetching character details');
        }
        const data = await response.json();
        setTimeout(() => {
          setCharacter(data);
          setIsLoading(false);
        }, 1000);
        setError('');
      } catch (err) {
        console.error('Error fetching character details:', err);
        setError('An error occurred during data retrieval.');
        setIsLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

  return { character, isLoading, error };
};

export default useCharacterDetails;
