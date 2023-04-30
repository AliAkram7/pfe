import axois from "axios";
import { axiosClient } from "../../../../axois-client";

// ! receive a table of Rank
export const fetchRanking = ({queryKey}) => {
    const studentSpecialtyId = queryKey[1]
    return axiosClient.get(`/getRanking/${studentSpecialtyId}`);
}


export const fetchInscription = () => {
    return axiosClient.get("/getInscriptions");
}

