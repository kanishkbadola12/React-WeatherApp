import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { setCoordinates } from "../store/coordinatesSlice";
import DailyForeCastSummary from "../components/daily-forecast/DailyForecastSummary";

const Forecast: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setCoordinates({latitude, longitude}));
        },
        (error) => {
          //error
        }
      );
    } else {
      //error
    }
  }, [dispatch]);


  return <>
    <DailyForeCastSummary />
  </>
};

export default Forecast;