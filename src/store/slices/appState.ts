import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, errorType } from "../../types/weatherType";

const initialState: AppState = {
    isAppLoading: false,
    loadingText: '',
    appHasError: false,
    errorText: '',
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
        setLoadingText(state, action: PayloadAction<string>) {
            state.loadingText = action.payload;
        },
        setAppHasError(state, action: PayloadAction<boolean>) {
            state.appHasError = action.payload;
        },
        setErrorText(state, action: PayloadAction<errorType>) {
            state.errorText = action.payload;
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
    setLoadingText,
    setAppHasError,
    setErrorText,
    setSelectedTab,
    setCurrentLocale
} = appStateSlice.actions;

export default appStateSlice.reducer;