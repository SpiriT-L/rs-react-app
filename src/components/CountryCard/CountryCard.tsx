import React from 'react';
import styles from './CountryCard.module.scss';

interface CountryCardProps {
  country: {
    name: { common: string };
    population: number;
    region: string;
    flags: { svg: string };
  };
  isVisited: boolean;
  onToggleVisited: (countryName: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = React.memo(
  (props: CountryCardProps) => {
    const { country, isVisited, onToggleVisited } = props;
    return (
      <li
        className={`${styles.card} ${isVisited ? styles.visited : ''}`}
        onClick={() => onToggleVisited(country.name.common)}
      >
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className={styles.img}
        />
        <h3 className={styles.name}>{country.name.common}</h3>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
      </li>
    );
  }
);

CountryCard.displayName = 'CountryCard';

export default CountryCard;
