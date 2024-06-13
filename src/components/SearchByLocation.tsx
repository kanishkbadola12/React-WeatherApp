import React, { useRef } from 'react'
import { Container, InputAdornment, TextField } from "@mui/material";
import { useLazyGetCoordinatesQuery } from '../services/coordinatesApi';
import { useAppDispatch } from '../hooks/redux';
import { setCoordinates } from '../store/coordinatesSlice';
import SearchIcon from '@mui/icons-material/Search';

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
        <Container sx={{
            display: "flex",
            justifyContent: "end",
            '& .MuiInputBase-root': {
                height: "36px",
                borderRadius: "24px"
            },
            '& label': {
                fontSize: "small",
                color: "#212529"
            },
            '& svg': {
                cursor: "pointer"
            }
        }}>
            <TextField
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon onClick={handleLocationSearch} />
                        </InputAdornment>
                    )
                }}
                id="outlined-multiline-flexible"
                label="Search for places..."
                inputRef={inputRef}
            />
        </Container>
    )
}
