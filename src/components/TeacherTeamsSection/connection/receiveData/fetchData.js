import {   getAllRoomsByTeam, getTeamsInformation } from "./axoisUrl";
import {useQuery} from "react-query";

export const useGetTeamsInformation =(onSuccess, onError)=>{
    return useQuery('getTeamsInformation',getTeamsInformation,{
        onSuccess, 
        onError,
        // refetchInterval: 1000, 
    },
    )
}

//*   paylod here  reference to team id    *
export const useGetAllRoomsByTeam =(paylod)=>{
    return useQuery( ['getAllRoomsByTeam' , paylod]  ,getAllRoomsByTeam,{
        // onSuccess, 
        // onError,
        // refetchInterval: 4000, 
    },
    )
}





