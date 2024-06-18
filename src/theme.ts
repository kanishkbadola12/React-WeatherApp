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
    },
});
