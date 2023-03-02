import axois from "axios";
import { axiosClient } from "../../../../axois-client";

// ! receive a table of Rank
export const fetchRanking =()=>{
    return axiosClient.get("http://localhost:8000/api/getRanking");
}

