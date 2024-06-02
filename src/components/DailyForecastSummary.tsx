// import React, { useRef, useEffect, useState } from "react";
// import {
//   useLazyGetCoordinatesQuery,
//   useLazyGetForecastQuery,
// } from "../services/weatherApi";
// import { Coordinates } from "../types/weather";
// import { Button, TextField } from "@mui/material";

// const DailyForeCastSummary: React.FC<Coordinates> = ({
//   latitude,
//   longitude,
// }) => {
//   const [
//     sendCoordinates,
//     { data: weather, error: weatherHasError, isLoading: isWeatherLoading },
//   ] = useLazyGetForecastQuery();

//   return <p>{weather && weather.current.time}</p>
// };

// export default DailyForeCastSummary;
