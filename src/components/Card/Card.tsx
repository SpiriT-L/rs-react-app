import React from 'react';
import { Character } from '../../types/Interface';
import style from './Card.module.scss';

interface CardProps {
  character: Character;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ character, onClick }) => {
  return (
    <li className={style.card} onClick={onClick}>
      <h2 className={style.title}>{character.name}</h2>
      <img className={style.img} src={character.image} alt={character.name} />
    </li>
  );
};

export default Card;
