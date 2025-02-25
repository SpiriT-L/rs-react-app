import React from 'react';
import { Character } from '../../types/Interface';
import style from './Card.module.scss';

interface CardProps {
  character?: Character;
  onClick?: () => void;
  name: string;
  image: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  locationName?: string;
  originName?: string;
}

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
  return (
    <li className={style.card} onClick={onClick}>
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
