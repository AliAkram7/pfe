import { axiosClient } from "../../../../axois-client";


// ! receive a table of theme
export const getStudentTeamInformation =()=>{
    return axiosClient.get('/getStudentTeamInformation');
}

export const getAllRooms =()=>{
    return axiosClient.post('/getRooms');
}




