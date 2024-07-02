import { Outlet } from "react-router-dom";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch } from "../hooks/redux";
import { useEffect, useState } from "react";
import { setCoordinates } from "../store/coordinatesSlice";
import { SearchByLocation } from "../components/search/SearchByLocation";
import { LoadingIndicator } from "../components/ui/LoadingIndicator";
import { Error } from "../components/ui/Error";

const RootLayout = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const [fetchingLocation, setFetchingLocation] = useState(true);
    const [locationError, setLocationError] = useState("");

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setCoordinates({ latitude, longitude }));
                },
                (error) => {
                    setLocationError(error.message);
                }
            );
        } else {
            setLocationError("Browser doesn't support Geolocation");
        }
        setFetchingLocation(false);
    }, [dispatch]);

    if (locationError !== "") {
        return <Error error={locationError} />
    }

    return (
        fetchingLocation ? (
            <LoadingIndicator>
                <Typography variant={isXs ? "caption" : "overline"} color="textSecondary">Fetching Location...</Typography>
            </LoadingIndicator>
        ) : (
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isXs ? 6 : 4,
                    mt: 4
                }}
            >
                <SearchByLocation />
                <Outlet />
            </Container>
        )
    );
}

export default RootLayout;