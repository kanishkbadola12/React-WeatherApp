import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { mapCurrentCloudCoverToWeather } from "../../utils/mapCloudCoverToWeather";

interface DailyForecastProps {
    currentTemperature: number
    date: string
    currentCloudCover: number
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ currentTemperature, date, currentCloudCover }) => {
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
                <Box>{mapCurrentCloudCoverToWeather(currentCloudCover).icon}</Box>
                <Typography variant="caption"   >{mapCurrentCloudCoverToWeather(currentCloudCover).text}</Typography>
            </Stack>
        </>
    )
};

export default DailyForecast;
