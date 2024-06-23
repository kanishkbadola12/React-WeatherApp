import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { ProgressCard } from "../ui/ProgressCard";

interface HighlightsProps {
    uvIndex: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    visibility: number;
    aqi: number
}

export const Highlights: React.FC<HighlightsProps> = ({
    uvIndex,
    windSpeed,
    sunrise,
    sunset,
    humidity,
    visibility,
    aqi
}) => {
    return (
        <Stack>
            <Typography mb={3} variant="h5">Today's Highlights</Typography>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item>
                    <ProgressCard value={aqi}>
                        <Typography variant="caption">AQI</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <ProgressCard value={uvIndex}>
                        <Typography variant="caption">UV Index</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <ProgressCard value={windSpeed} unit="km/h">
                        <Typography variant="caption">Wind Speed</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <ProgressCard value={humidity} unit="%">
                        <Typography variant="caption">Humidity</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <ProgressCard value={visibility} unit="km">
                        <Typography variant="caption">Visibility</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="caption">Sunrise & Sunset</Typography>
                            <Box display="flex" flexDirection="column" gap={1}>
                                <Box display="flex" gap={1}>
                                    <WbSunnyIcon style={{ alignSelf: "end", paddingBottom: "6px", color: "#ffd60a" }} />
                                    <Typography variant="h4">{sunrise}</Typography>
                                </Box>
                                <Box display="flex" gap={1}>
                                    <WbTwilightIcon style={{ alignSelf: "end", paddingBottom: "6px", color: "#fb5607" }} />
                                    <Typography variant="h4">{sunset}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Stack >
    )
}
