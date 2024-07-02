import { Box, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { mapTimeToTemperature } from "../../utils/mapHoursToWeather";

interface HourlyForecastProps {
    currentTime: string;
    hourlyTime: string[];
    hourlyTemperature: number[];
    cloudCover: number[];
    chancesOfRain: number[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({
    currentTime,
    hourlyTime,
    hourlyTemperature,
    cloudCover,
    chancesOfRain
}) => {
    const handleScrollLeft = () => {
        const slider = document.getElementById('weatherSlider')!;
        const scrollWidth = slider.getBoundingClientRect().width;
        slider.scrollLeft -= scrollWidth;
    }

    const handleScrollRight = () => {
        const slider = document.getElementById('weatherSlider')!;
        const scrollWidth = slider.getBoundingClientRect().width;
        slider.scrollLeft += scrollWidth;
    }

    return (
        <Stack direction="row" alignItems="center" overflow="hidden" flexBasis="70%">
            <Box pr="1rem" onClick={handleScrollLeft}>
                <ArrowBackIosNewIcon sx={{ fontSize: "4rem", cursor: "pointer", color: "#3a506b" }} />
            </Box>
            <Box
                id="weatherSlider"
                display="flex"
                gap={6}
                alignItems="center"
                sx={{ overflowX: "hidden", scrollBehavior: "smooth" }}
            >
                {Object.entries(mapTimeToTemperature(
                    parseInt(currentTime),
                    hourlyTime,
                    hourlyTemperature,
                    cloudCover,
                    chancesOfRain
                )).map(([time, forecast], idx) => (
                    <Stack id={`hourlyWeather${idx}`} key={idx} alignItems="center" gap={0.5} >
                        <Typography>{time}</Typography>
                        <Box fontSize="2rem">{forecast.weather.icon}</Box>
                        <Typography>{forecast.temperature}{'\u00b0'}</Typography>
                    </Stack>
                ))}
            </Box>
            <Box pl="1rem" onClick={handleScrollRight}>
                <ArrowForwardIosIcon sx={{ fontSize: "4rem", cursor: "pointer", color: "#3a506b" }} />
            </Box>
        </Stack>
    )
}

export default HourlyForecast;