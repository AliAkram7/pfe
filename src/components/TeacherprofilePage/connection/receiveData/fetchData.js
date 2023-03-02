import {  fetchTeacherData } from "./axoisUrl";
import {useQuery, useQueryClient} from "react-query";


export const useFetchTeacherData =(onSuccess, onError)=>{
    return useQuery('fetchTeacherData',fetchTeacherData,{
        onSuccess, 
        onError,
        refetchInterval: 3000, 
    },
    )
}



  

