import React, { useEffect } from 'react';
import {
  fetchCountries,
  filterByRegion,
  searchByName,
  sortBy,
} from '../../features/countriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const CountriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredCountries, status, error } = useAppSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => dispatch(searchByName(e.target.value))}
        />
        <select onChange={(e) => dispatch(filterByRegion(e.target.value))}>
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <button onClick={() => dispatch(sortBy({ key: 'name', order: 'asc' }))}>
          Sort by Name (A-Z)
        </button>
        <button
          onClick={() => dispatch(sortBy({ key: 'name', order: 'desc' }))}
        >
          Sort by Name (Z-A)
        </button>
        <button
          onClick={() => dispatch(sortBy({ key: 'population', order: 'asc' }))}
        >
          Sort by Population (Asc)
        </button>
        <button
          onClick={() => dispatch(sortBy({ key: 'population', order: 'desc' }))}
        >
          Sort by Population (Desc)
        </button>
      </div>
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              width="50"
            />
            <p>{country.name.common}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;
