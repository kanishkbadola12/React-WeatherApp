import { useEffect } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import DailyForecast from "../components/daily-forecast/DailyForecast";
import DailyForecastSummary from "../components/daily-forecast/DailySummary";
import HourlyForecast from "../components/daily-forecast/HourlyForecast";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../store/store";
import { useLazyGetForecastQuery } from "../services/forecastApi";
import { useLazyGetGeoLocationQuery } from "../services/geoLocationApi";

const Daily: React.FC = () => {
  const coordinates = useAppSelector((state: RootState) => state.coordinates);
  const [getForecast, { data: weather }] = useLazyGetForecastQuery();
  const [getLocation, { data: geoLocation }] = useLazyGetGeoLocationQuery();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    console.log(coordinates);
    if (coordinates.latitude != null && coordinates.longitude != null) {
      getForecast(coordinates);
      getLocation(coordinates);
    }
  }, [coordinates]);

  return (weather && geoLocation &&
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
        countryCode={geoLocation.countryCode}
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