import React from 'react';
import { Character } from '../../types/Interface';
import style from './Card.module.scss';

interface CardProps {
  character: Character;
}

const Card: React.FC<CardProps> = ({ character }) => {
  return (
    <li className={style.card}>
      <h2 className={style.title}>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>
        <span className={style.subTitle}>Status:</span> {character.status}
      </p>
      <p>
        <span className={style.subTitle}>Species:</span> {character.species}
      </p>
      <p>
        <span className={style.subTitle}>Location: </span>
        {character.location.name}
      </p>
      <p>
        <span className={style.subTitle}>Origin:</span> {character.origin.name}
      </p>
    </li>
  );
};

export default Card;
