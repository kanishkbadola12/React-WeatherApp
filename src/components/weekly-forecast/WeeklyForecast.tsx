import { Box, Grid, Stack, Typography } from "@mui/material";
import { mapDaysToWeather } from "../../utils/mapDaysToWeather";

interface WeeklyForecastProps {
    hourlyTime: string[];
    hourlyTemperature: number[];
    hourlyCloudCover: number[],
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ hourlyTime, hourlyTemperature, hourlyCloudCover }) => {
    return (
        <Stack direction="row" spacing={4}>
            {Object.entries(mapDaysToWeather(hourlyTime, hourlyTemperature, hourlyCloudCover))
                .map(([day, conditions], idx) => (
                    <Grid container spacing={2} key={idx}>
                        <Grid textAlign="center">
                            <Typography variant="body2" color="primary">{day}</Typography>
                            <Typography variant="overline" color="primary">{conditions.cloudCover}</Typography>
                            <Box display="flex" justifyContent="space-around">
                                <Typography variant="button" color="primary">{conditions.lowestTemp}</Typography>
                                <Typography variant="button" color="primary">{conditions.highestTemp}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
        </Stack>
    )
}
