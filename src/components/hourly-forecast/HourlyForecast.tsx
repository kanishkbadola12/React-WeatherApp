import { Box, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { mapTimeToTemperature } from "../../utils/mapHoursToWeather";
import { useRef } from "react";

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

    const arrowForwardRef = useRef<HTMLElement>(null);
    const arrowBackwardRef = useRef<HTMLElement>(null);

    const animateArrow = (ele: HTMLElement | null) => {
        if (ele) {
            ele.classList.add('beat');
            ele.addEventListener('animationend', () => {
                ele.classList.remove('beat');
            });
        }
    }

    const handleScrollBackward = () => {
        animateArrow(arrowBackwardRef.current);
        const slider = document.getElementById('weatherSlider')!;
        const scrollWidth = slider.getBoundingClientRect().width;
        slider.scrollLeft -= scrollWidth;
    }

    const handleScrollForward = () => {
        animateArrow(arrowForwardRef.current);
        const slider = document.getElementById('weatherSlider')!;
        const scrollWidth = slider.getBoundingClientRect().width;
        slider.scrollLeft += scrollWidth;
    }

    return (
        <Stack direction="row" alignItems="center" overflow="hidden" flexBasis="70%">
            <Box ref={arrowBackwardRef} pr="1rem" onClick={handleScrollBackward}>
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
            <Box ref={arrowForwardRef} pl="1rem" onClick={handleScrollForward}>
                <ArrowForwardIosIcon sx={{ fontSize: "4rem", cursor: "pointer", color: "#3a506b" }} />
            </Box>
        </Stack>
    )
}

export default HourlyForecast;