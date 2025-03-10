import { useRouter } from 'next/router';
import React from 'react';
import { PopupProvider } from '../../context/PopupContext';
import { useGetCharactersQuery } from '../../services/api';
import Catalog from '../Catalog/Catalog';
import Popup from '../Popup/Popup';

const Home: React.FC = () => {
  const router = useRouter();
  const { name = '', page = 1, itemsPerPage = 10 } = router.query;
  const { data, error, isLoading } = useGetCharactersQuery({
    name,
    page: Number(page),
    itemsPerPage: Number(itemsPerPage),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage =
      'status' in error ? `Error: ${error.status}` : `Error: ${error.message}`;
    return <div>{errorMessage}</div>;
  }

  return (
    <PopupProvider>
      <Catalog characters={data?.results || []} />
      <Popup />
    </PopupProvider>
  );
};

export default Home;
