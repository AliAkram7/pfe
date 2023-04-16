import { useQuery } from "react-query";
import axiosClient from "../../axois-client"


const fetchAffectationResult =()=>{
    return axiosClient.get('/students/resultOfAffectation') ; 
}

export const  useFetchAffectationResult=()=>{
    return useQuery('fetchAffectationResult', fetchAffectationResult)  ; 
}