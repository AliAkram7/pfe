import { axiosClient } from "../../../../axois-client";


// ! receive a table of theme
export const getTeamsInformation = () => {
    return axiosClient.get('/teacher/getTeams');
}

export const getAllRoomsByTeam = ({ queryKey }) => {
    const paylod = queryKey[1];
    return axiosClient.get(`/teacher/getRoomsByTeam/${paylod}`);
}




