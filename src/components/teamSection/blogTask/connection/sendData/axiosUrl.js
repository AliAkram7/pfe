import { axiosClient } from "../../../../../axois-client"


export const StudentsendMessage = (sendedSata) => {
    return axiosClient.post('/studentsendMessage', sendedSata)
}

