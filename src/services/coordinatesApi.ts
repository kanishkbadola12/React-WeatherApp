import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coordinates, GeoLocationResponse } from "../types/weatherType";

const coordinatesApi = createApi({
    reducerPath: 'coordinateApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://geocoding-api.open-meteo.com/v1/' }),
    endpoints: (builder) => ({
        getCoordinates: builder.query<Coordinates, string>({
            query: location => `search?name=${location}&count=1&language=en&format=json`,
            transformResponse: (response: GeoLocationResponse) => response.results[0]
        }),
    })
});

export const { useLazyGetCoordinatesQuery } = coordinatesApi;
export default coordinatesApi;