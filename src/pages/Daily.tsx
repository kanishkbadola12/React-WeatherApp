import { useEffect } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import DailyForecast from "../components/daily-forecast/DailyForecast";
import DailyForecastSummary from "../components/daily-forecast/DailySummary";
import HourlyForecast from "../components/hourly-forecast/HourlyForecast";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { RootState } from "../store/store";
import { useLazyGetForecastQuery } from "../services/forecastApi";
import { useLazyGetGeoLocationQuery } from "../services/geoLocationApi";
import { setAppHasError, setErrorText, setIsAppLoading, setLoadingText, setSelectedTab } from "../store/slices/appState";

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
      data: location,
      isFetching: isLocationFetching,
      isError: locationHasError,
      error: locationError
    }
  ] = useLazyGetGeoLocationQuery();
  const coordinates = useAppSelector((state: RootState) => state.coordinates);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedTab('today'));
    if (coordinates.latitude != null && coordinates.longitude != null) {
      console.log(coordinates);
      getForecast(coordinates);
      getLocation(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    dispatch(setIsAppLoading(isForecastFetching || isLocationFetching));
    dispatch(setLoadingText('Loading Daily Weather Data'));
  }, [isForecastFetching, isLocationFetching]);

  useEffect(() => {
    dispatch(setAppHasError(forecastHasError || locationHasError));
    dispatch(setErrorText(locationError || forecastError || ''));
  }, [forecastHasError, locationHasError]);

  return (
    weather && location &&
    <Stack gap={4}>
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
        city={location.city}
        countryCode={location.country_code.toUpperCase()}
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