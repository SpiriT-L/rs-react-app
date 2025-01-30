// ../../api/rickAndMortyApi.ts

import { Character } from '../types/Interface';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error during data retrieval');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
