import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { useLazyGetForecastQuery } from "../../services/forecastApi";
import { useLazyGetGeoLocationQuery } from "../../services/geoLocationApi";

export const DailyForeCastSummary: React.FC<any> = () => {
    const coordinates = useAppSelector((state: RootState) => state.coordinates);
    const [getForecast, { data: weather }] = useLazyGetForecastQuery();
    const [getLocation, { data: geoLocation }] = useLazyGetGeoLocationQuery();

    console.log(coordinates);

    useEffect(() => {
        if (coordinates.latitude != null && coordinates.longitude != null) {
            getForecast(coordinates);
            getLocation(coordinates);
        }
    }, [coordinates]);

    return <>
        <p>{weather && weather.temperature2m}</p>
        <p>{geoLocation && geoLocation.city}</p>
    </>
};

export default DailyForeCastSummary;
