import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coordinates, WeatherResponse, TransformedWeather } from "../types/weatherType";

const params = 'current=temperature_2m,relative_humidity_2m,cloud_cover,apparent_temperature,rain,snowfall,wind_speed_10m&hourly=temperature_2m,cloud_cover&timezone=auto';

const forecastApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1/' }),
    endpoints: (builder) => ({
        getForecast: builder.query<TransformedWeather, Coordinates>({
            query: ({ latitude, longitude }) => `forecast?latitude=${latitude}&longitude=${longitude}&` + params,
            transformResponse: (response: WeatherResponse): TransformedWeather => {
                const { current, hourly } = response;

                return {
                    date: current.time.split('T')[0],
                    currentTime: current.time.split('T')[1],
                    currentTemperature: Math.round(current.temperature_2m),
                    currentCloudCover: current.cloud_cover,
                    humidity: current.relative_humidity_2m,
                    feelsLike: Math.round(current.apparent_temperature),
                    rain: current.rain,
                    snowfall: current.snowfall,
                    windSpeed: Math.round(current.wind_speed_10m),
                    hourlyCloudCover: hourly.cloud_cover,
                    hourlyTemperature: hourly.temperature_2m,
                    hourlyTime: hourly.time,
                };
            }
        })
    })
});

export const { useLazyGetForecastQuery } = forecastApi;
export default forecastApi;