import { createTheme, outlinedInputClasses } from "@mui/material";

export const customTheme = createTheme({
    palette: {
        primary: {
            main: '#2f3e46',
            light: '#adb5bd'
        }
    },
    typography: {
        fontSize: 16,
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '--TextField-brandBorderColor': '#E0E3E7',
                    '--TextField-brandBorderHoverColor': '#343a40',
                    '--TextField-brandBorderFocusedColor': '#343a40',
                    '& .MuiInputBase-root': {
                        height: "36px",
                        borderRadius: "24px",
                    },
                    '& label': {
                        fontSize: "small",
                    },
                    '& label.Mui-focused': {
                        color: 'var(--TextField-brandBorderFocusedColor)',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: 'var(--TextField-brandBorderColor)',
                },
                root: {
                    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--TextField-brandBorderHoverColor)',
                    },
                    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'var(--TextField-brandBorderFocusedColor)',
                    },
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    alignItems: "center",
                    height: "9rem",
                    width: "9rem",
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "16px"
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    height: "120px !important",
                    width: "120px !important",
                    '+.MuiBox-root': {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }
            }
        }
    },
});
