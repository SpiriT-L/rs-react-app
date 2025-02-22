import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePopup } from '../../hooks/usePopup';
import useSelection from '../../hooks/useSelection';
import { useGetCharactersQuery } from '../../services/api';
import Button from '../Button/Button';
import CardList from '../CardList/CardList';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import ErrorButton from '../ErrorButton/ErrorButton';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import style from './Catalog.module.scss';

const ITEMS_PER_PAGE = 10;

const Catalog: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [throwError, setThrowError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const selectedCharacterId = searchParams.get('details');

  const { data, error, isLoading } = useGetCharactersQuery({
    name: inputValue,
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const characters = useMemo(() => data?.results || [], [data]);
  const totalPages = data?.info?.pages || 0;

  const { selectedItems } = useSelection();
  const { showPopup } = usePopup();

  useEffect(() => {
    if (selectedItems.length > 0) {
      showPopup();
    }
  }, [selectedItems, showPopup]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSearchParams({ page: '1' });
  };

  const handleEnterPress = (valid: boolean) => {
    if (valid) {
      setSearchParams({ page: '1' });
    }
  };

  const handleButtonClick = () => {
    setSearchParams({ page: '1' });
  };

  const handleThrowError = () => {
    setThrowError(true);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleCharacterClick = (id: string) => {
    setSearchParams({ page: currentPage.toString(), details: id });
  };

  const handleCloseDetails = () => {
    setSearchParams({ page: currentPage.toString() });
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
          {error && <ErrorDisplay error={error} />}
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
