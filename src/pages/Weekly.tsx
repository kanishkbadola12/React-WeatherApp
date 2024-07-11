import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { RootState } from "../store/store";
import { useLazyGetForecastQuery } from "../services/forecastApi";
import { WeeklyForecast } from "../components/weekly-forecast/WeeklyForecast";
import { Highlights } from "../components/weekly-forecast/Highlights";
import { useLazyGetAirQualityQuery } from "../services/airQualityApi";
import { setAppHasError, setErrorText, setIsAppLoading, setLoadingText, setSelectedTab } from "../store/slices/appState";

const Weekly: React.FC = () => {
    const [
        getForecast,
        {
            data: weather,
            isFetching: isForecastFetching,
            isError: forecastHasError,
            error: forecastError
        }
    ] = useLazyGetForecastQuery();
    const [
        getAirQuality,
        {
            data: aqi,
            isFetching: isAqiFetching,
            isError: aqiHasError,
            error: aqiError
        }
    ] = useLazyGetAirQualityQuery();
    const coordinates = useAppSelector((state: RootState) => state.coordinates);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSelectedTab('week'));
        if (coordinates.latitude != null && coordinates.longitude != null) {
            console.log(coordinates);
            getForecast(coordinates);
            getAirQuality(coordinates);
        }
    }, [coordinates]);

    useEffect(() => {
        dispatch(setIsAppLoading(isForecastFetching || isAqiFetching));
        dispatch(setLoadingText('Loading Weekly Weather Data'));
    }, [isForecastFetching, isAqiFetching]);

    useEffect(() => {
        dispatch(setAppHasError(forecastHasError || aqiHasError));
        dispatch(setErrorText(forecastError || aqiError || ''));
    }, [forecastHasError, aqiHasError]);

    return (weather && aqi &&
        <Stack mt={2} gap={6}>
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