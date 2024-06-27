import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { mapDaysToWeather } from "../../utils/mapDaysToWeather";
import { useMemo } from "react";
import { WeeklyConditions } from "../../types/weatherType";

interface WeeklyForecastProps {
    hourlyTime: string[];
    hourlyTemperature: number[];
    hourlyCloudCover: number[];
    hourlyChancesOfRain: number[];
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ hourlyTime, hourlyTemperature, hourlyCloudCover, hourlyChancesOfRain }) => {
    const weeklyForecast: Record<string, WeeklyConditions> = useMemo(() => {
        return mapDaysToWeather(hourlyTime, hourlyTemperature, hourlyCloudCover, hourlyChancesOfRain);
    }, [hourlyTime, hourlyTemperature, hourlyCloudCover, hourlyChancesOfRain]);

    return (
        <Grid container rowSpacing={2} columnSpacing={2}>
            {Object.entries(weeklyForecast).map(([day, forecast], idx) => (
                <Grid item key={idx}>
                    <Card>
                        <CardContent>
                            <Typography>{day}</Typography>
                            <Stack alignItems="center" gap="4px">
                                <Box fontSize="3rem">{forecast.weather.icon}</Box>
                                <Typography variant="caption">{forecast.weather.condition}</Typography>
                            </Stack>
                            <Box display="flex" gap={2}>
                                <Box display="flex" alignItems="end" gap="2px">
                                    <Typography pb="2px" variant="caption">L:</Typography>
                                    <Typography>{forecast.lowestTemp}{'\u00b0'}</Typography>
                                </Box>
                                <Box display="flex" alignItems="end" gap="2px">
                                    <Typography pb="2px" variant="caption">H:</Typography>
                                    <Typography>{forecast.highestTemp}{'\u00b0'}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
