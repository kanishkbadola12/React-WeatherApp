import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { mapUnitsToWeather } from "../../utils/mapUnitsToWeather";

interface DailyForecastProps {
    currentTemperature: number;
    date: string;
    currentCloudCover: number;
    chancesOfRain: number[];
}

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return {
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        month: date.toLocaleString('default', { month: 'long' }),
        date: date.getDate()
    }
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
    currentTemperature,
    date,
    currentCloudCover,
    chancesOfRain
}) => {
    const { icon, condition } = mapUnitsToWeather(currentCloudCover, chancesOfRain[0]);

    return (
        <>
            <Stack flexBasis="15%" alignItems="center">
                <Typography variant="h2">{currentTemperature}{'\u00b0'}</Typography>
                <Stack direction="row" spacing={0.5}>
                    {Object.values(formatDate(date)).map((date, idx) => (
                        <Typography key={idx}>
                            {date}{idx == 0 ? ',' : ''}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
            <Stack flexBasis="10%" alignItems="center" justifyContent="end" gap={1}>
                <Box>{icon}</Box>
                <Typography variant="caption">{condition}</Typography>
            </Stack>
        </>
    )
};

export default DailyForecast;
