import axois from "axios";
import { axiosClient } from "../../../../axois-client";

export const sendUpdatedData = (sendedSata) => {
    return axiosClient.post('/student/update/info', sendedSata)
}

