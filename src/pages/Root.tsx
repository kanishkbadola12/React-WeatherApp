import { Outlet } from "react-router-dom";
import { SearchByLocation } from "../components/SearchByLocation";

const RootLayout = () => {
    return (
        <>
            <main>
                <SearchByLocation />
                <Outlet></Outlet>
            </main>
        </>
    )
}

export default RootLayout;