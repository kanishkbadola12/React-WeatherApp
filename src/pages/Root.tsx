import { Outlet } from "react-router-dom";
import { SearchByLocation } from "../components/SearchByLocation";
import { Container } from "@mui/material";

const RootLayout = () => {
    return (
        <Container sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <SearchByLocation />
            <Outlet></Outlet>
        </Container>
    )
}

export default RootLayout;