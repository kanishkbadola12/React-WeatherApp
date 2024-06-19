import React from "react";
import { Stack, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { mapCurrentCloudCoverToWeather } from "../../utils/mapCloudCoverToWeather";
import WbSunnyIcon from '@mui/icons-material/WbSunnyOutlined';

interface DailyForecastProps {
    currentTemperature: number
    date: string
    currentCloudCover: number
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ currentTemperature, date, currentCloudCover }) => {
    return (
        <Stack direction="row" spacing={4}>
            <Stack direction="row" spacing={4}>
                <Stack alignItems="center">
                    <Typography color="primary" variant="h2">{currentTemperature}</Typography>
                    <Stack direction="row" spacing={0.5}>
                        {Object.values(formatDate(date)).map((date, idx) => (
                            <Typography key={idx}>
                                {date}{idx == 0 ? ',' : ''}
                            </Typography>
                        ))}
                    </Stack>
                </Stack>
                <Stack spacing={1} alignItems="center" justifyContent="end">
                    <WbSunnyIcon color="primary" sx={{ fontSize: "3.5rem" }} />
                    <Typography color="primary" >{mapCurrentCloudCoverToWeather(currentCloudCover)}</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
};

export default DailyForecast;
