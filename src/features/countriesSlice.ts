import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Country {
  name: {
    common: string;
  };
  region: string;
  population: number;
  flags: {
    svg: string;
  };
}

interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  selectedRegion: string;
  searchQuery: string;
  sortKey: 'name' | 'population' | null;
  sortOrder: 'asc' | 'desc' | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  filteredCountries: [],
  selectedRegion: 'All',
  searchQuery: '',
  sortKey: null,
  sortOrder: null,
  status: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data.map((country: Country) => ({
      name: country.name,
      region: country.region,
      population: country.population,
      flags: country.flags,
    }));
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    filterByRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      state.filteredCountries = state.countries.filter((country) => {
        const matchesRegion =
          action.payload === 'All' || country.region === action.payload;
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
        return matchesRegion && matchesSearch;
      });
    },
    searchByName: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredCountries = state.countries.filter((country) => {
        const matchesRegion =
          state.selectedRegion === 'All' ||
          country.region === state.selectedRegion;
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(action.payload.toLowerCase());
        return matchesRegion && matchesSearch;
      });
    },
    sortBy: (
      state,
      action: PayloadAction<{
        key: 'name' | 'population';
        order: 'asc' | 'desc';
      }>
    ) => {
      state.sortKey = action.payload.key;
      state.sortOrder = action.payload.order;

      state.filteredCountries = [...state.filteredCountries].sort((a, b) => {
        if (state.sortOrder === 'asc') {
          if (state.sortKey === 'name') {
            return a.name.common.localeCompare(b.name.common);
          } else if (state.sortKey === 'population') {
            return a.population - b.population;
          }
        } else {
          if (state.sortKey === 'name') {
            return b.name.common.localeCompare(a.name.common);
          } else if (state.sortKey === 'population') {
            return b.population - a.population;
          }
        }
        return 0;
      });

      console.log('After sorting:', state.filteredCountries); // Отладочный вывод
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch countries';
      });
  },
});

export const { filterByRegion, searchByName, sortBy } = countriesSlice.actions;

export default countriesSlice.reducer;
