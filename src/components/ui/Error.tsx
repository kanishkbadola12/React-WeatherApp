import { faEarthAmericas, faWifi } from "@fortawesome/free-solid-svg-icons"
import { faOtter } from "@fortawesome/free-solid-svg-icons/faOtter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { errorType } from "../../types/weatherType"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";

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
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();

    const handleErrorState = (error: string | object) => {
        isRouteError(error) ? navigate('..') : location.reload();
    }

    if (error) {
        if (isFetchBaseQueryError(error)) {
            if (error.status === 'FETCH_ERROR') {
                errorMessage = t('Network error: Failed to fetch.');
            } else {
                errorMessage = `Error: ${error.data || error.status}`;
            }
        } else if (isSerializedError(error)) {
            errorMessage = error.message || t('Unknown Error');
        } else {
            errorMessage = error;
            if (error === '404') {
                errorMessage = t('Oh snap! 404');
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
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="70vh"
        >
            <FontAwesomeIcon fontSize="7rem" style={{ color: color, marginBottom: "16px" }} icon={icon} />
            <Typography
                width="90vw"
                variant="overline"
                color="textSecondary"
                lineHeight="32px"
                fontSize={isSm ? "1.25rem" : "1.5rem"}
            >
                {errorMessage}
            </Typography>
            <Button
                variant="contained"
                style={{ background: '#219ebc', marginTop: "16px" }}
                onClick={() => handleErrorState(error)}
            >
                {isRouteError(error) ? t('Go back to home') : t('Refresh')}
            </Button>
        </Stack>
    )
} 