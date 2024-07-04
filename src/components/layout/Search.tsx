import { useEffect, useRef, useState } from "react";
import { useLazyGetCoordinatesQuery } from "../../services/coordinatesApi";
import { useAppDispatch } from '../../hooks/redux';
import { setCoordinates } from "../../store/slices/coordinates";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { useLazyGetGeoLocationQuery } from "../../services/geoLocationApi";
import { setCurrentLocale } from "../../store/slices/appState";

export const Search: React.FC = () => {
    const [
        getCoordinates,
        {
            data: coordinates,
            isError: CoordinatesHasError,
        }
    ] = useLazyGetCoordinatesQuery();
    const [
        getLocation,
        {
            data: geoLocation
        }
    ] = useLazyGetGeoLocationQuery();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchHasError, setSearchHasError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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

            getCoordinates(inputRef.current.value);
        }
    };

    useEffect(() => {
        if (coordinates) {
            const { latitude, longitude } = coordinates;

            if ((latitude === null && longitude === null) || CoordinatesHasError) {
                setHelperText('Please enter a valid location.');
                setSearchHasError(true);
                return;
            }

            dispatch(setCoordinates({ latitude, longitude }));
            getLocation(coordinates);
            dispatch(setCurrentLocale(geoLocation?.country_code || "en"))
        }
    }, [coordinates, geoLocation]);

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
            label={t('Search for places')}
            inputRef={inputRef}
            helperText={helperText}
        />
    )
}