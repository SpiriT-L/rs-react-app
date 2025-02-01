import { Component } from 'react';
import CardList from '../CardList/CardList';
import Input from '../Input/Input';
import { Character } from '../../types/Interface';
import { getCharacters } from '../../api/rickAndMortyApi';

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
          <Input
            label="Search:"
            value={inputValue}
            onChange={this.handleInputChange}
            onEnter={this.handleEnterPress}
          />
        </section>
        <section>
          <CardList characters={filteredCharacters} />
        </section>
      </main>
    );
  }
}

export default Main;
