import { Box, Tab, Tabs, useTheme } from "@mui/material"
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setIsAppLoading, setSelectedTab } from "../../store/slices/appState";
import { RootState } from "../../store/store";

export const Navigation: React.FC = () => {
    const { selectedTab } = useAppSelector((state: RootState) => state.appState);
    const navigate = useNavigate();
    const theme = useTheme();
    const { light, main } = theme.palette.primary;
    const dispatch = useAppDispatch();

    const handleTabState = () => {
        if (selectedTab === 'today') {
            navigate('weekly');
            dispatch(setSelectedTab('week'));

        } else {
            navigate('..');
            dispatch(setSelectedTab('today'));
        }
        dispatch(setIsAppLoading(true));
    }

    return (
        <Box>
            <Tabs value={selectedTab} onChange={handleTabState}>
                <Tab
                    sx={{ color: selectedTab == 'today' ? main : light }}
                    value="today"
                    label="Today"
                />
                <Tab
                    sx={{ color: selectedTab == 'week' ? main : light }}
                    value="week"
                    label="Week"
                />
            </Tabs>
        </Box>
    )
}