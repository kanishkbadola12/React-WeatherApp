import { Box, Tab, Tabs, useTheme } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router";


export const Navigation: React.FC = () => {
    const [tab, setTab] = useState<string>(localStorage.getItem('tabState') || 'today');
    const navigate = useNavigate();
    const theme = useTheme();

    const handleTabState = () => {
        if (tab === 'today') {
            localStorage.setItem('tabState', 'week');
            navigate('weekly');
            setTab('week');
        } else {
            localStorage.setItem('tabState', 'today');
            navigate('..');
            setTab('today');
        }
    }

    return (
        <Box>
            <Tabs value={tab} onChange={handleTabState}>
                <Tab
                    sx={{ color: tab == 'today' ? theme.palette.primary.main : theme.palette.primary.light }}
                    value="today"
                    label="Today"
                />
                <Tab
                    sx={{ color: tab == 'week' ? theme.palette.primary.main : theme.palette.primary.light }}
                    value="week"
                    label="Week"
                />
            </Tabs>
        </Box>
    )
}