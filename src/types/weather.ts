export interface Coordinates {
    latitude: number | null;
    longitude: number | null;
}

export interface LocationResponse {
    city: string;
}

export interface GeoLocationResponse {
    results: Coordinates[];
}

export interface WeatherResponse {
    current: CurrentWeather;
}

export interface CurrentWeather {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    cloud_cover: number;
    apparent_temperature: number;
    rain: number;
    snowfall: number;
    wind_speed_10m: number;
}

