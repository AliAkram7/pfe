import axiosClient from "../../../../axois-client";


// ! receive a table of theme
export const fetchTheme = () => {
    return axiosClient.get('/student/fetchThemePublished') ; 
}

