import React, { useRef, useState } from 'react'
import { Box, InputAdornment, Stack, Tab, Tabs, TextField, useTheme } from "@mui/material";
import { useLazyGetCoordinatesQuery } from '../services/coordinatesApi';
import { useAppDispatch } from '../hooks/redux';
import { setCoordinates } from '../store/coordinatesSlice';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export const SearchByLocation: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [tab, setTab] = useState(localStorage.getItem('tabState') || 'today');
    const [getCoordinates] = useLazyGetCoordinatesQuery();
    const dispatch = useAppDispatch();
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

    const handleLocationSearch = async (event: React.KeyboardEvent): Promise<void> => {
        if (event.key === 'Enter') {
            const response = await getCoordinates(inputRef.current!.value);

            if (response.data) {
                const { latitude, longitude } = response.data;
                dispatch(setCoordinates({ latitude, longitude }));
            }
        }
    };

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="end">
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
            <TextField
                onKeyDown={handleLocationSearch}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                }}
                id="outlined-basic"
                label="Search for places..."
                inputRef={inputRef}
            />
        </Stack>
    )
}
