import { useEffect, useState } from "react";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import DailyForecast from "../components/daily-forecast/DailyForecast";
import DailyForecastSummary from "../components/daily-forecast/DailySummary";
import HourlyForecast from "../components/daily-forecast/HourlyForecast";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { RootState } from "../store/store";
import { useLazyGetForecastQuery } from "../services/forecastApi";
import { useLazyGetGeoLocationQuery } from "../services/geoLocationApi";
import { LoadingIndicator } from "../components/ui/LoadingIndicator";
import { Error } from "../components/ui/Error";
import { setAppLoading } from "../store/slices/appLoading";

const Daily: React.FC = () => {
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
    getLocation,
    {
      data: geoLocation,
      isFetching: isLocationFetching,
      isError: locationHasError,
      error: locationError
    }
  ] = useLazyGetGeoLocationQuery();
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const coordinates = useAppSelector((state: RootState) => state.coordinates);
  const { isAppLoading } = useAppSelector((state: RootState) => state.isAppLoading);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (coordinates.latitude != null && coordinates.longitude != null) {
      console.log(coordinates);
      getForecast(coordinates);
      getLocation(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    if (isForecastFetching && isLocationFetching) {
      setIsComponentLoading(true);
    }
    if (!isForecastFetching && !isLocationFetching && isComponentLoading) {
      dispatch(setAppLoading(false));
    }
  }, [isForecastFetching, isLocationFetching, isComponentLoading]);

  if (isAppLoading) {
    return (
      <LoadingIndicator>
        <Typography variant={isXs ? "caption" : "overline"} color="textSecondary">Loading Daily Weather Data...</Typography>
      </LoadingIndicator>
    )
  }

  if (forecastHasError || locationHasError) {
    return <Error error={locationError || forecastError} />
  }

  return (
    weather && geoLocation &&
    <Stack gap={6}>
      <Stack direction={isMd ? "column" : "row"} gap={4}>
        <DailyForecast
          currentTemperature={weather.currentTemperature}
          date={weather.date}
          currentCloudCover={weather.currentCloudCover}
          chancesOfRain={weather.hourlyChancesOfRain[0]}
        />
        <HourlyForecast
          currentTime={weather.currentTime}
          hourlyTime={weather.hourlyTime}
          hourlyTemperature={weather.hourlyTemperature}
          chancesOfRain={weather.hourlyChancesOfRain}
          cloudCover={weather.hourlyCloudCover}
        />
      </Stack>
      <DailyForecastSummary
        city={geoLocation.city}
        countryCode={geoLocation.country_code.toUpperCase()}
        rain={weather.rain}
        windSpeed={weather.windSpeed}
        feelsLike={weather.feelsLike}
        humidity={weather.humidity}
        currentTime={weather.currentTime}
        chancesOfRain={weather.hourlyChancesOfRain[0]}
      />
    </Stack>
  )
};

export default Daily;