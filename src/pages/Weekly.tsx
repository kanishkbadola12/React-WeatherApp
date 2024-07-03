import { useEffect, useState } from "react";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { RootState } from "../store/store";
import { useLazyGetForecastQuery } from "../services/forecastApi";
import { WeeklyForecast } from "../components/weekly-forecast/WeeklyForecast";
import { Highlights } from "../components/weekly-forecast/Highlights";
import { useLazyGetAirQualityQuery } from "../services/airQualityApi";
import { LoadingIndicator } from "../components/ui/LoadingIndicator";
import { Error } from "../components/ui/Error";
import { setAppHasError, setIsAppLoading, setSelectedTab } from "../store/slices/appState";

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
    const [isComponentLoading, setIsComponentLoading] = useState(true);
    const { isAppLoading, appHasErrors } = useAppSelector((state: RootState) => state.appState);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const coordinates = useAppSelector((state: RootState) => state.coordinates);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (coordinates.latitude != null && coordinates.longitude != null) {
            console.log(coordinates);
            getForecast(coordinates);
            getAirQuality(coordinates);
        }
    }, [coordinates]);

    useEffect(() => {
        if (isForecastFetching && isAqiFetching) {
            setIsComponentLoading(false);
        }
        if (!isForecastFetching && !isAqiFetching && !isComponentLoading) {
            dispatch(setIsAppLoading(false));
            dispatch(setSelectedTab('week'));
        }
    }, [isForecastFetching, isAqiFetching, isComponentLoading]);

    useEffect(() => {
        if (forecastHasError || aqiHasError) {
            dispatch(setAppHasError(true));
        }
    }, [forecastHasError, aqiHasError]);

    if (isAppLoading) {
        return (
            <LoadingIndicator>
                <Typography variant={isXs ? "caption" : "overline"} color="textSecondary">Loading Weekly Weather Data...</Typography>
            </LoadingIndicator>
        )
    }

    if (appHasErrors) {
        return <Error error={forecastError || aqiError} />
    }

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