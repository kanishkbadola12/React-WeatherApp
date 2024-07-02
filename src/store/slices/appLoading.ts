import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const isAppLoadingSlice = createSlice({
    name: 'isAppLoading',
    initialState: { isAppLoading: true },
    reducers: {
        setAppLoading(state, action: PayloadAction<boolean>) {
            state.isAppLoading = action.payload;
        }
    }
});

export const { setAppLoading } = isAppLoadingSlice.actions;
export default isAppLoadingSlice.reducer;