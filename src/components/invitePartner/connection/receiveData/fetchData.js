import {  fetchInvitationRecieved, fetchInvitationSended } from "./axoisUrl";
import {useQuery} from "react-query";


export const useFetchInvitationRecieved =(onSuccess, onError)=>{
    return useQuery('fetchInvitationRecived',fetchInvitationRecieved,{
        onSuccess, 
        onError,
        // refetchInterval:3000 ,
    },

    
    )
}



export const useFetchInvitationSended =(onSuccess, onError)=>{
    return useQuery('fetchInvitationSended',fetchInvitationSended,{
        onSuccess, 
        onError,
        // refetchInterval:3000 ,
    },

    
    )
}

