import { CountryData } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getCountries: builder.query<CountryData[], void>({
      query: () => "all?fields=name,flags,cca2",
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
