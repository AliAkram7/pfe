import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation, useQueryClient } from "react-query";
import { sendInvitation, sendResponse } from "./axiosUrl";


export const useResponse =()=>{
    const queryClient = useQueryClient() ; 
    return useMutation(sendResponse, {
        onSuccess:()=>{
            queryClient.invalidateQueries('fetchInvitationSended')
            queryClient.invalidateQueries('fetchInvitationRecived')
        }
    })
}

export const useSendInvitation =()=>{
    const queryClient = useQueryClient() ; 
    return useMutation(sendInvitation,{
        onSuccess:()=>{
            showNotification({
                title:'invitation sended',
                message: '',
                color:'green',
              }) ; 
              queryClient.invalidateQueries('fetchInvitationRecived')
            queryClient.invalidateQueries('fetchInvitationSended')

        }
    })
}