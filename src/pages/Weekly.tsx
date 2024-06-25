import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../store/store";
import { useLazyGetForecastQuery } from "../services/forecastApi";
import { WeeklyForecast } from "../components/weekly-forecast/WeeklyForecast";
import { Highlights } from "../components/weekly-forecast/Highlights";
import { useLazyGetAirQualityQuery } from "../services/airQualityApi";

const Weekly: React.FC = () => {
    const coordinates = useAppSelector((state: RootState) => state.coordinates);
    const [getForecast, { data: weather }] = useLazyGetForecastQuery();
    const [getAirQuality, { data: aqi }] = useLazyGetAirQualityQuery();

    useEffect(() => {
        console.log(coordinates);
        if (coordinates.latitude != null && coordinates.longitude != null) {
            getForecast(coordinates);
            getAirQuality(coordinates);
        }
    }, [coordinates]);

    return (weather && aqi &&
        <Stack gap={6}>
            <WeeklyForecast
                hourlyTime={weather.hourlyTime}
                hourlyTemperature={weather.hourlyTemperature}
                hourlyCloudCover={weather.hourlyCloudCover}
                hourlyChancesOfRain={weather.hourlyChancesOfRain}
            />
            <Highlights
                uvIndex={weather.uvIndex}
                windSpeed={weather.windSpeed}
                sunrise={weather.sunrise}
                sunset={weather.sunset}
                humidity={weather.humidity}
                visibility={weather.visibility}
                aqi={aqi}
            />
        </Stack>
    )
};

export default Weekly;