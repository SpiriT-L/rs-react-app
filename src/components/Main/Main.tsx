import { FC, useEffect, useState } from 'react';
import useCharacters from '../../hooks/useCharacters';
import useSearchQuery from '../../hooks/useSearchQuery';
import Button from '../Button/Button';
import CardList from '../CardList/CardList';
import ErrorButton from '../ErrorButton/ErrorButton';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import styles from './Main.module.scss';

const Main: FC = () => {
  const [inputValue, setInputValue] = useSearchQuery('searchQuery');
  const { characters, isLoading, error, fetchCharacters } = useCharacters();
  const [throwError, setThrowError] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (inputValue.trim().length === 0) {
      fetchCharacters('');
      setShowResults(true);
    } else {
      const timer = setTimeout(() => {
        fetchCharacters(inputValue).then(() => {
          setShowResults(true);
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [inputValue, fetchCharacters]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setShowResults(false);
  };

  const handleEnterPress = (valid: boolean) => {
    if (valid) {
      setShowResults(false);
      fetchCharacters(inputValue).then(() => {
        setShowResults(true);
      });
    }
  };

  const handleButtonClick = () => {
    setShowResults(false);
    fetchCharacters(inputValue).then(() => {
      setShowResults(true);
    });
  };

  const handleThrowError = () => {
    setThrowError(true);
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
          <CardList characters={characters} />
        )}
      </section>
      <section>
        <ErrorButton onClick={handleThrowError} />
      </section>
    </main>
  );
};

export default Main;
