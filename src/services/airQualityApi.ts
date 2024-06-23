import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AqiResponse, Coordinates } from "../types/weatherType";

const airQualityApi = createApi({
    reducerPath: 'airQualityApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://air-quality-api.open-meteo.com/v1/air-quality' }),
    endpoints: (builder) => ({
        getAirQuality: builder.query<number, Coordinates>({
            query: ({ latitude, longitude }) => `?latitude=${latitude}&longitude=${longitude}&current=pm10`,
            transformResponse: (response: AqiResponse) => Math.round(response.current.pm10)
        }),

    }),
});

export const { useLazyGetAirQualityQuery } = airQualityApi;
export default airQualityApi;