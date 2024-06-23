import { useEffect } from "react";
import { Stack } from "@mui/material";
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

  useEffect(() => {
    console.log(coordinates);
    if (coordinates.latitude != null && coordinates.longitude != null) {
      getForecast(coordinates);
      getLocation(coordinates);
    }
  }, [coordinates]);

  return (weather && geoLocation &&
    <Stack gap={6}>
      <Stack direction="row" gap={4}>
        <DailyForecast
          currentTemperature={weather.currentTemperature}
          date={weather.date}
          currentCloudCover={weather.currentCloudCover}
          chancesOfRain={weather.chancesOfRain}
        />
        <HourlyForecast
          currentTime={weather.currentTime}
          hourlyTime={weather.hourlyTime}
          hourlyTemperature={weather.hourlyTemperature}
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
      />
    </Stack>
  )
};

export default Daily;