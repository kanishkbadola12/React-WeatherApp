import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAppLoading: true,
    appHasErrors: false,
    selectedTab: 'today',
    currentLocale: 'en'
}

const appStateSlice = createSlice({
    name: 'appState',
    initialState: initialState,
    reducers: {
        setIsAppLoading(state, action: PayloadAction<boolean>) {
            state.isAppLoading = action.payload;
        },
        setAppHasError(state, action: PayloadAction<boolean>) {
            state.appHasErrors = action.payload;
        },
        setSelectedTab(state, action: PayloadAction<string>) {
            state.selectedTab = action.payload;
        },
        setCurrentLocale(state, action: PayloadAction<string>) {
            state.currentLocale = action.payload;
        }
    }
});

export const {
    setIsAppLoading,
    setAppHasError,
    setSelectedTab,
    setCurrentLocale
} = appStateSlice.actions;

export default appStateSlice.reducer;