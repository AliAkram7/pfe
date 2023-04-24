// /teacher/specialty_manager/fetchPresentationDates

import axiosClient from "../../axois-client";
import { useQuery } from "react-query";


const fetchCalenderEvent = () => {
    return axiosClient.get('/teacher/specialty_manager/fetchPresentationDates')
}

export const useFetchCalenderEvent = () => {
    return useQuery('fetchCalenderEvent', fetchCalenderEvent, {})
}