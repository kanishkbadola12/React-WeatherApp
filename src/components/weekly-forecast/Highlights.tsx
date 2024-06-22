import { Box, Card, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

interface HighlightsProps {
    uvIndex: number;
    windSpeed: number;
    windDirection: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    visibility: number;
}

export const Highlights: React.FC<HighlightsProps> = ({
    uvIndex,
    windSpeed,
    windDirection,
    sunrise,
    sunset,
    humidity,
    visibility
}) => {
    return (
        <Stack>
            <Typography mb={3} variant="h5">Today's Highlights</Typography>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="caption">UV index</Typography>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <CircularProgress variant="determinate" value={uvIndex * 10} />
                                <Box>
                                    <Typography variant="h3">{uvIndex}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="caption">Wind Status</Typography>
                            <Box display="flex" alignItems="end">
                                <Typography variant="h3">{windSpeed}</Typography>
                                <Typography pb="7px" variant="caption">km/h</Typography>
                            </Box>
                            <Typography>{windDirection}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="caption">Sunrise & Sunset</Typography>
                            <Box>
                                <Box display="flex" gap={1}>
                                    <WbSunnyIcon />
                                    <Typography>{sunrise}</Typography>
                                </Box>
                                <Box display="flex" gap={1}>
                                    <WbTwilightIcon />
                                    <Typography>{sunset}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="caption">Humidity</Typography>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <CircularProgress variant="determinate" value={humidity} />
                                <Box>
                                    <Typography variant="h3">{humidity}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="caption">Visibility</Typography>
                            <Box display="flex" alignItems="end">
                                <Typography variant="h3">{visibility}</Typography>
                                <Typography pb="7px" variant="caption">km</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Stack >
    )
}
