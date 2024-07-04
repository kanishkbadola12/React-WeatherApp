import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coordinates, GeoLocationResponse } from "../types/weatherType";

const coordinatesApi = createApi({
    reducerPath: 'coordinateApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://geocoding-api.open-meteo.com/v1/' }),
    endpoints: (builder) => ({
        getCoordinates: builder.query<Coordinates, string>({
            query: location => `search?name=${location}&count=1&language=en&format=json`,
            transformResponse: (response: GeoLocationResponse) => {
                if (response.results) {
                    return {
                        latitude: response.results[0].latitude,
                        longitude: response.results[0].longitude
                    }
                }
                return { latitude: null, longitude: null };
            }
        }),
    })
});

export const { useLazyGetCoordinatesQuery } = coordinatesApi;
export default coordinatesApi;