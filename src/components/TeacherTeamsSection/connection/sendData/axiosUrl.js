import axois from "axios";
import { axiosClient } from "../../../../axois-client";

export const createRoom = (sendedSata) => {
    return axiosClient.post('/createRoom', sendedSata)
}

