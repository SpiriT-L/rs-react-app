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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  filteredCountries: [],
  status: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    console.log('Fetched countries data:', response.data);
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
      state.filteredCountries = state.countries.filter(
        (country: Country) =>
          country.region === action.payload || action.payload === 'All'
      );
    },
    searchByName: (state, action: PayloadAction<string>) => {
      state.filteredCountries = state.countries.filter((country) =>
        country.name.common.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    sortBy: (
      state,
      action: PayloadAction<{
        key: 'name' | 'population';
        order: 'asc' | 'desc';
      }>
    ) => {
      const { key, order } = action.payload;
      state.filteredCountries = [...state.filteredCountries].sort((a, b) => {
        if (order === 'asc') {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
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
