import { mapUnitsToWeather } from "./mapUnitsToWeather";

interface HourlyConditions {
    temperature: number;
    weather: {
        condition: string;
        icon: React.ReactNode
    }
}

interface FilteredWeather {
    time: string[],
    temperature: number[],
    cloudCover: number[],
    chancesOfRain: number[]
}

export const mapTimeToTemperature = (
    currentTime: number,
    hourlyTime: string[],
    hourlyTemperature: number[],
    hourlyCloudCover: number[],
    hourlyChancesOfRain: number[],
) => {
    let hoursToWeatherMap: Record<string, HourlyConditions> = {};
    let filteredWeather: FilteredWeather = {
        time: [],
        temperature: [],
        cloudCover: [],
        chancesOfRain: [],
    }

    for (let i = 0; i < hourlyTime.length; i++) {
        let hourTime = parseInt(hourlyTime[i].split('T')[1])

        if (hourTime >= currentTime) {
            const idx = i + 1;
            filteredWeather.time = hourlyTime.slice(idx, idx + 24);
            filteredWeather.temperature = hourlyTemperature.slice(idx, idx + 24);
            filteredWeather.cloudCover = hourlyCloudCover.slice(idx, idx + 24);
            filteredWeather.chancesOfRain = hourlyChancesOfRain.slice(idx, idx + 24);
            break;
        }
    }

    filteredWeather.time.forEach((time, idx) => {
        hoursToWeatherMap[time.split('T')[1]] = {
            temperature: Math.round(filteredWeather.temperature[idx]),
            weather: mapUnitsToWeather(filteredWeather.cloudCover[idx], filteredWeather.chancesOfRain[idx])
        }
    });

    return hoursToWeatherMap;
} 