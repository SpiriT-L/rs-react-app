import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { usePopup } from '../../hooks/usePopup';
import useSelection from '../../hooks/useSelection';
import { Character } from '../../types/Interface';
import Button from '../Button/Button';
import CardList from '../CardList/CardList';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import ErrorButton from '../ErrorButton/ErrorButton';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import style from './Catalog.module.scss';

interface CatalogProps {
  characters: Character[];
}

const Catalog: React.FC<CatalogProps> = ({ characters }) => {
  const [inputValue, setInputValue] = useState('');
  const [throwError, setThrowError] = useState(false);
  const [isLoading] = useState(false);
  const [totalPages] = useState(0);
  const router = useRouter();
  const currentPage = parseInt((router.query.page as string) || '1', 10);
  const selectedCharacterId = router.query.details as string;

  const { selectedItems } = useSelection();
  const { showPopup } = usePopup();

  useEffect(() => {
    if (selectedItems.length > 0) {
      showPopup();
    }
  }, [selectedItems, showPopup]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    router.push(`/?page=1`);
  };

  const handleEnterPress = (valid: boolean) => {
    if (valid) {
      router.push(`/?page=1`);
    }
  };

  const handleButtonClick = () => {
    router.push(`/?page=1`);
  };

  const handleThrowError = () => {
    setThrowError(true);
  };

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  const handleCharacterClick = (id: string) => {
    router.push(`/?page=${currentPage}&details=${id}`);
  };

  const handleCloseDetails = () => {
    router.push(`/?page=${currentPage}`);
  };

  const handleLeftSectionClick = () => {
    if (selectedCharacterId) {
      handleCloseDetails();
    }
  };

  if (throwError) {
    throw new Error('This error was deliberately caused.');
  }

  return (
    <>
      <section>
        <div className={style.searchContainer}>
          <div className={style.search}>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onEnter={handleEnterPress}
              showError={(message: string) => console.log(message)}
            />
            <Button onClick={handleButtonClick}>Search</Button>
          </div>
        </div>
      </section>
      <hr className={style.hr} />
      <div className={style.content}>
        <section className={style.leftSection} onClick={handleLeftSectionClick}>
          <h2 className={style.title}>Character</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <CardList
                characters={characters}
                onCharacterClick={handleCharacterClick}
              />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
        <section
          className={`${style.rightSection} ${selectedCharacterId ? style.active : ''}`}
        >
          {selectedCharacterId && (
            <CharacterDetails
              characterId={selectedCharacterId}
              onClose={handleCloseDetails}
            />
          )}
        </section>
      </div>
      <section>
        <ErrorButton onClick={handleThrowError} />
      </section>
    </>
  );
};

export default Catalog;
