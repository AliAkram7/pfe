import axois from "axios";
import { axiosClient } from "../../../../axois-client";


export const sendInvitation =(sendedSata)=>{
   return axiosClient.post('invitePartner',sendedSata) ; 
}

export const sendResponse =(sendedSata)=>{
   return axiosClient.post('studentResponseToInvitation',sendedSata) ; 
}
