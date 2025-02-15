import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCharacters } from '../../api/getCharacters';
import { useAppContext } from '../../context/context';
import useSearchQuery from '../../hooks/useSearchQuery';
import Button from '../Button/Button';
import CardList from '../CardList/CardList';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import ErrorButton from '../ErrorButton/ErrorButton';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import style from './Catalog.module.scss';

const ITEMS_PER_PAGE = 10;

const Catalog: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { characters, isLoading, error, totalPages } = state;
  const [inputValue, setInputValue] = useSearchQuery('searchQuery');
  const [throwError, setThrowError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const selectedCharacterId = searchParams.get('details');

  const fetchCharacters = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const { results, totalPages } = await getCharacters(
        inputValue,
        currentPage,
        ITEMS_PER_PAGE
      );
      dispatch({
        type: 'SET_CHARACTERS',
        payload: { characters: results, totalPages },
      });
      setShowResults(true);
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: 'An error occurred during data retrieval.',
      });
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [inputValue, currentPage, dispatch]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSearchParams({ page: '1' });
    setShowResults(false);
  };

  const handleEnterPress = (valid: boolean) => {
    if (valid) {
      setShowResults(false);
      fetchCharacters();
    }
  };

  const handleButtonClick = () => {
    setShowResults(false);
    fetchCharacters();
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
    <main className={style.main}>
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
          {error && <div className={style.error}>{error}</div>}
        </div>
      </section>
      <hr className={style.hr} />
      <div className={style.content}>
        <section className={style.leftSection} onClick={handleLeftSectionClick}>
          <h2 className={style.title}>Character</h2>
          {isLoading || !showResults || error ? (
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
    </main>
  );
};

export default Catalog;
