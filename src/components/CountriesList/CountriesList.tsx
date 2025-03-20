import React, { useEffect } from 'react';
import {
  fetchCountries,
  filterByRegion,
  searchByName,
  sortBy,
} from '../../features/countriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Button from '../Button/Button';

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
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            margin: '1rem 0',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={() => dispatch(sortBy({ key: 'name', order: 'asc' }))}
          >
            Sort by Name (A-Z)
          </Button>
          <Button
            onClick={() => dispatch(sortBy({ key: 'name', order: 'desc' }))}
          >
            Sort by Name (Z-A)
          </Button>
          <Button
            onClick={() =>
              dispatch(sortBy({ key: 'population', order: 'asc' }))
            }
          >
            Sort by Population (Asc)
          </Button>
          <Button
            onClick={() =>
              dispatch(sortBy({ key: 'population', order: 'desc' }))
            }
          >
            Sort by Population (Desc)
          </Button>
        </div>
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {filteredCountries.map((country) => (
          <li
            key={country.name.common}
            style={{
              width: '200px',
              margin: '1rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '10px',
            }}
          >
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              width="50"
            />
            <h3>{country.name.common}</h3>
            <p>Population: {country.population} people</p>
            <p>Region: {country.region}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;
