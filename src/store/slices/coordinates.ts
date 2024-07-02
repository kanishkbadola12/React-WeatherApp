import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Coordinates } from "../../types/weatherType";

const initialState: Coordinates = {
    latitude: null,
    longitude: null
};

const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState: initialState,
    reducers: {
        setCoordinates(state, action: PayloadAction<Coordinates>) {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        }
    }
});

export const { setCoordinates } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;