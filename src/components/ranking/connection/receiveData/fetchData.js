import {  fetchRanking } from "./axoisUrl";
import {useQuery} from "react-query";


export const useFetchRanking  =(onSuccess, onError)=>{
    return useQuery('fetchRanking',fetchRanking,{
        onSuccess, 
        onError
    }
    
    )
}
