import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query"
import { createRoom } from "./axiosUrl"



export const usecreateRoom = () => {
    const queryClient = useQueryClient()

    return useMutation(createRoom, {

        onError: (response) => {

            showNotification({
                title: 'error ',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        }, 
        onSuccess:(response)=>{

            showNotification({
                title: 'room created seccusfully',
                message: '',
                color: 'green',
            })
            queryClient.invalidateQueries('getAllRooms'); 
        }
    })
}