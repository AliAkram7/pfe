import { getAllRoomMessages } from "./axoisUrl";
import {useQuery} from "react-query";


export const useGetAllRoomMessages =(payload)=>{
    return useQuery(  ['getAllRoomMessages', payload],getAllRoomMessages,{
        // refetchInterval: 30*1000 ,
    } )
}




