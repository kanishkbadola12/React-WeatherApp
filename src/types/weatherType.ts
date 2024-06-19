export interface Coordinates {
    latitude: number | null;
    longitude: number | null;
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
}

export interface WeatherResponse {
    current: CurrentWeather;
    hourly: Hourly;
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
    currentCloudCover: number;
    hourlyCloudCover: number[],
    hourlyTemperature: number[],
    hourlyTime: string[]
}

