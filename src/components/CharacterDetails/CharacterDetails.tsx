import React from 'react';
import { useGetCharacterByIdQuery } from '../../services/api';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import Loader from '../Loader/Loader';
import style from './CharacterDetails.module.scss';

interface CharacterDetailsProps {
  characterId: string;
  onClose: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  characterId,
  onClose,
}) => {
  const {
    data: character,
    error,
    isLoading,
  } = useGetCharacterByIdQuery(characterId);

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!character) {
    return null;
  }

  return (
    <div className={style.characterDetails}>
      <button
        className={style.closeButton}
        onClick={onClose}
        data-testid="close-button"
      >
        Close
      </button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <p>Location: {character.location.name}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Gender: {character.gender}</p>
      <p>Type: {character.type}</p>
    </div>
  );
};

export default CharacterDetails;
