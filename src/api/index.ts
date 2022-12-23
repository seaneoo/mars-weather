import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MSLFeed } from "./types";

const API_BASE_URL = "https://mars.nasa.gov/rss/api/";

export const NASA = createApi({
  /** Name of the API. */
  reducerPath: "nasa",
  /** API base url. */
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  /** API endpoints. */
  endpoints: (builder) => ({
    /** Get all the recorded weather readings. */
    getWeather: builder.query<MSLFeed, void>({
      query: () => "?feed=weather&category=msl&feedtype=json",
    }),
  }),
});

export const { useGetWeatherQuery } = NASA;
