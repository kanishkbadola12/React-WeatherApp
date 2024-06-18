import { useEffect } from "react";
import { Stack } from "@mui/material";
import DailyForecast from "../components/daily-forecast/DailyForecast";
import HourlyConditions from "../components/daily-forecast/HourlyConditions";
import DailyForecastSummary from "../components/daily-forecast/Summary";
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
    <Stack spacing={6}>
      <Stack direction="row" spacing={4}>
        <DailyForecast
          temperature={weather.temperature2m}
          date={weather.date}
          cloudCover={weather.cloudCover}
        />
        <HourlyConditions
          time={weather.time}
          hourly={weather.hourly}
          hourlyTemperature={weather.hourlyTemperature}
        />
      </Stack>
      <DailyForecastSummary
        city={geoLocation.city}
        countryCode={geoLocation.countryCode}
        rain={weather.rain}
        windSpeed={weather.windSpeed10m}
        feelsLike={weather.apparentTemperature}
        humidity={weather.relativeHumidity2m}
        time={weather.time}
      />
    </Stack>
  )
};

export default Daily;