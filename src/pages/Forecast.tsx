import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { setCoordinates } from "../store/coordinatesSlice";
import DailyForecastSummary from "../components/daily-forecast/DailyForecastSummary";
import DailyForecastHourly from "../components/daily-forecast/DailyForecastHourly";
import { Container } from "@mui/material";

const Forecast: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setCoordinates({ latitude, longitude }));
        },
        (error) => {
          //error
        }
      );
    } else {
      //error
    }
  }, [dispatch]);


  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <DailyForecastHourly />
      <DailyForecastSummary />
    </Container>
  )
};

export default Forecast;