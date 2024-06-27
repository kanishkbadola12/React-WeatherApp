type NoRain = 'No rain & Clear' | 'No rain & Partly Cloudy' | 'No rain & Mostly Cloudy' | 'No rain & Overcast';
type LightRain = 'Light rain & Clear' | 'Light rain & Partly Cloudy' | 'Light rain & Mostly Cloudy' | 'Light rain & Overcast';
type ModerateRain = 'Moderate rain & Clear' | 'Moderate rain & Partly Cloudy' | 'Moderate rain & Mostly Cloudy' | 'Moderate rain & Overcast';
type HeavyRain = 'Heavy rain & Clear' | 'Heavy rain & Partly Cloudy' | 'Heavy rain & Mostly Cloudy' | 'Heavy rain & Overcast';

export type WeatherState = NoRain | LightRain | ModerateRain | HeavyRain;
export type WeatherFactors = 'AQI' | 'UV Index' | 'Wind Speed' | 'Humidity' | 'Visibility';

export interface Coordinates {
    latitude: number | null;
    longitude: number | null;
}

export interface WeeklyConditions {
    lowestTemp: number;
    highestTemp: number;
    weather: {
        condition: string;
        icon: React.ReactNode
    }
}

export interface LocationResponse {
    city: string;
    countryCode: string
}

export interface GeoLocationResponse {
    results: Coordinates[];
}

export interface Hourly {
    time: string[];
    temperature_2m: number[];
    cloud_cover: number[];
    visibility: number[];
    precipitation_probability: number[];
}

export interface Daily {
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
}

export interface CurrentWeather {
    date: string;
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    rain: number;
    snowfall: number;
    wind_speed_10m: number;
    cloud_cover: number;
    wind_direction_10m: number;
}

export interface AqiResponse {
    current: {
        pm10: number
    }
}

export interface WeatherResponse {
    current: CurrentWeather;
    hourly: Hourly;
    daily: Daily
}

export interface TransformedWeather {
    date: string;
    currentTime: string;
    currentTemperature: number;
    humidity: number;
    feelsLike: number;
    rain: number;
    snowfall: number;
    windSpeed: number;
    windDirection: number;
    currentCloudCover: number;
    hourlyCloudCover: number[];
    hourlyTemperature: number[];
    hourlyTime: string[];
    visibility: number;
    sunrise: string;
    sunset: string;
    uvIndex: number;
    hourlyChancesOfRain: number[];
}
