import { FC } from 'react';
import useCharacterDetails from '../../hooks/useCharacterDetails';
import { Character } from '../../types/Interface';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import style from './CharacterDetails.module.scss';

interface CharacterDetailsProps {
  characterId: string;
  onClose: () => void;
}

const CharacterDetails: FC<CharacterDetailsProps> = ({
  characterId,
  onClose,
}) => {
  const { character, isLoading, error } = useCharacterDetails(characterId);

  const handleCloseClick = () => {
    onClose();
  };

  const isCharacter = (char: Character | null): char is Character => {
    return char !== null;
  };

  return (
    <div className={style.characterDetails}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={style.error}>{error}</div>
      ) : (
        isCharacter(character) && (
          <div className={style.detailCard}>
            <button className={style.closeButton} onClick={handleCloseClick}>
              Close
            </button>
            <Card
              character={character}
              name={character.name}
              image={character.image}
              status={character.status}
              species={character.species}
              type={character.type}
              gender={character.gender}
              locationName={character.location.name}
              originName={character.origin.name}
            />
          </div>
        )
      )}
    </div>
  );
};

export default CharacterDetails;
