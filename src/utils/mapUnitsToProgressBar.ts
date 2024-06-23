import { CircularProgressProps } from "@mui/material";
import { WeatherFactors } from "../types/weatherType";

interface ProgressCardValue {
    progress: number;
    color: CircularProgressProps['color']
};

interface range {
    min: number;
    max: number;
    data: ProgressCardValue;
};

const getAqiProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 505) * 100)
    const aqiRanges: range[] = [
        { min: 0, max: 55, data: { progress: valuePercentage, color: 'success' } },
        { min: 56, max: 255, data: { progress: valuePercentage, color: 'success' } },
        { min: 256, max: 355, data: { progress: valuePercentage, color: 'warning' } },
        { min: 356, max: 425, data: { progress: valuePercentage, color: 'error' } },
        { min: 426, max: 505, data: { progress: valuePercentage, color: 'error' } },
        { min: 506, max: 1000, data: { progress: valuePercentage, color: 'error' } },
    ];

    const { data } = aqiRanges.find(range => value >= range.min && value < range.max)!;
    return data;
};

const getUVProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 11) * 100);
    const uvRanges: range[] = [
        { min: 1, max: 2, data: { progress: valuePercentage, color: 'success' } },
        { min: 3, max: 5, data: { progress: valuePercentage, color: 'success' } },
        { min: 6, max: 7, data: { progress: valuePercentage, color: 'warning' } },
        { min: 8, max: 10, data: { progress: valuePercentage, color: 'error' } },
        { min: 11, max: 100, data: { progress: valuePercentage, color: 'error' } },
    ];

    const { data } = uvRanges.find(range => value >= range.min && value <= range.max)!;
    return data;
};

const getWindProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 118) * 100);
    const uvRanges: range[] = [
        { min: 1, max: 19, data: { progress: valuePercentage, color: 'success' } },
        { min: 20, max: 49, data: { progress: valuePercentage, color: 'success' } },
        { min: 50, max: 88, data: { progress: valuePercentage, color: 'warning' } },
        { min: 89, max: 117, data: { progress: valuePercentage, color: 'error' } },
        { min: 118, max: 1000, data: { progress: valuePercentage, color: 'error' } },
    ];

    const { data } = uvRanges.find(range => value >= range.min && value <= range.max)!;
    return data;
};

const getHumidityProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 100) * 100);
    const humidityRanges: range[] = [
        { min: 0, max: 30, data: { progress: valuePercentage, color: 'success' } },
        { min: 31, max: 50, data: { progress: valuePercentage, color: 'success' } },
        { min: 51, max: 70, data: { progress: valuePercentage, color: 'warning' } },
        { min: 71, max: 90, data: { progress: valuePercentage, color: 'error' } },
        { min: 91, max: 100, data: { progress: valuePercentage, color: 'error' } },
    ];

    const { data } = humidityRanges.find(range => value >= range.min && value <= range.max)!;
    return data;
};

const getVisibilityProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 30) * 100);
    const humidityRanges: range[] = [
        { min: 11, max: 30, data: { progress: valuePercentage, color: 'success' } },
        { min: 6, max: 10, data: { progress: valuePercentage, color: 'success' } },
        { min: 4, max: 5, data: { progress: valuePercentage, color: 'warning' } },
        { min: 2, max: 3, data: { progress: valuePercentage, color: 'error' } },
        { min: 0, max: 1, data: { progress: valuePercentage, color: 'error' } },
    ];

    const { data } = humidityRanges.find(range => value >= range.min && value <= range.max)!;
    return data;
}

export const mapUnitsToProgressBar = (value: number, factor: WeatherFactors): ProgressCardValue => {
    switch (true) {
        case factor === 'AQI':
            return getAqiProgress(value);
        case factor === 'UV Index':
            return getUVProgress(value);
        case factor === 'Wind Speed':
            return getWindProgress(value);
        case factor === 'Humidity':
            return getHumidityProgress(value);
        case factor === 'Visibility':
            return getVisibilityProgress(value);
        default:
            return { progress: 0, color: 'inherit' };
    }
}