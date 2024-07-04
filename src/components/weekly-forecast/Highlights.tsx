import { Box, Card, CardContent, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { ProgressCard } from "../ui/ProgressCard";
import { useTranslation } from "react-i18next";

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
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();

    return (
        <Stack>
            <Typography mb={3} variant="h5">{t("Today's Highlights")}</Typography>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                justifyContent={isSm ? "center" : "start"}
            >
                <Grid item>
                    <ProgressCard value={aqi}>
                        <Typography variant="caption">{t('AQI')}</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <ProgressCard value={uvIndex}>
                        <Typography variant="caption">{t('UV Index')}</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <ProgressCard value={windSpeed} unit={t("km/h")}>
                        <Typography variant="caption">{t('Wind Speed')}</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <ProgressCard value={humidity} unit="%">
                        <Typography variant="caption">{t('Humidity')}</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <ProgressCard value={visibility} unit={t("km")}>
                        <Typography variant="caption">{t('Visibility')}</Typography>
                    </ProgressCard>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="caption">{t('Sunrise & Sunset')}</Typography>
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
