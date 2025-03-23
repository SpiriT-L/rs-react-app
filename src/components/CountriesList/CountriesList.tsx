import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchCountries,
  filterByRegion,
  searchByName,
  sortBy,
} from '../../features/countriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Button from '../Button/Button';
import CountryCard from '../CountryCard/CountryCard';
import Input from '../Input/Input';
import Select from '../Select/Select';

const CountriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    countries,
    selectedRegion,
    searchQuery,
    sortKey,
    sortOrder,
    status,
    error,
  } = useAppSelector((state) => state.countries);

  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    const storedVisited = localStorage.getItem('visitedCountries');
    return storedVisited ? JSON.parse(storedVisited) : [];
  });

  const filteredCountries = useMemo(() => {
    let result = countries;

    if (selectedRegion !== 'All') {
      result = result.filter((country) => country.region === selectedRegion);
    }

    if (searchQuery) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortKey && sortOrder) {
      result = [...result].sort((a, b) => {
        if (sortKey === 'name') {
          return sortOrder === 'asc'
            ? a.name.common.localeCompare(b.name.common)
            : b.name.common.localeCompare(a.name.common);
        } else if (sortKey === 'population') {
          return sortOrder === 'asc'
            ? a.population - b.population
            : b.population - a.population;
        }
        return 0;
      });
    }

    return result;
  }, [countries, selectedRegion, searchQuery, sortKey, sortOrder]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchByName(e.target.value));
    },
    [dispatch]
  );

  const handleFilterByRegion = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(filterByRegion(e.target.value));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (key: 'name' | 'population', order: 'asc' | 'desc') => {
      dispatch(sortBy({ key, order }));
    },
    [dispatch]
  );

  const toggleVisitedCountry = useCallback((countryName: string) => {
    setVisitedCountries((prevVisited) => {
      const isVisited = prevVisited.includes(countryName);
      const updatedVisited = isVisited
        ? prevVisited.filter((name) => name !== countryName)
        : [...prevVisited, countryName];

      localStorage.setItem('visitedCountries', JSON.stringify(updatedVisited));
      return updatedVisited;
    });
  }, []);

  const activeSort = useMemo(
    () => `${sortKey}-${sortOrder}`,
    [sortKey, sortOrder]
  );

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
          <Input type="text" placeholder="Search" onChange={handleSearch} />
          <Select options={regionOptions} onChange={handleFilterByRegion} />
        </div>
        <div className="buttonList">
          {sortButtons.map((button) => (
            <Button
              key={`${button.key}-${button.order}`}
              onClick={() => handleSort(button.key, button.order)}
              className={
                activeSort === `${button.key}-${button.order}` ? 'active' : ''
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
          gap: '2rem',
        }}
      >
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            country={country}
            isVisited={visitedCountries.includes(country.name.common)}
            onToggleVisited={toggleVisitedCountry}
          />
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;
