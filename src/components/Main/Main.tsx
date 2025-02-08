import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useCharacters from '../../hooks/useCharacters';
import useSearchQuery from '../../hooks/useSearchQuery';
import Button from '../Button/Button';
import CardList from '../CardList/CardList';
import ErrorButton from '../ErrorButton/ErrorButton';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import styles from './Main.module.scss';

const ITEMS_PER_PAGE = 10;

const Main: FC = () => {
  const [inputValue, setInputValue] = useSearchQuery('searchQuery');
  const { characters, isLoading, error, fetchCharacters, totalPages } =
    useCharacters();
  const [throwError, setThrowError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    fetchCharacters(inputValue, currentPage, ITEMS_PER_PAGE).then(() => {
      setShowResults(true);
    });
  }, [inputValue, currentPage, fetchCharacters]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSearchParams({ page: '1' }); // Сброс страницы на первую при изменении ввода
    setShowResults(false);
  };

  const handleEnterPress = (valid: boolean) => {
    if (valid) {
      setShowResults(false);
      fetchCharacters(inputValue, currentPage, ITEMS_PER_PAGE).then(() => {
        setShowResults(true);
      });
    }
  };

  const handleButtonClick = () => {
    setShowResults(false);
    fetchCharacters(inputValue, currentPage, ITEMS_PER_PAGE).then(() => {
      setShowResults(true);
    });
  };

  const handleThrowError = () => {
    setThrowError(true);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (throwError) {
    throw new Error('This error was deliberately caused.');
  }

  return (
    <main>
      <section>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onEnter={handleEnterPress}
              showError={(message: string) => console.log(message)}
            />
            <Button onClick={handleButtonClick}>Search</Button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </section>
      <hr className={styles.hr} />
      <section>
        {isLoading || !showResults || error ? (
          <Loader />
        ) : (
          <>
            <CardList characters={characters} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
      <section>
        <ErrorButton onClick={handleThrowError} />
      </section>
    </main>
  );
};

export default Main;
