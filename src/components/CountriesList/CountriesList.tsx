import React, { useEffect } from 'react';
import {
  fetchCountries,
  filterByRegion,
  searchByName,
  sortBy,
} from '../../features/countriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';

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

  const regionOptions = [
    { value: 'All', label: 'All Regions' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
  ];

  const sortButtons: Array<{
    label: string;
    key: 'name' | 'population';
    order: 'asc' | 'desc';
  }> = [
    { label: 'Sort by Name (A-Z)', key: 'name', order: 'asc' },
    { label: 'Sort by Name (Z-A)', key: 'name', order: 'desc' },
    { label: 'Sort by Population (Asc)', key: 'population', order: 'asc' },
    { label: 'Sort by Population (Desc)', key: 'population', order: 'desc' },
  ];

  return (
    <div>
      <div>
        <div className="inputList">
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => dispatch(searchByName(e.target.value))}
          />
          <Select
            options={regionOptions}
            onChange={(e) => dispatch(filterByRegion(e.target.value))}
          />
        </div>
        <div className="buttonList">
          {sortButtons.map((button) => (
            <Button
              key={`${button.key}-${button.order}`}
              onClick={() =>
                dispatch(sortBy({ key: button.key, order: button.order }))
              }
            >
              {button.label}
            </Button>
          ))}
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
