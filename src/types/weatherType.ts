export interface Coordinates {
    latitude: number | null;
    longitude: number | null;
}

export interface LocationResponse {
    city: string;
    countryCode: string
}

interface Hourly {
    time: string[];
    temperature_2m: number[];
}

export interface GeoLocationResponse {
    results: Coordinates[];
}

export interface WeatherResponse {
    current: CurrentWeather;
    hourly: Hourly;
}

export interface CurrentWeather {
    date: string;
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    cloud_cover: number;
    apparent_temperature: number;
    rain: number;
    snowfall: number;
    wind_speed_10m: number;
    hourly: string[];
    hourlyTemperature: number[]
}

