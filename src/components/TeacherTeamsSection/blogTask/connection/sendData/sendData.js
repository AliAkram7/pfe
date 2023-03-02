import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query"
import { TeachersendMessage } from "./axiosUrl";




export const useTeachersendMessage = () => {
    const QueryClient = useQueryClient();
    return useMutation(TeachersendMessage, {


        onError: (response) => {
            // console.log(response.message);
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
                QueryClient.invalidateQueries('getAllRoomMessages')
        }
    })
}