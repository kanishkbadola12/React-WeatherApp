import React from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { mapUnitsToWeather } from "../../utils/mapUnitsToWeather";

interface DailyForecastProps {
    currentTemperature: number;
    date: string;
    currentCloudCover: number;
    chancesOfRain: number;
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
    const { icon, condition } = mapUnitsToWeather(currentCloudCover, chancesOfRain);

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            display="flex"
            flexDirection={isSm ? "column" : "row"}
            justifyContent="center"
            gap={5}
        >
            <Stack flexBasis="15%" alignItems="center">
                <Typography variant="h2" marginLeft={isSm ? "30px" : "0"}>{currentTemperature}{'\u00b0'}</Typography>
                <Stack direction="row" spacing={0.5}>
                    {Object.values(formatDate(date)).map((date, idx) => (
                        <Typography key={idx}>
                            {date}{idx == 0 ? ',' : ''}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
            <Stack justifyContent="end" alignItems="center" gap={1}>
                <Box display="flex" fontSize="4.5rem">{icon}</Box>
                <Typography variant="caption">{condition}</Typography>
            </Stack>
        </Box>
    )
};

export default DailyForecast;
