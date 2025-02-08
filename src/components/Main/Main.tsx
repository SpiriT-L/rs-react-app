import { FC, useState, useEffect } from 'react';
import { getCharacters } from '../../api/rickAndMortyApi';
import { Character } from '../../types/Interface';
import Button from '../Button/Button';
import CardList from '../CardList/CardList';
import ErrorButton from '../ErrorButton/ErrorButton';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import useSearchQuery from '../../hooks/useSearchQuery';
import styles from './Main.module.scss';

const Main: FC = () => {
  const [inputValue, setInputValue] = useSearchQuery('searchQuery');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [throwError, setThrowError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAndFilterCharacters();
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setError('');
  };

  const handleEnterPress = (valid: boolean) => {
    if (valid) {
      filterCharactersAndStore();
    }
  };

  const handleButtonClick = () => {
    filterCharactersAndStore();
  };

  const handleError = (message: string) => {
    setError(message);
  };

  const fetchAndFilterCharacters = async () => {
    setIsLoading(true);
    const characters = await getCharacters();

    setTimeout(() => {
      if (inputValue.trim().length === 0) {
        setFilteredCharacters(characters);
        setError('');
        setIsLoading(false);
      } else if (inputValue.length < 3) {
        setError('The query must contain a minimum of three characters.');
        setIsLoading(false);
      } else {
        const filteredCharacters = characters.filter((character) =>
          character.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (filteredCharacters.length === 0) {
          setError('No results found. Try changing the query.');
          setIsLoading(false);
        } else {
          setFilteredCharacters(filteredCharacters);
          setError('');
          setIsLoading(false);
        }
      }
    }, 1000); // Задержка в 1 секунду
  };

  const filterCharactersAndStore = () => {
    fetchAndFilterCharacters();
  };

  const handleThrowError = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('This error was intentionally triggered.');
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
              showError={handleError}
            />
            <Button onClick={handleButtonClick}>Search</Button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </section>
      <hr className={styles.hr} />
      <section>
        {isLoading ? <Loader /> : <CardList characters={filteredCharacters} />}
      </section>
      <section>
        <ErrorButton onClick={handleThrowError} />
      </section>
    </main>
  );
};

export default Main;
