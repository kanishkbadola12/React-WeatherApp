import React from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useTranslation } from "react-i18next";

interface DailyForecastSummaryProps {
    city: string;
    countryCode: string;
    rain: number;
    feelsLike: number;
    windSpeed: number;
    humidity: number;
    currentTime: string;
    chancesOfRain: number;
}

export const DailyForecastSummary: React.FC<DailyForecastSummaryProps> = ({
    city,
    countryCode,
    feelsLike,
    windSpeed,
    humidity,
    currentTime,
    chancesOfRain
}) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();

    return (
        <Box>
            <Stack spacing={2} alignItems={isSm ? "center" : "start"}>
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <LocationOnOutlinedIcon sx={{ fontSize: "2rem", color: "#ef233c" }} />
                    <Typography variant="h4">{city}, {countryCode}</Typography>
                </Box>
                <Stack
                    direction="row"
                    spacing={isSm ? 8 : 16}
                    paddingLeft="30px"
                >
                    <Stack gap={1}>
                        <Typography>{t('Chances of Rain')}</Typography>
                        <Typography>{t('Wind')}</Typography>
                        <Typography>{t('Feels Like')}</Typography>
                        <Typography>{t('Humidity')}</Typography>
                    </Stack>
                    <Stack gap={1}>
                        <Typography>{chancesOfRain} %</Typography>
                        <Typography>{windSpeed}{t('km/h')}</Typography>
                        <Typography>{feelsLike}{'\u00b0'}</Typography>
                        <Typography>{humidity}%</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Box
                position="relative"
                display="flex"
                flexDirection="row"
                mt={4}
                gap={1}
                justifyContent={isSm ? "center" : "end"}
            >
                <AccessTimeOutlinedIcon style={{ color: "#3a506b" }} />
                <Typography>{currentTime}</Typography>
            </Box>
        </Box>
    )
};

export default DailyForecastSummary;
