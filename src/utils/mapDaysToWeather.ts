import { mapCurrentCloudCoverToWeather } from "./mapCloudCoverToWeather";

interface WeeklyConditions {
    lowestTemp: number;
    highestTemp: number;
    cloudCover: string;
}

export const mapDaysToWeather = (hourly: string[], temperatures: number[], hourlyCloudCover: number[]) => {
    let daysToWeatherMap: Record<string, WeeklyConditions> = {};
    let temperatureOfDay: number[] = [];
    let cloudCoverOfDay: number[] = [];

    for (let idx = 0; idx < temperatures.length; idx++) {
        temperatureOfDay.push(temperatures[idx]);
        cloudCoverOfDay.push(hourlyCloudCover[idx]);

        if ((idx + 1) % 24 === 0) {
            const date = new Date(hourly[idx].split('T')[0]);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            const lowestTemp = Math.round(Math.min(...temperatureOfDay));
            const highestTemp = Math.round(Math.max(...temperatureOfDay));
            const avgCloudCover = Math.round(cloudCoverOfDay.reduce((acc, item) => acc + item, 0) / 24);

            daysToWeatherMap[day] = {
                lowestTemp,
                highestTemp,
                cloudCover: mapCurrentCloudCoverToWeather(avgCloudCover)
            }

            // Reset arrays for the next day
            temperatureOfDay = [];
            cloudCoverOfDay = [];
        }
    };

    return daysToWeatherMap;
} 