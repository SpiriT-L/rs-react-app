import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
    cache: 'no-store',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ name, page, itemsPerPage }) =>
        `character/?name=${name}&page=${page}&limit=${itemsPerPage}`,
    }),
    getCharacterById: builder.query({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = api;
