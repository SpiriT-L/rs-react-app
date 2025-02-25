import { useEffect, useState } from 'react';

type UseSearchQueryReturn = [string, (newQuery: string) => void];

const useSearchQuery = (key: string): UseSearchQueryReturn => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const savedQuery = localStorage.getItem(key);
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, [key]);

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
    localStorage.setItem(key, newQuery);
  };

  return [query, updateQuery];
};

export default useSearchQuery;
