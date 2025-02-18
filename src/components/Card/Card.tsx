import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';
import { CardProps } from '../../types/Interface';
import style from './Card.module.scss';

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
    state.selectedItems.selectedItems.includes(name)
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleItem(name));
  };

  return (
    <li className={style.card} onClick={onClick}>
      <input
        className={style.cardChec}
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <h2 className={style.title}>{name}</h2>
      <img className={style.img} src={image} alt={name} />
      {status && (
        <p>
          Status: <span className={style.description}>{status}</span>
        </p>
      )}
      {species && (
        <p>
          Species: <span className={style.description}>{species}</span>
        </p>
      )}
      {type && (
        <p>
          Type: <span className={style.description}>{type}</span>
        </p>
      )}
      {gender && (
        <p>
          Gender: <span className={style.description}>{gender}</span>
        </p>
      )}
      {locationName && (
        <p>
          Location: <span className={style.description}>{locationName}</span>
        </p>
      )}
      {originName && (
        <p>
          Origin: <span className={style.description}>{originName}</span>
        </p>
      )}
    </li>
  );
};

export default Card;
