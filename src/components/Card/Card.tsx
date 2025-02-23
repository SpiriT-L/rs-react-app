import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectItem } from '../../store/selectionSlice';
import { RootState } from '../../store/store';
import { CardProps, SelectedItem } from '../../types/Interface';
import styles from './Card.module.scss';

const Card: React.FC<CardProps> = ({
  onClick,
  name,
  image,
  status,
  species,
  type,
  gender,
  locationName,
  originName,
}) => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selection.selectedItems.some(
      (item: SelectedItem) => item.name === name
    )
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const selectedItem: SelectedItem = {
      name,
      image,
      status: status ?? '',
      species: species ?? '',
      type: type ?? '',
      gender: gender ?? '',
      locationName: locationName ?? '',
      locationUrl: '',
      originName: originName ?? '',
      originUrl: '',
      episode: [],
      url: '',
      created: '',
    };
    dispatch(toggleSelectItem(selectedItem));
  };

  const isDarkMode = document.body.classList.contains('dark');

  return (
    <div
      className={`${styles.card} ${isDarkMode ? styles.dark : ''}`}
      onClick={onClick}
    >
      <input
        className={styles.cardChec}
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <h2 className={`${styles.title} ${isDarkMode ? styles.dark : ''}`}>
        {name}
      </h2>
      <img className={styles.img} src={image} alt={name} />
      {status && (
        <p>
          Status: <span className={styles.description}>{status}</span>
        </p>
      )}
      {species && (
        <p>
          Species: <span className={styles.description}>{species}</span>
        </p>
      )}
      {type && (
        <p>
          Type: <span className={styles.description}>{type}</span>
        </p>
      )}
      {gender && (
        <p>
          Gender: <span className={styles.description}>{gender}</span>
        </p>
      )}
      {locationName && (
        <p>
          Location: <span className={styles.description}>{locationName}</span>
        </p>
      )}
      {originName && (
        <p>
          Origin: <span className={styles.description}>{originName}</span>
        </p>
      )}
    </div>
  );
};

export default Card;
