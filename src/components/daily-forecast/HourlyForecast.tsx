import { Box, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { mapTimeToTemperature } from "../../utils/mapTimeToTemperature";

interface HourlyForecastProps {
    currentTime: string
    hourlyTime: string[]
    hourlyTemperature: number[],
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ currentTime, hourlyTime, hourlyTemperature }) => {
    const handleScrollLeft = () => {
        document.getElementById('weatherSlider')!.scrollLeft -= 300;
    }

    const handleScrollRight = () => {
        document.getElementById('weatherSlider')!.scrollLeft += 300;
    }

    return (
        <Stack direction="row" alignItems="center" overflow="hidden" flexBasis="70%">
            <Box pr="1rem" onClick={handleScrollLeft}>
                <ArrowBackIosNewIcon sx={{ fontSize: "4rem", cursor: "pointer" }} />
            </Box>
            <Box
                id="weatherSlider"
                display="flex"
                gap={4}
                alignItems="center"
                sx={{ overflowX: "hidden", scrollBehavior: "smooth" }}
            >
                {Object.entries(mapTimeToTemperature(
                    currentTime,
                    hourlyTime.slice(0, 24),
                    hourlyTemperature.slice(0, 24)
                )).map(([time, temperature], idx) => (
                    <Box key={idx} display="flex" flexDirection="column" alignItems="center" >
                        <Typography>{time}</Typography>
                        <Typography>{temperature}{'\u00b0'}</Typography>
                    </Box>
                ))}
            </Box>
            <Box pl="1rem" onClick={handleScrollRight}>
                <ArrowForwardIosIcon sx={{ fontSize: "4rem", cursor: "pointer" }} />
            </Box>
        </Stack>
    )
}

export default HourlyForecast;