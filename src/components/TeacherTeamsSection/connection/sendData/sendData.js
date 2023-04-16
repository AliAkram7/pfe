import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query"
import { createAppointments, createRoom } from "./axiosUrl"



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
        onSuccess: (response) => {

            showNotification({
                title: 'room created seccusfully',
                message: '',
                color: 'green',
            })
            queryClient.invalidateQueries('getAllRooms');
        }
    })
}

export const useCreateAppointments = () => {
    const queryClient = useQueryClient()

    return useMutation(createAppointments, {

        onError: () => {

            showNotification({
                title: 'error ',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {

            showNotification({
                title: 'appointments created seccusfully',
                message: '',
                color: 'green',
            })
            queryClient.invalidateQueries('getAllRooms');
        }
    })
}



