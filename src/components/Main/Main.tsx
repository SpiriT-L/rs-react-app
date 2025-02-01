import { Component } from 'react';
import { getCharacters } from '../../api/rickAndMortyApi';
import { Character } from '../../types/Interface';
import Button from '../Button/Button';
import CardList from '../CardList/CardList';
import Input from '../Input/Input';
import styles from './Main.module.scss';

interface State {
  inputValue: string;
  characters: Character[];
  filteredCharacters: Character[];
}

class Main extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: '',
      characters: [],
      filteredCharacters: [],
    };
  }

  async componentDidMount() {
    const characters = await getCharacters();
    this.setState({ characters, filteredCharacters: characters });
  }

  handleInputChange = (value: string) => {
    this.setState({ inputValue: value });
  };

  handleEnterPress = () => {
    this.filterCharacters();
  };

  handleButtonClick = () => {
    this.filterCharacters();
  };

  filterCharacters = () => {
    const { inputValue, characters } = this.state;
    const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    this.setState({ filteredCharacters });
  };

  render() {
    const { inputValue, filteredCharacters } = this.state;

    return (
      <main>
        <section>
          <div className={styles.searchContainer}>
            <Input
              // label="Search:"
              value={inputValue}
              onChange={this.handleInputChange}
              onEnter={this.handleEnterPress}
            />
            <Button onClick={this.handleButtonClick}>Search</Button>
          </div>
        </section>
        <section>
          <CardList characters={filteredCharacters} />
        </section>
      </main>
    );
  }
}

export default Main;
