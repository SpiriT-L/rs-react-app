import { GetServerSideProps } from 'next';
import { FC } from 'react';
import HomeComponent from '../components/Home/Home';
import Popup from '../components/Popup/Popup';
import { PopupProvider } from '../context/PopupContext';
import { api } from '../services/api';
import { initializeStore } from '../store/store';

const Index: FC = () => {
  return (
    <>
      <PopupProvider>
        <HomeComponent />
        <Popup />
      </PopupProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const store = initializeStore();
  const { name = '', page = 1, itemsPerPage = 10 } = context.query;

  await store.dispatch(
    api.endpoints.getCharacters.initiate({
      name,
      page: Number(page),
      itemsPerPage: Number(itemsPerPage),
    })
  );

  await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

  return {
    props: {
      initialReduxState: store.getState(),
    },
  };
};

export default Index;
