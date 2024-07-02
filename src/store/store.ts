import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import coordinatesApi from "../services/coordinatesApi";
import geoLocationApi from "../services/geoLocationApi";
import forecastApi from "../services/forecastApi";
import coordinatesSlice from "./slices/coordinates";
import airQualityApi from "../services/airQualityApi";
import isAppLoadingSlice from "./slices/appLoading";

export const store = configureStore({
    reducer: {
        coordinates: coordinatesSlice,
        isAppLoading: isAppLoadingSlice,
        [coordinatesApi.reducerPath]: coordinatesApi.reducer,
        [forecastApi.reducerPath]: forecastApi.reducer,
        [geoLocationApi.reducerPath]: geoLocationApi.reducer,
        [airQualityApi.reducerPath]: airQualityApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat([
                coordinatesApi.middleware,
                forecastApi.middleware,
                geoLocationApi.middleware,
                airQualityApi.middleware
            ])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;