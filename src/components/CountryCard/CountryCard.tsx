import React from 'react';
import styles from './CountryCard.module.scss';

interface CountryCardProps {
  country: {
    name: { common: string };
    population: number;
    region: string;
    flags: { svg: string };
  };
  isVisited: boolean; // Новый пропс для проверки, посещена ли страна
  onToggleVisited: (countryName: string) => void; // Новый обработчик
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  isVisited,
  onToggleVisited,
}) => {
  return (
    <li
      className={`${styles.card} ${isVisited ? styles.visited : ''}`} // Добавляем класс, если страна посещена
      onClick={() => onToggleVisited(country.name.common)} // Обработчик клика
    >
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        className={styles.img}
      />
      <h3>{country.name.common}</h3>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
    </li>
  );
};

export default CountryCard;
