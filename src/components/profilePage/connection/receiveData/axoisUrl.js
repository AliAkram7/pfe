import axois from "axios";
import { axiosClient } from "../../../../axois-client";


// ! receive a table of theme
export const  fetchStudentData =()=>{
        return  axiosClient.get(`/student/info`);        
}

