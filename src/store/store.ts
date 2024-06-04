import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import coordinatesApi from "../services/coordinatesApi";
import geoLocationApi from "../services/geoLocationApi";
import forecastApi from "../services/forecastApi";
import coordinatesSlice from "./coordinatesSlice";

export const store = configureStore({
    reducer: {
        coordinates: coordinatesSlice,
        [coordinatesApi.reducerPath]: coordinatesApi.reducer,
        [forecastApi.reducerPath]: forecastApi.reducer,
        [geoLocationApi.reducerPath]: geoLocationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat([
                coordinatesApi.middleware,
                forecastApi.middleware,
                geoLocationApi.middleware
            ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);