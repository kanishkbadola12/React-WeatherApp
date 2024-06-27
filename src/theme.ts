import { createTheme } from "@mui/material";

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
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    top: "16px",
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
                    height: "7rem !important",
                    width: "7rem !important",
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
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    '&.Mui-error': {
                        color: '#c1121f',
                        width: "14rem",
                    }
                }
            }
        }
    },
});
