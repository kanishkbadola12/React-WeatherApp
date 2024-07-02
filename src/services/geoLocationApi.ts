import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Address, Coordinates, LocationResponse } from "../types/weatherType";

const geoLocationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://nominatim.openstreetmap.org/reverse' }),
    endpoints: (builder) => ({
        getGeoLocation: builder.query<Address, Coordinates>({
            query: ({ latitude, longitude }) => `?format=json&lat=${latitude}&&lon=${longitude}&zoom=18&addressdetails=1`,
            transformResponse: (response: LocationResponse) => response.address,
        })
    })
});

export const { useLazyGetGeoLocationQuery } = geoLocationApi;
export default geoLocationApi;