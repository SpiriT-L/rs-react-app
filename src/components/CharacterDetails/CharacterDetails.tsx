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
        <h2 className={style.title}>{character.name}</h2>
        <img className={style.img} src={character.image} alt={character.name} />
        <p className={style.p}>Status: {character.status}</p>
        <p className={style.p}>Species: {character.species}</p>
        <p className={style.p}>Type: {character.type}</p>
        <p className={style.p}>Gender: {character.gender}</p>
        <p className={style.p}>
          Location: {character.location.name} ({character.location.url})
        </p>
        <p className={style.p}>
          Origin: {character.origin.name} ({character.origin.url})
        </p>
        <p className={style.p}>Episodes: {character.episode.join(', ')}</p>
        <p className={style.p}>URL: {character.url}</p>
        <p className={style.p}>Created: {character.created}</p>
      </div>
    </div>
  );
};

export default CharacterDetails;
