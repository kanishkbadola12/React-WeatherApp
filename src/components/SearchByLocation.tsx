import React, { useRef } from 'react'
import { Button, TextField } from "@mui/material";
import { useLazyGetCoordinatesQuery } from '../services/coordinatesApi';
import { useAppDispatch } from '../hooks/redux';
import { setCoordinates } from '../store/coordinatesSlice';

export const SearchByLocation: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [getCoordinates] = useLazyGetCoordinatesQuery();
    const dispatch = useAppDispatch();

    const handleLocationSearch = async (): Promise<void> => {
        const response = await getCoordinates(inputRef.current!.value);

        if (response.data) {
            const { latitude, longitude } = response.data;
            dispatch(setCoordinates({ latitude, longitude }));
        }
    };

    return (
        <>
            <TextField
                id="outlined-multiline-flexible"
                label="Search for places..."
                inputRef={inputRef}
            />
            <Button onClick={handleLocationSearch} variant="contained">
                Send
            </Button>
        </>
    )
}
