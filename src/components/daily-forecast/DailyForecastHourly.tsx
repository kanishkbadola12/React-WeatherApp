import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { useLazyGetForecastQuery } from "../../services/forecastApi";
import { mapTimeToTemperature } from "../../utils/mapTimeToTemperature";
import { Box, Stack, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { mapCloudCoverToWeather } from "../../utils/mapCloudCoverToWeather";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const DailyForecastHourly: React.FC = () => {
    const coordinates = useAppSelector((state: RootState) => state.coordinates);
    const [getForecast, { data: weather }] = useLazyGetForecastQuery();

    const handleScrollLeft = () => {
        document.getElementById('weatherSlider')!.scrollLeft -= 300;
    }

    const handleScrollRight = () => {
        document.getElementById('weatherSlider')!.scrollLeft += 300;

    }

    useEffect(() => {
        if (coordinates.latitude != null && coordinates.longitude != null) {
            getForecast(coordinates);
        }
    }, [coordinates]);

    return weather && (
        <Stack direction="row" spacing={4}>
            <Stack direction="row" spacing={4}>
                <Stack alignItems="center">
                    <Typography variant="h2">{weather.temperature2m}</Typography>
                    <Stack direction="row" spacing={0.5}>
                        {Object.values(formatDate(weather.date)).map((date, idx) => (
                            <Typography key={idx}>
                                {date}{idx == 0 ? ',' : ''}
                            </Typography>
                        ))}
                    </Stack>
                </Stack>
                <Stack spacing={1} alignItems="center" justifyContent="end">
                    <WbSunnyIcon sx={{ fontSize: "3.5rem" }} />
                    <Typography >{mapCloudCoverToWeather(weather.cloudCover)}</Typography>
                </Stack>
            </Stack>
            <Box sx={{ background: "beige" }} display="flex" alignItems="center" onClick={handleScrollLeft}>
                <ArrowBackIosNewIcon sx={{
                    fontSize: "3.5rem",
                    cursor: "pointer",
                }} />
            </Box>
            <Stack
                id="weatherSlider"
                direction="row"
                spacing={4}
                alignItems="center"
                sx={{
                    textAlign: "center",
                    width: "80vw",
                    overflowX: "hidden",
                    scrollBehavior: "smooth"
                }}
            >
                {Object.entries(mapTimeToTemperature(
                    weather.time,
                    weather.hourly.slice(0, 24),
                    weather.hourlyTemperature.slice(0, 24)
                )).map((timeAndTemperature, idx) => (
                    <Box key={idx}>
                        <Typography sx={{ fontSize: "1.25rem" }}>{timeAndTemperature[0]}</Typography>
                        <Typography sx={{ fontSize: "1.25rem" }}>{timeAndTemperature[1]}</Typography>
                    </Box>
                ))}
            </Stack>
            <Box sx={{ background: "beige" }} display="flex" alignItems="center" onClick={handleScrollRight}>
                <ArrowForwardIosIcon sx={{
                    fontSize: "3.5rem",
                    cursor: "pointer"
                }} />
            </Box>
        </Stack>
    )
};

export default DailyForecastHourly;
