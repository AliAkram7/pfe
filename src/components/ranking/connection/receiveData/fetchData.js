import {  fetchInscription, fetchRanking } from "./axoisUrl";
import {useQuery} from "react-query";


export const useFetchRanking  =(studentSpecialtyId)=>{
    return useQuery(['fetchRanking',studentSpecialtyId],fetchRanking,{

    }
    
    )
}



export const useFetchInscription =()=>{
    return useQuery('fetchInscription',fetchInscription,{
    })
}

