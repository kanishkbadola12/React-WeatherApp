import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { mapDaysToWeather } from "../../utils/mapDaysToWeather";

interface WeeklyForecastProps {
    hourlyTime: string[];
    hourlyTemperature: number[];
    hourlyCloudCover: number[],
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ hourlyTime, hourlyTemperature, hourlyCloudCover }) => {
    return (
        <Grid container rowSpacing={2} columnSpacing={2}>
            {Object.entries(mapDaysToWeather(hourlyTime, hourlyTemperature, hourlyCloudCover))
                .map(([day, forecast], idx) => (
                    <Grid item key={idx}>
                        <Card>
                            <CardContent>
                                <Typography>{day}</Typography>
                                <Stack gap="4px">
                                    {forecast.icon}
                                    <Typography variant="caption">{forecast.cloudCover}</Typography>
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
