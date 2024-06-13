import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { useLazyGetForecastQuery } from "../../services/forecastApi";
import { useLazyGetGeoLocationQuery } from "../../services/geoLocationApi";
import { Stack, Typography } from "@mui/material";

export const DailyForeCastSummary: React.FC = () => {
    const coordinates = useAppSelector((state: RootState) => state.coordinates);
    const [getForecast, { data: weather }] = useLazyGetForecastQuery();
    const [getLocation, { data: geoLocation }] = useLazyGetGeoLocationQuery();

    console.log(coordinates);

    useEffect(() => {
        if (coordinates.latitude != null && coordinates.longitude != null) {
            getForecast(coordinates);
            getLocation(coordinates);
        }
    }, [coordinates]);

    return geoLocation && weather && (
        <Stack spacing={4}>
            <Stack direction="row" spacing={1}>
                <Typography>{geoLocation.city},</Typography>
                <Typography>{geoLocation.countryCode}</Typography>
            </Stack>
            <Stack direction="row" spacing={10}>
                <Stack>
                    <Typography>Humidity</Typography>
                    <Typography>Chances of Rain</Typography>
                    <Typography>Feels Like</Typography>
                    <Typography>Wind</Typography>
                </Stack>
                <Stack>
                    <Typography>{weather.rain} %</Typography>
                    <Typography>{weather.windSpeed10m} km/h</Typography>
                    <Typography>{weather.apparentTemperature}</Typography>
                    <Typography>{weather.relativeHumidity2m}</Typography>
                </Stack>
            </Stack>
            <Typography>{weather.time}</Typography>
        </Stack>
    )
};

export default DailyForeCastSummary;
