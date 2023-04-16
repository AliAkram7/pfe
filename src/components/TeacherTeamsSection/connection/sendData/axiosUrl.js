import axois from "axios";
import { axiosClient } from "../../../../axois-client";

export const createRoom = (sendedSata) => {
    return axiosClient.post('/createRoom', sendedSata)
}

export const createAppointments =(payload)=>{
    return axiosClient.post('/teacher/createAppointment', payload)
}
