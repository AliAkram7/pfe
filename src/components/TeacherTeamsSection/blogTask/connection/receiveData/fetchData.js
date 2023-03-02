import { getAllRoomMessages } from "./axoisUrl";
import {useQuery} from "react-query";


export const useGetAllRoomMessages =(paylod)=>{
    return useQuery(  ['getAllRoomMessages', paylod],getAllRoomMessages,{
        refetchInterval: 30*1000 ,
    } )
}




