import { FC } from 'react';
import useCharacterDetails from '../../hooks/useCharacterDetails';
import Loader from '../Loader/Loader';
import styles from './CharacterDetails.module.scss';

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

  return (
    <div className={styles.characterDetails}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div>
          <button className={styles.closeButton} onClick={handleCloseClick}>
            Close
          </button>
          <h2>{character?.name}</h2>
          <img src={character?.image} alt={character?.name} />
          <p>
            Status:{' '}
            <span className={styles.description}>{character?.status}</span>
          </p>
          <p>
            Species:{' '}
            <span className={styles.description}>{character?.species}</span>
          </p>
          {character?.type && (
            <p>
              Type:{' '}
              <span className={styles.description}>{character?.type}</span>
            </p>
          )}
          <p>
            Gender:{' '}
            <span className={styles.description}>{character?.gender}</span>
          </p>
          {character?.location.name && (
            <p>
              Location:{' '}
              <span className={styles.description}>
                {character?.location.name}
              </span>
            </p>
          )}
          <p>
            Origin:{' '}
            <span className={styles.description}>{character?.origin.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;
