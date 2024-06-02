import { configureStore } from "@reduxjs/toolkit";
import { coordinateApi, geoLocationApi, forecastApi } from "./services/weatherApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [coordinateApi.reducerPath]: coordinateApi.reducer,
        [forecastApi.reducerPath]: forecastApi.reducer,
        [geoLocationApi.reducerPath]: geoLocationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat([
                coordinateApi.middleware,
                forecastApi.middleware,
                geoLocationApi.middleware
            ])
});

setupListeners(store.dispatch);