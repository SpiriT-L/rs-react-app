import { FC } from 'react';
import { CardListProps } from '../../types/Interface';
import Card from '../Card/Card';
import style from './CardList.module.scss';

const CardList: FC<CardListProps> = ({ characters, onCharacterClick }) => {
  const handleCardClick = (id: string) => {
    onCharacterClick(id);
  };

  if (characters.length === 0) {
    return <p className={style.noCharactersMessage}>No characters available</p>;
  }

  return (
    <div className={style.cardContainer}>
      <ul className={style.cardList}>
        {characters.map((character, name) => (
          <li key={name}>
            <Card
              key={character.id}
              character={character}
              name={character.name}
              image={character.image}
              onClick={() => handleCardClick(character.id.toString())}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
