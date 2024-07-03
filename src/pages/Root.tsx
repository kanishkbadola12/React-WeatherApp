import { Outlet } from "react-router-dom";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import { setCoordinates } from "../store/slices/coordinates";
import { Error } from "../components/ui/Error";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { RootState } from "../store/store";

const RootLayout = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const [locationError, setLocationError] = useState("");
    const { isAppLoading, appHasErrors } = useAppSelector((state: RootState) => state.appState);

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
    }, [dispatch]);

    if (locationError !== "") {
        return <Error error={locationError} />
    }

    return (
        <Container sx={{ display: "flex", flexDirection: "column", gap: isXs ? 6 : 4, mt: 4 }}>
            {!appHasErrors && <Header />}
            <Outlet />
            {!isAppLoading && !appHasErrors && <Footer />}
        </Container>
    )
}

export default RootLayout;