import { Box, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { mapTimeToTemperature } from "../../utils/mapTimeToTemperature";

interface HourlyConditionsProps {
    time: string
    hourly: string[]
    hourlyTemperature: number[],
}

const HourlyConditions: React.FC<HourlyConditionsProps> = ({ time, hourly, hourlyTemperature }) => {
    const handleScrollLeft = () => {
        document.getElementById('weatherSlider')!.scrollLeft -= 300;
    }

    const handleScrollRight = () => {
        document.getElementById('weatherSlider')!.scrollLeft += 300;
    }

    return (
        <Stack direction="row" width="80vw" overflow="hidden">
            <Box display="flex" alignItems="center" mr="1rem" onClick={handleScrollLeft}>
                <ArrowBackIosNewIcon sx={{ fontSize: "3.5rem", cursor: "pointer" }} />
            </Box>
            <Box
                id="weatherSlider"
                display="flex"
                gap={4}
                alignItems="center"
                sx={{ overflowX: "hidden", width: "80vw", scrollBehavior: "smooth" }}
            >
                {Object.entries(mapTimeToTemperature(
                    time,
                    hourly.slice(0, 24),
                    hourlyTemperature.slice(0, 24)
                )).map((timeAndTemperature, idx) => (
                    <Box key={idx} display="flex" flexDirection="column" alignItems="center" >
                        <Typography color="primary">{timeAndTemperature[0]}</Typography>
                        <Typography color="primary">{timeAndTemperature[1]}</Typography>
                    </Box>
                ))}
            </Box>
            <Box display="flex" alignItems="center" ml="1rem" onClick={handleScrollRight}>
                <ArrowForwardIosIcon sx={{ fontSize: "3.5rem", cursor: "pointer" }} />
            </Box>
        </Stack>
    )
}

export default HourlyConditions;