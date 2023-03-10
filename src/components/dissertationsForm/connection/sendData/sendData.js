import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import { sendChoice } from "./axiosUrl";

export const useSendChoice = () => {
  return useMutation(sendChoice, {
    onError : ()=>{
      showNotification({
        title: 'error',
        message: 'some things goes wrong try again later',
        color: 'red',
    })} ,  
    onSuccess : ()=>{
      showNotification({
        title: 'update successfully',
        message: '',
        color: 'teal',
    })
    }
  });
};