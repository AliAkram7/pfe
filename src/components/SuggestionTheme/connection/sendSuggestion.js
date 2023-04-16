
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "react-query";
import axiosClient from "../../../axois-client";

const sendSuggestion = (payload) => {
    return axiosClient.post('/teacher/sendSuggestionTheme', payload)
}

export const useSendSuggestion = () => {
    return useMutation(sendSuggestion, {
        onSuccess: () => {
            showNotification({
                title: 'suggestion sended successfully',
                // message: '',
                color: 'green',
            });
        },
        onError: () => {
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
    });
}


// /teacher/update/fetchLicenseTeams

const  fetchLicenseTeams =()=>{
    return axiosClient.get('/teacher/update/fetchLicenseTeams') ; 
}

export const useFetchLicenseTeams=()=>{
    return useQuery('fetchLicenseTeams' , fetchLicenseTeams , {}
     )
}


const  sendLicenseTheme =(payload)=>{
    return axiosClient.post('/teacher/sendLicenseTheme', payload)
}

export const useSendLicenseTheme=()=>{
    return useMutation(sendLicenseTheme , {
        onSuccess : ()=>{
            showNotification({
                title: 'theme proposal sended successfully',
                // message: '',
                color: 'green',
            });
        }
    })
}


