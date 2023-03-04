import axiosClient from "../../../../axois-client";

export const uploadStudentSeeder=(payload)=>{
    return axiosClient.post('/teacher/department_manager/upload', payload) ; 
}

export const addStudent=(payload)=>{
    return axiosClient.post('/teacher/department_manager/addStudent',payload) ; 
}



export const deleteStudent=(payload)=>{
    return axiosClient.post('/teacher/department_manager/deleteAccount',payload) ;  
}



export const updateStudent=(payload)=>{
    return axiosClient.post('/teacher/department_manager/updateAccount',payload) ; 
}

export const lockStudentAccount=(payload)=>{
    return axiosClient.post('/teacher/department_manager/lockAccount',payload) ; 
}

export const unLockStudentAccount=(payload)=>{
    return axiosClient.post('/teacher/department_manager/unLockAccount',payload) ; 
}


