import { useRef, useState } from "react";
import { useLazyGetCoordinatesQuery } from "../../services/coordinatesApi";
import { useAppDispatch } from '../../hooks/redux';
import { setCoordinates } from "../../store/slices/coordinates";
import { setAppLoading } from "../../store/slices/appLoading";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const Search: React.FC = () => {
    const [
        getCoordinates,
    ] = useLazyGetCoordinatesQuery();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchHasError, setSearchHasError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');

    const dispatch = useAppDispatch();

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
                dispatch(setAppLoading(true));
            }
        }
    };

    return (
        <TextField
            error={searchHasError}
            onChange={validateSearch}
            onBlur={validateSearchOnBlur}
            onKeyDown={handleLocationSearch}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon style={{ color: "#000814" }} />
                    </InputAdornment>
                )
            }}
            id="outlined-error"
            label="Search for places..."
            inputRef={inputRef}
            helperText={helperText}
        />
    )
}