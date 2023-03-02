import { axiosClient } from "../../../../axois-client";

export const fetchTeacherData =()=>{
    return axiosClient.get('/teacher/info');
}

