import React, { useRef, useState } from 'react'
import { Box, InputAdornment, Stack, Tab, Tabs, TextField, useTheme } from "@mui/material";
import { useLazyGetCoordinatesQuery } from '../services/coordinatesApi';
import { useAppDispatch } from '../hooks/redux';
import { setCoordinates } from '../store/coordinatesSlice';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export const SearchByLocation: React.FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchHasError, setSearchHasError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const [tab, setTab] = useState<string>(localStorage.getItem('tabState') || 'today');
    const [getCoordinates] = useLazyGetCoordinatesQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();;

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

    const validateSearch = () => {
        if (inputRef.current) {
            if (inputRef.current.value === "") {
                setHelperText('Search field cannot be empty.');
                setSearchHasError(true);
            } else if (!/^[a-zA-Z\s]+$/.test(inputRef.current.value)) {
                setHelperText('Only letters and spaces allowed.');
                setSearchHasError(true);
            } else {
                setHelperText('');
                setSearchHasError(false);
            }
        }
    }

    const validateSearchOnBlur = () => {
        if (inputRef.current && inputRef.current.value === "") {
            setHelperText('');
            setSearchHasError(false);
        }
    }

    const handleLocationSearch = async (event: React.KeyboardEvent): Promise<void> => {
        if (searchHasError) return;

        if (inputRef.current && event.key === 'Enter') {
            if (inputRef.current.value === "") {
                setHelperText('Search field cannot be empty.');
                setSearchHasError(true);
                return;
            }

            const response = await getCoordinates(inputRef.current.value);
            if (response.data) {
                const { latitude, longitude } = response.data;
                dispatch(setCoordinates({ latitude, longitude }));
            }
        }
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
            height="4rem"
        >
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
                error={searchHasError}
                onChange={validateSearch}
                onBlur={validateSearchOnBlur}
                onKeyDown={handleLocationSearch}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                }}
                id="outlined-error"
                label="Search for places..."
                inputRef={inputRef}
                helperText={helperText}
            />
        </Stack>
    )
}
