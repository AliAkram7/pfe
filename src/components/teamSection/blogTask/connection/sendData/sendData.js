import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query"
import { StudentsendMessage } from "./axiosUrl";




export const useStudentsendMessage = () => {
    const QueryClient = useQueryClient();
    return useMutation(StudentsendMessage, {

        onError: (response) => {
            console.log(response.message);
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