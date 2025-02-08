import { FC } from 'react';
import { Character } from '../../types/Interface';
import Card from '../Card/Card';
import style from './CardList.module.scss';

interface CardListProps {
  characters: Character[];
}

const CardList: FC<CardListProps> = ({ characters }) => {
  return (
    <div>
      <ul className={style.cardList}>
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </ul>
    </div>
  );
};

export default CardList;
