import axiosClient  from "../../../../axois-client" 
export const sendChoice =(payload)=>{
    return axiosClient.post("/student/updateListOfThemeChooses", payload) ; 
}

