import { useQuery } from "react-query"
import axiosClient from "../../../axois-client";


const fetchResearchFocus = () => {
    return axiosClient.get('/teacher/fetchResearchFocus');
}

export const useFetchResearchFocus = () => {
    return useQuery('fetchResearchFocus', fetchResearchFocus, {
    })
}