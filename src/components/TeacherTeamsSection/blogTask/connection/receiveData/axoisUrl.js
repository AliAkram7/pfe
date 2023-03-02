import { axiosClient } from "../../../../../axois-client";
import { useStateContext } from "../../../../../contexts/ContextProvider";


// ! receive a table of theme   
export const getAllRoomMessages = ({queryKey}) => {
    const paylod = queryKey[1] ;
    return axiosClient.get(`/teacher/getMessages/${paylod}`)

        ;
}

