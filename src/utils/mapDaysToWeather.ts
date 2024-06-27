import { WeeklyConditions } from "../types/weatherType";
import { mapUnitsToWeather } from "./mapUnitsToWeather";

export const mapDaysToWeather = (
    hourlyTime: string[],
    hourlyTemperature: number[],
    hourlyCloudCover: number[],
    hourlyChancesOfRain: number[]
) => {
    let daysToWeatherMap: Record<string, WeeklyConditions> = {};
    let temperatureOfDay: number[] = [];
    let weatherOfDay: number[] = [];
    let rainIdx = 0;

    for (let idx = 0; idx < hourlyTemperature.length; idx++) {
        temperatureOfDay.push(hourlyTemperature[idx]);
        weatherOfDay.push(hourlyCloudCover[idx]);

        if ((idx + 1) % 24 === 0) {

            const date = new Date(hourlyTime[idx].split('T')[0]);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            const lowestTemp = Math.round(Math.min(...temperatureOfDay));
            const highestTemp = Math.round(Math.max(...temperatureOfDay));
            const avgCloudCover = Math.round(weatherOfDay.reduce((acc, item) => acc + item, 0) / 24);

            daysToWeatherMap[day] = {
                lowestTemp,
                highestTemp,
                weather: mapUnitsToWeather(avgCloudCover, hourlyChancesOfRain[rainIdx++])
            }

            // Reset arrays for the next day
            temperatureOfDay = [];
            weatherOfDay = [];
        }
    };

    return daysToWeatherMap;
} 