import React, { useRef, useState } from 'react'
import { Box, InputAdornment, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useLazyGetCoordinatesQuery } from '../../services/coordinatesApi';
import { useAppDispatch } from '../../hooks/redux';
import { setCoordinates } from '../../store/coordinatesSlice';
import SearchIcon from '@mui/icons-material/Search';
import { Navigation } from './Navigation';

export const SearchByLocation: React.FC = () => {
    const [
        getCoordinates,
    ] = useLazyGetCoordinatesQuery();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchHasError, setSearchHasError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

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
                if (latitude === null && longitude === null) {
                    setHelperText('Please enter a valid location.');
                    setSearchHasError(true);
                    return;
                }

                dispatch(setCoordinates({ latitude, longitude }));
            }
        }
    };

    return (
        <Box
            display="flex"
            flexDirection={isXs ? "column" : "row"}
            justifyContent={isXs ? "center" : "space-between"}
            alignItems={isXs ? "center" : "start"}
            gap={isXs ? 1.5 : 0}
            height="4rem"
        >
            <Navigation />
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
        </Box>
    )
}
