import React from 'react'
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Navigation } from './Navigation';
import { Search } from './Search';

export const Header: React.FC = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Box
            display="flex"
            flexDirection={isXs ? "column" : "row"}
            justifyContent={isXs ? "center" : "space-between"}
            alignItems={isXs ? "center" : "start"}
            gap={isXs ? 1.5 : 0}
            height="12vh"
            mb={isXs ? 4 : 0}
        >
            <Navigation />
            <Search />
        </Box>
    )
}
