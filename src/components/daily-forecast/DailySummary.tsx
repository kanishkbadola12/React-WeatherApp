import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

interface DailyForecastSummaryProps {
    city: string
    countryCode: string
    rain: number
    feelsLike: number
    windSpeed: number
    humidity: number
    currentTime: string
}

export const DailyForecastSummary: React.FC<DailyForecastSummaryProps> = ({
    city,
    countryCode,
    rain,
    feelsLike,
    windSpeed,
    humidity,
    currentTime
}) => {
    return (
        <Stack spacing={2}>
            <Box display="flex" alignItems="center" gap={1}>
                <LocationOnOutlinedIcon sx={{ fontSize: "2rem" }} />
                <Typography variant="h4">{city},</Typography>
                <Typography variant="h4">{countryCode}</Typography>
            </Box>
            <Stack direction="row" spacing={16}>
                <Stack>
                    <Typography>Chances of Rain</Typography>
                    <Typography>Wind</Typography>
                    <Typography>Feels Like</Typography>
                    <Typography>Humidity</Typography>
                </Stack>
                <Stack>
                    <Typography>{rain} %</Typography>
                    <Typography>{windSpeed} km/h</Typography>
                    <Typography>{feelsLike}{'\u00b0'}</Typography>
                    <Typography>{humidity}%</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" gap={1} justifyContent="end">
                <AccessTimeOutlinedIcon />
                <Typography>{currentTime}</Typography>
            </Stack>
        </Stack>
    )
};

export default DailyForecastSummary;
