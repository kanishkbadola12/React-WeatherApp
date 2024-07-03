import { faEarthAmericas, faWifi } from "@fortawesome/free-solid-svg-icons"
import { faOtter } from "@fortawesome/free-solid-svg-icons/faOtter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { SerializedError } from "@reduxjs/toolkit/react"
import { useNavigate } from "react-router-dom"

type errorType = FetchBaseQueryError | SerializedError | string | undefined;

interface ErrorProps {
    error: errorType;
}

const isFetchBaseQueryError = (error?: errorType): error is FetchBaseQueryError => {
    return error !== undefined && typeof error === 'object' && 'status' in error;
}

const isSerializedError = (error: errorType): error is SerializedError => {
    return error !== undefined && typeof error === 'object' && 'message' in error;
}

const isRouteError = (error: errorType): error is SerializedError => {
    return error !== undefined && typeof error === 'string' && error === '404';
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
    if (!error) return 'Unknown Error';

    let errorMessage = '';
    let color = '#ef233c';
    let icon = faWifi;
    const theme = useTheme();
    const navigate = useNavigate();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const handleErrorState = (error: string | object) => {
        isRouteError(error) ? navigate('..') : location.reload();
    }

    if (error) {
        if (isFetchBaseQueryError(error)) {
            if (error.status === 'FETCH_ERROR') {
                errorMessage = 'Network error: Failed to fetch.';
            } else {
                errorMessage = `Error: ${error.data || error.status}`;
            }
        } else if (isSerializedError(error)) {
            errorMessage = error.message || 'Unknown Error';
        } else {
            errorMessage = error;
            if (error === '404') {
                errorMessage = 'Oh snap! 404...';
                color = '#ca6702';
                icon = faOtter;
            } else {
                color = '#7ae582';
                icon = faEarthAmericas
            }
        }
    }

    return (
        <Stack
            alignItems="center"
            textAlign="center"
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
            <FontAwesomeIcon style={{ fontSize: isSm ? "7rem" : "10rem", color: color }} icon={icon} />
            <Typography
                width="90vw"
                variant="overline"
                color="textSecondary"
                fontSize={isXs ? "1.25rem" : isSm ? "1.5rem" : "2rem"}
            >
                {errorMessage}
            </Typography>
            <Button
                variant="contained"
                style={{ background: '#219ebc' }}
                onClick={() => handleErrorState(error)}
            >
                {isRouteError(error) ? 'Go back to home' : 'Refresh'}
            </Button>
        </Stack>
    )
} 