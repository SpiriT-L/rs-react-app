import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

interface CountryCardProps {
  country: {
    name: { common: string };
    population: number;
    region: string;
    flags: { svg: string };
  };
}

const CountryCard: React.FC<CountryCardProps> = React.memo(({ country }) => {
  const formattedPopulation = useMemo(() => {
    return new Intl.NumberFormat().format(country.population);
  }, [country.population]);

  const handleClick = useCallback(() => {
    console.log(`Country clicked: ${country.name.common}`);
  }, [country.name.common]);

  return (
    <li
      style={{
        width: '200px',
        margin: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
      onClick={handleClick}
    >
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        width="50"
      />
      <h3>{country.name.common}</h3>
      <p>Population: {formattedPopulation} people</p>
      <p>Region: {country.region}</p>
    </li>
  );
});
CountryCard.displayName = 'CountryCard';

CountryCard.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    flags: PropTypes.shape({
      svg: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CountryCard;
