import React from "react";
import { Stack, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { mapCloudCoverToWeather } from "../../utils/mapCloudCoverToWeather";
import WbSunnyIcon from '@mui/icons-material/WbSunnyOutlined';

interface DailyForecastProps {
    temperature: number
    date: string
    cloudCover: number,
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ temperature, date, cloudCover }) => {
    return (
        <Stack direction="row" spacing={4}>
            <Stack direction="row" spacing={4}>
                <Stack alignItems="center">
                    <Typography color="primary" variant="h2">{temperature}</Typography>
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
                    <Typography color="primary" >{mapCloudCoverToWeather(cloudCover)}</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
};

export default DailyForecast;
