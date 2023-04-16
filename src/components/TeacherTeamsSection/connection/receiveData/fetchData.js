import {   getAllRoomsByTeam, getTeamsInformation } from "./axoisUrl";
import {useQuery} from "react-query";

export const useGetTeamsInformation =(onSuccess, onError)=>{
    return useQuery('getTeamsInformation',getTeamsInformation,{
        onSuccess, 
        onError,
        
        
    },
    )
}

//*   paylod here  reference to team id    *
export const useGetAllRoomsByTeam =(payload)=>{
    return useQuery( ['getAllRoomsByTeam' , payload]  ,getAllRoomsByTeam,{
        // onSuccess, 
        // onError,
        // refetchInterval: 1000 *10, 

    },
    )
}





