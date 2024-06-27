import { Outlet } from "react-router-dom";
import { SearchByLocation } from "../components/SearchByLocation";
import { Container } from "@mui/material";
import { useAppDispatch } from "../hooks/redux";
import { useEffect } from "react";
import { setCoordinates } from "../store/coordinatesSlice";

const RootLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setCoordinates({ latitude, longitude }));
                },
                (error) => {
                    //error
                }
            );
        } else {
            //error
        }
    }, [dispatch]);

    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            mt: 4
        }}>
            <SearchByLocation />
            <Outlet></Outlet>
        </Container>
    )
}

export default RootLayout;