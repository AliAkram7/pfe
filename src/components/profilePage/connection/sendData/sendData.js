import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query"
import { sendUpdatedData } from "./axiosUrl"



export const useSendStudentUpdatedData = () => {
    const queryClient = useQueryClient();
    return useMutation(sendUpdatedData, {
        onError: (response) => {
            console.log(response.message);

            showNotification({
                title: 'error in changing information ',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: (response) => {

            showNotification({
                title: 'information updated seccusfully',
                message: '',
                color: 'green',
            })

            queryClient.invalidateQueries('fetchStudentData')
        }
    })
}