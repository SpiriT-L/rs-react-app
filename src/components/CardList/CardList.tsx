import { FC } from 'react';
import { Character } from '../../types/Interface';
import Card from '../Card/Card';
import styles from './CardList.module.scss';

interface CardListProps {
  characters: Character[];
  onCharacterClick: (id: string) => void;
}

const CardList: FC<CardListProps> = ({ characters, onCharacterClick }) => {
  const handleCardClick = (id: string) => {
    onCharacterClick(id);
  };

  return (
    <div className={styles.cardContainer}>
      <ul className={styles.cardList}>
        {characters.map((character) => (
          <Card
            key={character.id}
            character={character}
            onClick={() => handleCardClick(character.id.toString())} // Преобразование id в строку
          />
        ))}
      </ul>
    </div>
  );
};

export default CardList;
