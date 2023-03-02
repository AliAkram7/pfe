import { axiosClient } from "../../../../../axois-client";
import { useStateContext } from "../../../../../contexts/ContextProvider";


// ! receive a table of theme   
export const getAllRoomMessages = ({queryKey}) => {
    const payload = queryKey[1] ;
    return axiosClient.get(`/student/getMessages/${payload}`)
}

