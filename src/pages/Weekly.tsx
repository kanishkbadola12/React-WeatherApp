import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../store/store";
import { useLazyGetForecastQuery } from "../services/forecastApi";
import { WeeklyForecast } from "../components/weekly-forecast/WeeklyForecast";
import { Highlights } from "../components/weekly-forecast/Highlights";

const Weekly: React.FC = () => {
    const coordinates = useAppSelector((state: RootState) => state.coordinates);
    const [getForecast, { data: weather }] = useLazyGetForecastQuery();

    useEffect(() => {
        console.log(coordinates);
        if (coordinates.latitude != null && coordinates.longitude != null) {
            getForecast(coordinates);
        }
    }, [coordinates]);

    return (weather &&
        <Stack gap={6}>
            <WeeklyForecast
                hourlyTime={weather.hourlyTime}
                hourlyTemperature={weather.hourlyTemperature}
                hourlyCloudCover={weather.hourlyCloudCover}
            />
            <Highlights
                uvIndex={weather.uvIndex}
                windSpeed={weather.windSpeed}
                windDirection={weather.windDirection}
                sunrise={weather.sunrise}
                sunset={weather.sunset}
                humidity={weather.humidity}
                visibility={weather.visibility}
            />
        </Stack>
    )
};

export default Weekly;