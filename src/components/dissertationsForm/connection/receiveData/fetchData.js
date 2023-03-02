import {  fetchTheme } from "./axoisUrl";
import {useQuery} from "react-query";


export const useFetchTheme =(onSuccess, onError)=>{
    return useQuery('fetchTheme',fetchTheme,{
        onSuccess, 
        onError
    })
}
