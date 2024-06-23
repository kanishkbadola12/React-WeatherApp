import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material"
import { mapUnitsToProgressBar } from "../../utils/mapUnitsToProgressBar";
import { WeatherFactors } from "../../types/weatherType";

interface ProgressCardProps {
    children: JSX.Element,
    value: number;
    unit?: string;
}

export const ProgressCard = ({ children, value, unit }: ProgressCardProps) => {
    const factor = children.props.children as WeatherFactors;
    const { progress, color } = mapUnitsToProgressBar(value, factor);

    return (
        <Card>
            <CardContent>
                {children}
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress color={color} variant="determinate" value={progress} />
                    <Box gap="2px">
                        <Typography variant={value >= 100 ? 'h4' : 'h3'}>{value}</Typography>
                        <Typography variant="caption" alignSelf="end" pb={value >= 100 ? 5 : 4}>{unit}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}