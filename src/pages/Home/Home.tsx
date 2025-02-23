import { FC } from 'react';
import Catalog from '../../components/Catalog/Catalog';
import Popup from '../../components/Popup/Popup';
import { PopupProvider } from '../../context/PopupContext';

const Home: FC = () => {
  return (
    <>
      <PopupProvider>
        <Catalog />
        <Popup />
      </PopupProvider>
    </>
  );
};

export default Home;
