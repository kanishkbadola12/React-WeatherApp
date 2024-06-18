import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../store/store";
import { useLazyGetForecastQuery } from "../services/forecastApi";
import { WeeklyForecast } from "../components/weekly-forecast/WeeklyForecast";

const Weekly: React.FC = () => {
    const coordinates = useAppSelector((state: RootState) => state.coordinates);
    const [getForecast, { data: weather }] = useLazyGetForecastQuery();

    useEffect(() => {
        console.log(coordinates);
        if (coordinates.latitude != null && coordinates.longitude != null) {
            getForecast(coordinates);
        }
    }, [coordinates]);

    return (weather &&
        <Stack>
            <WeeklyForecast />
        </Stack>
    )
};

export default Weekly;