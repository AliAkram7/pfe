
import { useMutation } from "react-query";
import axiosClient from "../../../axois-client";

const sendSuggestion=(payload)=>{
    return axiosClient.post('/teacher/sendSuggestionTheme', payload)
}

export const useSendSuggestion =()=> {
    return useMutation(sendSuggestion, {
        onSuccess:()=>{
            showNotification({
                title:'suggestion sended successfully',
                // message: '',
                color:'green',
              }) ; 
        }, 
        onError:()=>{
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        } ,  
    }) ; 
}
