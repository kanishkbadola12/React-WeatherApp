import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coordinates, WeatherResponse } from "../types/weather";
import { TransfomedCurrentWeather } from "../types/types";

const params = 'current=temperature_2m,relative_humidity_2m,cloud_cover,apparent_temperature,rain,snowfall,wind_speed_10m&hourly=temperature_2m';

const forecastApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1/' }),
    endpoints: (builder) => ({
        getForecast: builder.query<TransfomedCurrentWeather, Coordinates>({
            query: ({ latitude, longitude }) => `forecast?latitude=${latitude}&longitude=${longitude}&` + params,
            transformResponse: (response: WeatherResponse): TransfomedCurrentWeather => {
                const { current } = response;
                return {
                    time: current.time,
                    interval: current.interval,
                    temperature2m: current.temperature_2m,
                    relativeHumidity2m: current.relative_humidity_2m,
                    cloudCover: current.cloud_cover,
                    apparentTemperature: current.apparent_temperature,
                    rain: current.rain,
                    snowfall: current.snowfall,
                    windSpeed10m: current.wind_speed_10m,
                };
            }
        })
    })
});

export const { useLazyGetForecastQuery } = forecastApi;
export default forecastApi;