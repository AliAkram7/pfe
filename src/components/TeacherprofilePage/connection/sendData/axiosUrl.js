import { axiosClient } from "../../../../axois-client";

export const sendUpdatedData = (sendedSata) => {
    return axiosClient.post('/teacher/update/info', sendedSata)
}

