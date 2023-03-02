import { axiosClient } from "../../../../../axois-client"


export const TeachersendMessage = (sendedSata) => {
    return axiosClient.post('/teacher/sendMessage', sendedSata)
}

