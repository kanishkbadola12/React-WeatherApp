import { faEarthAmericas, faWifi } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { SerializedError } from "@reduxjs/toolkit/react"

interface ErrorProps {
    error: FetchBaseQueryError | SerializedError | string;
}

const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
    return error && typeof error === 'object' && 'status' in error;
}

const isSerializedError = (error: any): error is SerializedError => {
    return error && typeof error === 'object' && 'message' in error;
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
    let errorMessage;
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

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
        }
    }

    return (
        <Stack alignItems="center" gap={1} textAlign="center"
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
            {typeof error === "string" ? (
                <FontAwesomeIcon style={{ fontSize: "5rem", color: "#38b000" }} icon={faEarthAmericas} />
            ) : (
                <FontAwesomeIcon style={{ fontSize: "5rem", color: "#ef233c" }} icon={faWifi} />
            )}
            <Typography variant={isXs ? "h6" : "h5"} color="textSecondary">
                {errorMessage}
            </Typography>
            <Typography variant={isXs ? "h6" : "h5"} color="textSecondary">
            </Typography>
        </Stack>
    )
} 