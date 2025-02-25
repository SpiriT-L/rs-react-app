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

  if (characters.length === 0) {
    return (
      <p className={styles.noCharactersMessage}>No characters available</p>
    );
  }

  return (
    <div className={styles.cardContainer}>
      <ul className={styles.cardList}>
        {characters.map((character) => (
          <Card
            key={character.id}
            character={character}
            name={character.name}
            image={character.image}
            onClick={() => handleCardClick(character.id.toString())}
          />
        ))}
      </ul>
    </div>
  );
};

export default CardList;
