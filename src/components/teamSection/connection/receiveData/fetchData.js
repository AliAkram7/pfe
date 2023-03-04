import {  getStudentTeamInformation, getAllRooms } from "./axoisUrl";
import {useQuery} from "react-query";

export const useGetStudentTeamInformation =(onSuccess, onError)=>{
    return useQuery('getStudentTeamInformation',getStudentTeamInformation,{
        onSuccess, 
        onError,
        // refetchInterval: 1000, 
        refetchOnWindowFocus:false, 
        retry:false , 
    },
    )
}


export const useGetAllRooms =(onSuccess, onError)=>{
    return useQuery('getAllRooms',getAllRooms,{
        onSuccess, 
        onError,
        // refetchInterval: 4000, 
    },
    )
}





