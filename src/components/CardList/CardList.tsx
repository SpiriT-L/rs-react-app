import { Component } from 'react';
import { Character } from '../../types/Interface';
import Card from '../Card/Card';
import style from './CardList.module.scss';

interface CardListProps {
  characters: Character[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { characters } = this.props;

    return (
      <div>
        <ul className={style.cardList}>
          {characters.map((character) => (
            <Card key={character.id} character={character} />
          ))}
        </ul>
      </div>
    );
  }
}

export default CardList;
