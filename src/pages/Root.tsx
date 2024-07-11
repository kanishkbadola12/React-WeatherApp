import { Outlet } from "react-router-dom";
import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setCoordinates } from "../store/slices/coordinates";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Error } from "../components/ui/Error";
import { RootState } from "../store/store";
import { LoadingIndicator } from "../components/ui/LoadingIndicator";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { setAppHasError, setErrorText, setIsAppLoading, setLoadingText } from "../store/slices/appState";

const RootLayout = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const { t } = useTranslation();
    const { isAppLoading, loadingText, appHasError, errorText } = useAppSelector((state: RootState) => state.appState);

    function getCurrentPositionPromise(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setIsAppLoading(true));
            dispatch(setLoadingText('Fetching Location'));
            if (navigator.geolocation) {
                try {
                    const position = await getCurrentPositionPromise();
                    const { latitude, longitude } = position.coords;
                    dispatch(setCoordinates({ latitude, longitude }));
                } catch (error) {
                    dispatch(setAppHasError(true));
                    dispatch(setErrorText('Please enable Geolocation to view the Weather'));
                }
            } else {
                dispatch(setAppHasError(true));
                dispatch(setErrorText('Browser does not support Geolocation'));
            }

            dispatch(setIsAppLoading(false));
        };

        fetchData();
    }, [dispatch]);

    return (
        <Container sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
            <Header />
            <Box mb={4} display={isAppLoading || appHasError ? "none" : "column"}><Outlet /></Box>
            {appHasError && !isAppLoading && <Error error={errorText} />}
            {!appHasError && isAppLoading && (
                <LoadingIndicator>
                    <Typography variant={isXs ? "caption" : "overline"} color="textSecondary">{t(loadingText)}</Typography>
                </LoadingIndicator>
            )}
            {!isAppLoading && <Footer />}
        </Container >
    )
}

export default RootLayout;