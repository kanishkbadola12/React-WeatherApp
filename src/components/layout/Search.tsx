import { useEffect, useRef, useState } from "react";
import { useLazyGetCoordinatesQuery } from "../../services/coordinatesApi";
import { useAppDispatch } from '../../hooks/useRedux';
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { setAppHasError, setCurrentLocale, setErrorText, setIsAppLoading, setLoadingText } from "../../store/slices/appState";
import { setCoordinates } from "../../store/slices/coordinates";
import { useLazyGetGeoLocationQuery } from "../../services/geoLocationApi";

export const Search: React.FC = () => {
    const [
        getCoordinates,
        {
            data: coordinates,
            isFetching: isCoordinatesFetching,
            isError: coordinatesHasError,
            error: coordinateError
        }
    ] = useLazyGetCoordinatesQuery();
    const [
        getLocation,
        {
            data: location,
            isFetching: isLocationFetching,
            isError: locationHasError,
            error: locationError
        }
    ] = useLazyGetGeoLocationQuery();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchHasError, setSearchHasError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (coordinates) {
            if (coordinates.latitude !== null && coordinates.longitude !== null) {
                dispatch(setCoordinates(coordinates));
                getLocation(coordinates);
            } else {
                setSearchHasError(true);
                setHelperText('Please enter a valid location.');
            }
        }
        if (location) {
            dispatch(setCurrentLocale(location.country_code));
        }
    }, [coordinates, location]);

    useEffect(() => {
        dispatch(setIsAppLoading(isCoordinatesFetching || isLocationFetching));
        dispatch(setLoadingText("Fetching location's weather"));
    }, [isCoordinatesFetching, isLocationFetching]);

    useEffect(() => {
        dispatch(setAppHasError(coordinatesHasError || locationHasError));
        dispatch(setErrorText(coordinateError || locationError || ''));
    }, [isCoordinatesFetching || locationHasError]);


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