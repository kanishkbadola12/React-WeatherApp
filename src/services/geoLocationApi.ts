import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coordinates, LocationResponse } from "../types/weatherType";

const geoLocationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.bigdatacloud.net/data/reverse-geocode-client' }),
    endpoints: (builder) => ({
        getGeoLocation: builder.query<LocationResponse, Coordinates>({
            query: ({ latitude, longitude }) => `?latitude=${latitude}&longitude=${longitude}&localityLanguage=e`
        })
    })
});

export const { useLazyGetGeoLocationQuery } = geoLocationApi;
export default geoLocationApi;