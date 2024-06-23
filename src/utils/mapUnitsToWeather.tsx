import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faCloud, faCloudRain, faCloudShowersHeavy, faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons/faCloudSun";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeatherState } from "../types/weatherType";

export const mapUnitsToWeather = (cloudCover: number, chancesOfRain: number): {
    icon: JSX.Element,
    condition: string
} => {
    const weatherIcons = {
        'No rain & Clear': { icon: faSun, condition: 'Clear', color: '#00BFFF' },
        'No rain & Partly Cloudy': { icon: faCloudSun, condition: 'Partly Cloudy', color: '#87CEEB' },
        'No rain & Mostly Cloudy': { icon: faCloud, condition: 'Mostly Cloudy', color: '#A9A9A9' },
        'No rain & Overcast': { icon: faCloud, condition: 'Overcast', color: '#696969' },
        'Light rain & Clear': { icon: faSun, condition: 'Clear', color: '#00BFFF' },
        'Light rain & Partly Cloudy': { icon: faCloudSunRain, condition: 'Partly Cloudy', color: '#87CEEB' },
        'Light rain & Mostly Cloudy': { icon: faCloudRain, condition: 'Mostly Cloudy', color: '#A9A9A9' },
        'Light rain & Overcast': { icon: faCloudRain, condition: 'Overcast', color: '#696969' },
        'Moderate rain & Clear': { icon: faCloudSunRain, condition: 'Clear', color: '#4682B4' },
        'Moderate rain & Partly Cloudy': { icon: faCloudSunRain, condition: 'Partly Cloudy', color: '#87CEEB' },
        'Moderate rain & Mostly Cloudy': { icon: faCloudRain, condition: 'Mostly Cloudy', color: '#A9A9A9' },
        'Moderate rain & Overcast': { icon: faCloudRain, condition: 'Overcast', color: '#696969' },
        'Heavy rain & Clear': { icon: faSun, condition: 'Clear', color: '#00BFFF' },
        'Heavy rain & Partly Cloudy': { icon: faCloudShowersHeavy, condition: 'Partly Cloudy', color: '#87CEEB' },
        'Heavy rain & Mostly Cloudy': { icon: faCloudShowersHeavy, condition: 'Mostly Cloudy', color: '#1E90FF' },
        'Heavy rain & Overcast': { icon: faCloudShowersHeavy, condition: 'Overcast', color: '#00008B' }
    };
    const chancesOfRainRanges = [
        { min: 0, max: 10, rainState: 'No rain' },
        { min: 10, max: 30, rainState: 'Light rain' },
        { min: 30, max: 60, rainState: 'Moderate rain' },
        { min: 60, max: 100, rainState: 'Heavy rain' },
    ];
    const cloudCoverRanges = [
        { min: 0, max: 10, cloudCoverState: 'Clear' },
        { min: 11, max: 50, cloudCoverState: 'Partly Cloudy' },
        { min: 51, max: 89, cloudCoverState: 'Mostly Cloudy' },
        { min: 90, max: 100, cloudCoverState: 'Overcast' },
    ];

    const { rainState } = chancesOfRainRanges.find(range => chancesOfRain >= range.min && chancesOfRain < range.max)!;
    const { cloudCoverState } = cloudCoverRanges.find(range => cloudCover >= range.min && cloudCover < range.max)!;
    const weatherState = (rainState + ' & ' + cloudCoverState) as WeatherState;
    const weather = weatherIcons[weatherState];

    return {
        icon: <FontAwesomeIcon fontSize="3rem" color={weather.color} icon={weather.icon} />,
        condition: weather.condition
    }
}