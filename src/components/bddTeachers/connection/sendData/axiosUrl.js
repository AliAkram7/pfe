import axiosClient from "../../../../axois-client";

export const uploadStudentSeeder=(payload)=>{
    return axiosClient.post('/teacher/department_manager/upload', payload) ; 
}

export const addTeacher=(payload)=>{
    return axiosClient.post('/admin/teacher/addTeacher',payload) ; 
}

export const deleteTeacher=(payload)=>{
    return axiosClient.post('/admin/teacher/deleteAccount',payload) ;  
}

export const updateTeacher=(payload)=>{
    return axiosClient.post('/admin/teacher/updateTeacherAccount',payload) ; 
}


export const resetTeacher=(payload)=>{
    return axiosClient.post('/admin/teacher/resetAccount',payload) ;  
}

export const lockTeacherAccount=(payload)=>{
    return axiosClient.post('/admin/teacher/lockAccount',payload) ; 
}

export const unLockTeacherAccount=(payload)=>{
    return axiosClient.post('/admin/teacher/unLockAccount',payload) ; 
}





