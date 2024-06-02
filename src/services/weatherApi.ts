import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const params = 'current=temperature_2m,relative_humidity_2m,cloud_cover,apparent_temperature,rain,snowfall,wind_speed_10m&hourly=temperature_2m';

export const coordinateApi = createApi({
    reducerPath: 'coordinateApi',
    baseQuery: fetchBaseQuery({ baseUrl : 'https://geocoding-api.open-meteo.com/v1/' }),
    endpoints: (builder) => ({
        getCoordinates: builder.query({
            query: location => `search?name=${location}&count=1&language=en&format=json`
        })
    })
});

export const geoLocationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.bigdatacloud.net/data/reverse-geocode-client'}),
    endpoints: (builder) => ({
        getGeoLocation: builder.query({
            query: ({latitude, longitude}) => `?latitude=${latitude}&longitude=${longitude}&localityLanguage=e`
        })
    })
});

export const forecastApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1/' }),
    endpoints: (builder) => ({
        getForecast: builder.query({
            query: ({ latitude, longitude }) => `forecast?latitude=${latitude}&longitude=${longitude}&` + params
        })
    })
});

export const { useLazyGetCoordinatesQuery } = coordinateApi;
export const { useLazyGetForecastQuery } = forecastApi;
export const { useLazyGetGeoLocationQuery } = geoLocationApi;