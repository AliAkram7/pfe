import axois from "axios";
import { axiosClient } from "../../../../axois-client";



export const fetchInvitationRecieved =()=>{
    return axiosClient.get('/getRecievedInvitation');
}

export const fetchInvitationSended =()=>{
    return axiosClient.get('/getSendedInvitation');
}
