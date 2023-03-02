import { fetchStudentData } from "./axoisUrl";
import { useQuery } from "react-query";

export const useFetchStudentData = (onSuccess, onError) => {
    return useQuery('fetchStudentData', fetchStudentData, {
        onSuccess,
        onError,
        refetchInterval: 5 * 1000,
        // cacheTime:60*1000, 
    },)
}


