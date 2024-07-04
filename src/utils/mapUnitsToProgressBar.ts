import { CircularProgressProps } from "@mui/material";
import { WeatherFactors } from "../types/weatherType";
import { useTranslation } from "react-i18next";

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
    const valuePercentage = Math.round((value / 505) * 100);
    const aqiRanges: range[] = [
        { min: 0, max: 56, data: { progress: valuePercentage, color: 'success' } },
        { min: 56, max: 256, data: { progress: valuePercentage, color: 'success' } },
        { min: 256, max: 356, data: { progress: valuePercentage, color: 'warning' } },
        { min: 356, max: 426, data: { progress: valuePercentage, color: 'error' } },
        { min: 426, max: 506, data: { progress: valuePercentage, color: 'error' } },
        { min: 506, max: 1000, data: { progress: valuePercentage, color: 'error' } },
    ];

    const { data } = aqiRanges.find(range => value >= range.min && value < range.max)!;
    return data;
};

const getUVProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 15) * 100);
    const uvRanges: range[] = [
        { min: 1, max: 2, data: { progress: valuePercentage, color: 'success' } },
        { min: 2, max: 5, data: { progress: valuePercentage, color: 'success' } },
        { min: 5, max: 7, data: { progress: valuePercentage, color: 'warning' } },
        { min: 7, max: 10, data: { progress: valuePercentage, color: 'error' } },
        { min: 10, max: 15, data: { progress: valuePercentage, color: 'error' } },
    ];

    const { data } = uvRanges.find(range => value >= range.min && value < range.max)!;
    return data;
};

const getWindProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 118) * 100);
    const windRanges: range[] = [
        { min: 1, max: 20, data: { progress: valuePercentage, color: 'success' } },
        { min: 20, max: 50, data: { progress: valuePercentage, color: 'success' } },
        { min: 50, max: 90, data: { progress: valuePercentage, color: 'warning' } },
        { min: 90, max: 117, data: { progress: valuePercentage, color: 'error' } },
        { min: 117, max: 500, data: { progress: valuePercentage, color: 'error' } },
    ];

    const { data } = windRanges.find(range => value >= range.min && value < range.max)!;
    return data;
};

const getHumidityProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 100) * 100);
    const humidityRanges: range[] = [
        { min: 0, max: 30, data: { progress: valuePercentage, color: 'success' } },
        { min: 30, max: 50, data: { progress: valuePercentage, color: 'success' } },
        { min: 50, max: 70, data: { progress: valuePercentage, color: 'warning' } },
        { min: 70, max: 90, data: { progress: valuePercentage, color: 'error' } },
        { min: 90, max: 100, data: { progress: valuePercentage, color: 'error' } }
    ];

    const { data } = humidityRanges.find(range => value >= range.min && value < range.max)!;
    return data;
};

const getVisibilityProgress = (value: number): ProgressCardValue => {
    const valuePercentage = Math.round((value / 50) * 100);
    const visibilityRanges: range[] = [
        { min: 0, max: 2, data: { progress: valuePercentage, color: 'error' } },
        { min: 2, max: 4, data: { progress: valuePercentage, color: 'error' } },
        { min: 4, max: 6, data: { progress: valuePercentage, color: 'warning' } },
        { min: 6, max: 10, data: { progress: valuePercentage, color: 'success' } },
        { min: 10, max: 50, data: { progress: valuePercentage, color: 'success' } }
    ];

    const { data } = visibilityRanges.find(range => value >= range.min && value < range.max)!;
    return data;
}

export const mapUnitsToProgressBar = (value: number, factor: WeatherFactors): ProgressCardValue => {
    const { t } = useTranslation();

    switch (true) {
        case factor === t('AQI'):
            return getAqiProgress(value);
        case factor === t('UV Index'):
            return getUVProgress(value);
        case factor === t('Wind Speed'):
            return getWindProgress(value);
        case factor === t('Humidity'):
            return getHumidityProgress(value);
        case factor === t('Visibility'):
            return getVisibilityProgress(value);
        default:
            return { progress: 0, color: 'inherit' };
    }
}