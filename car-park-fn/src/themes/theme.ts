import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
    palette: {
        primary: {
            //P-80
            main: '#A6D654'
        },
        secondary: {
            //S-50
            main: '#008399'
        },
        error: {
            main: '#FF897D'
        },
        info: {
            //P-10
            main: '#131F00'
        },
        warning: {
            //T-80
            main: '#EBC243'
        },
        success: {
            //P-40
            main: '#476800'
        }
    }
})
