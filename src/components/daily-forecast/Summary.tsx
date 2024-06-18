import React from "react";
import { Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

interface DailyForecastSummaryProps {
    city: string
    countryCode: string
    rain: number
    feelsLike: number
    windSpeed: number
    humidity: number
    time: string
}

export const DailyForecastSummary: React.FC<DailyForecastSummaryProps> = ({
    city,
    countryCode,
    rain,
    feelsLike,
    windSpeed,
    humidity,
    time
}) => {
    return (
        <Stack spacing={2}>
            <Stack direction="row" display="flex" alignItems="center" spacing={1}>
                <LocationOnOutlinedIcon sx={{ fontSize: "2rem" }} />
                <Typography color="primary" variant="h4">{city},</Typography>
                <Typography color="primary" variant="h4">{countryCode}</Typography>
            </Stack>
            <Stack direction="row" spacing={16}>
                <Stack>
                    <Typography>Chances of Rain</Typography>

                    <Typography color="primary">Wind</Typography>
                    <Typography color="primary">Feels Like</Typography>
                    <Typography color="primary">Humidity</Typography>
                </Stack>
                <Stack>
                    <Typography color="primary">{rain} %</Typography>
                    <Typography color="primary">{windSpeed} km/h</Typography>
                    <Typography color="primary">{feelsLike}</Typography>
                    <Typography color="primary">{humidity}</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" gap={1} justifyContent="end">
                <AccessTimeOutlinedIcon />
                <Typography color="primary">{time}</Typography>
            </Stack>
        </Stack>
    )
};

export default DailyForecastSummary;
