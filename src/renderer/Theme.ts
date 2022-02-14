import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#BB86FC',
            light: '#efb7ff',
            dark: '#8858c8',
            contrastText: '#000000',
        },
        secondary: {
            main: '#03c4b4',
            light: '#60f8e6',
            dark: '#009384',
        },
        error: {
            main: '#cf6679',
        },
        warning: {
            main: '#ffa726',
        },
        info: {
            main: '#42a5f5',
        },
        success: {
            main: '#66bb6a',
        },
        background: {
            default: '#121212',
            paper: '#2f2f2f',
        },
    },
});