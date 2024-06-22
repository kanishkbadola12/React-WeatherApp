import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coordinates, WeatherResponse, TransformedWeather } from "../types/weatherType";

const current = 'temperature_2m,relative_humidity_2m,cloud_cover,apparent_temperature,rain,snowfall,wind_speed_10m,wind_direction_10m';
const hourly = 'temperature_2m,cloud_cover,visibility&timezone=auto';
const daily = 'sunrise,sunset,uv_index_max';
const params = `current=${current}&hourly=${hourly}&daily=${daily}`;

const forecastApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open-meteo.com/v1/' }),
    endpoints: (builder) => ({
        getForecast: builder.query<TransformedWeather, Coordinates>({
            query: ({ latitude, longitude }) => `forecast?latitude=${latitude}&longitude=${longitude}&` + params,
            transformResponse: (response: WeatherResponse): TransformedWeather => {
                const { current, hourly, daily } = response;
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
                    windDirection: current.wind_direction_10m,
                    hourlyCloudCover: hourly.cloud_cover,
                    hourlyTemperature: hourly.temperature_2m,
                    hourlyTime: hourly.time,
                    visibility: Math.round(hourly.visibility.splice(0, 24).reduce((acc, item) => item + acc, 0) / 24000),
                    sunrise: daily.sunrise[0].split('T')[1],
                    sunset: daily.sunset[0].split('T')[1],
                    uvIndex: Math.round(Math.max(...daily.uv_index_max))
                };
            }
        })
    })
});

export const { useLazyGetForecastQuery } = forecastApi;
export default forecastApi;