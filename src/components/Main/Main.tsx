import { Component } from 'react';
import { getCharacters } from '../../api/rickAndMortyApi';
import { Character } from '../../types/Interface';
import Button from '../Button/Button';
import CardList from '../CardList/CardList';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import styles from './Main.module.scss';

interface State {
  inputValue: string;
  characters: Character[];
  filteredCharacters: Character[];
  isLoading: boolean;
  error: string;
}

class Main extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('searchQuery') || '',
      characters: [],
      filteredCharacters: [],
      isLoading: true,
      error: '',
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchAndFilterCharacters();
  }

  handleInputChange = (value: string) => {
    this.setState({ inputValue: value, error: '' });
  };

  handleEnterPress = (valid: boolean) => {
    if (valid) {
      this.filterCharactersAndStore();
    }
  };

  handleButtonClick = () => {
    this.filterCharactersAndStore();
  };

  handleError = (message: string) => {
    this.setState({ error: message });
  };

  fetchAndFilterCharacters = async () => {
    const { inputValue } = this.state;
    this.setState({ isLoading: true });

    setTimeout(async () => {
      const characters = await getCharacters();

      if (inputValue.trim().length === 0) {
        this.setState({
          filteredCharacters: characters,
          error: '',
          isLoading: false,
        });
      } else if (inputValue.length < 3) {
        this.setState({
          error: 'The query must contain a minimum of three characters.',
          isLoading: false,
        });
      } else {
        const filteredCharacters = characters.filter((character) =>
          character.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (filteredCharacters.length === 0) {
          this.setState({
            error: 'No results found. Try changing the query.',
            isLoading: false,
          });
        } else {
          this.setState({
            filteredCharacters,
            error: '',
            isLoading: false,
          });
        }
      }
    }, 1000);
  };

  filterCharactersAndStore = () => {
    const { inputValue } = this.state;
    if (inputValue.trim().length === 0) {
      localStorage.removeItem('searchQuery');
    } else {
      localStorage.setItem('searchQuery', inputValue);
    }
    this.fetchAndFilterCharacters();
  };

  render() {
    const { inputValue, filteredCharacters, isLoading, error } = this.state;

    return (
      <main>
        <section>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <Input
                value={inputValue}
                onChange={this.handleInputChange}
                onEnter={this.handleEnterPress}
                showError={this.handleError}
              />
              <Button onClick={this.handleButtonClick}>Search</Button>
            </div>
            {error && <div className={styles.error}>{error}</div>}
          </div>
        </section>
        <section>
          {isLoading ? (
            <Loader />
          ) : (
            <CardList characters={filteredCharacters} />
          )}
        </section>
      </main>
    );
  }
}

export default Main;
