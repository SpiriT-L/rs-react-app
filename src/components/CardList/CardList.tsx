import { Component } from 'react';
import { getCharacters } from '../../api/rickAndMortyApi';
import { Character } from '../../types/Interface';
import Card from '../Card/Card';
import style from './CardList.module.scss';

interface CardListState {
  loading: boolean;
  characters: Character[];
}

class CardList extends Component<object, CardListState> {
  constructor(props: object) {
    super(props);
    this.state = {
      loading: true,
      characters: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const characters = await getCharacters();
    this.setState({ loading: false, characters });
  };

  render() {
    const { loading, characters } = this.state;

    return (
      <div>
        {loading ? (
          <div className={`${style.loadingStyle} ${style.overlay}`}>
            <p>Loading...</p>
          </div>
        ) : (
          <ul className={style.cardList}>
            {characters.map((character) => (
              <Card key={character.id} character={character} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default CardList;
