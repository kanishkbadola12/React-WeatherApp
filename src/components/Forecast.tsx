import React, { useEffect, useRef, useState } from "react";
// import DailyForeCastSummary from "./DailyForecastSummary";
import { Button, TextField } from "@mui/material";
import { Coordinates } from "../types/weather";
import {
  useLazyGetGeoLocationQuery,
  useLazyGetCoordinatesQuery,
  useLazyGetForecastQuery,
} from "../services/weatherApi";

const Forecast: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const [
    getWeather,
    { data: weather, error: weatherHasError, isLoading: isWeatherLoading },
  ] = useLazyGetForecastQuery();

  const [
    getCoordinates,
    { error: coordinateHasError, isLoading: isCoordinateLoading },
  ] = useLazyGetCoordinatesQuery();

  const [
    getLocation,
    { data: geoLocation, error: locationHasError, isLoading: islocationLoading },
  ] = useLazyGetGeoLocationQuery();

  const handleLocationSearch = async (): Promise<void> => {
    const response = await getCoordinates(inputRef.current!.value);

    if (response) {
      const { latitude, longitude } = response.data.results[0];
      setCoordinates({ latitude, longitude });
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          console.log(error.PERMISSION_DENIED);
        }
      );
    } else {
      /* geolocation IS NOT available */
    }
  }, []);

  useEffect(() => {
    if (coordinates) {
      getLocation(coordinates);
      getWeather(coordinates);
    }
  }, [coordinates]);

  return (
    <>
      {coordinateHasError && <p>Error</p>}
      <TextField
        id="outlined-multiline-flexible"
        label="Search for places..."
        inputRef={inputRef}
      />
      <Button onClick={handleLocationSearch} variant="contained">
        Send
      </Button>
      <p>{geoLocation && geoLocation.city}</p>
      <p>{weather && weather.current.temperature_2m}</p>
    </>
  );
};

export default Forecast;
