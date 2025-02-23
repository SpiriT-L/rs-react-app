import React from 'react';
import { useGetCharacterByIdQuery } from '../../services/api';
import { CharacterDetailsProps } from '../../types/Interface';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import Loader from '../Loader/Loader';
import style from './CharacterDetails.module.scss';

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
    <div className={style.characterDetailsOverlay} onClick={onClose}>
      <div
        className={style.characterDetails}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={style.closeButton}
          onClick={onClose}
          data-testid="close-button"
        >
          Close
        </button>
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Type: {character.type}</p>
        <p>Gender: {character.gender}</p>
        <p>
          Location: {character.location.name} ({character.location.url})
        </p>
        <p>
          Origin: {character.origin.name} ({character.origin.url})
        </p>
        <p>Episodes: {character.episode.join(', ')}</p>
        <p>URL: {character.url}</p>
        <p>Created: {character.created}</p>
      </div>
    </div>
  );
};

export default CharacterDetails;
