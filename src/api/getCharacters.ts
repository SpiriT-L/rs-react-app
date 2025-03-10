import { Character } from '../types/Interface';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (
  query: string,
  page: number,
  itemsPerPage: number
): Promise<{ results: Character[]; totalPages: number }> => {
  try {
    const response = await fetch(
      `${API_URL}?name=${query}&page=${page}&limit=${itemsPerPage}`
    );
    if (!response.ok) {
      throw new Error('Error during data retrieval');
    }
    const data = await response.json();
    return { results: data.results, totalPages: data.info.pages };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { results: [], totalPages: 0 };
  }
};
