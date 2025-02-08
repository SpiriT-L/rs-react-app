import React from 'react';
import { Character } from '../../types/Interface';
import style from './Card.module.scss';

interface CardProps {
  character: Character;
}

const Card: React.FC<CardProps> = ({ character }) => {
  return (
    <li className={style.card}>
      <img className={style.img} src={character.image} alt={character.name} />
      <h2 className={style.title}>{character.name}</h2>
      <p>
        <span className={style.subTitle}>Status:</span>{' '}
        <span className={style.description}>{character.status}</span>
      </p>
      <p>
        <span className={style.subTitle}>Species:</span> {character.species}
      </p>
      <p>
        <span className={style.subTitle}>Location: </span>{' '}
        <span className={style.description}>{character.location.name}</span>
      </p>
      <p>
        <span className={style.subTitle}>Origin:</span>{' '}
        <span className={style.description}>{character.origin.name}</span>
      </p>
    </li>
  );
};

export default Card;
