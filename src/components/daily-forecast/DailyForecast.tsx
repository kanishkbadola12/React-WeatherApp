import React from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { mapUnitsToWeather } from "../../utils/mapUnitsToWeather";
import { useTranslation } from "react-i18next";

interface DailyForecastProps {
    currentTemperature: number;
    date: string;
    currentCloudCover: number;
    chancesOfRain: number;
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
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);

        return {
            day: t(date.toLocaleDateString('en-US', { weekday: 'long' })),
            month: t(date.toLocaleString('default', { month: 'long' })),
            date: date.getDate()
        }
    }

    return (
        <Box
            display="flex"
            flexDirection={isSm ? "column" : "row"}
            justifyContent="center"
            gap={5}
        >
            <Stack flexBasis="15%" alignItems="center">
                <Typography variant="h2" paddingLeft={3}>{currentTemperature}{'\u00b0'}</Typography>
                <Stack direction="row" minWidth={isMd ? "15vw" : "0"} spacing={0.5}>
                    {Object.values(formatDate(date)).map((date, idx) => (
                        <Typography key={idx}>
                            {date}{idx == 0 ? ',' : ''}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
            <Stack justifyContent="end" alignItems="center" gap={1}>
                <Box display="flex" fontSize="4.5rem">{icon}</Box>
                <Typography variant="caption">{t(condition)}</Typography>
            </Stack>
        </Box>
    )
};

export default DailyForecast;
