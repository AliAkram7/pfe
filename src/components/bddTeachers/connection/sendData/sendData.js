import { useMutation, useQueryClient } from "react-query";
import {  addTeacher,  deleteTeacher,  lockTeacherAccount,  resetTeacher,  unLockTeacherAccount,  updateTeacher, uploadStudentSeeder } from "./axiosUrl";

export const useUploadStudentSeeder = () => {
    const QueryClient = useQueryClient();
    return useMutation(uploadStudentSeeder, {

        onError: (response) => {
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
            console.log('file uploaded')
                QueryClient.invalidateQueries('fetchTeachersData')
        }
    })
}



export const useAddTeacher = () => {
    const QueryClient = useQueryClient();
    return useMutation(addTeacher, {
        onError: (response) => {
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
                QueryClient.invalidateQueries('fetchTeachersData')
        }
    })
}


export const useDeleteTeacher = () => {
    const QueryClient = useQueryClient();
    return useMutation(deleteTeacher, {
        onError: (response) => {
           
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
                
            })
        },  
        onSuccess:()=>{
            console.log('file uploaded')
                QueryClient.invalidateQueries('fetchTeachersData')
        }
    })
}

export const useResetTeacher = () => {
    const QueryClient = useQueryClient();
    return useMutation(resetTeacher, {
        onError: (response) => {
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
            console.log('file uploaded')
                QueryClient.invalidateQueries('fetchTeachersData')
        }
    })
}

export const useUpdateTeacher = () => {
    const QueryClient = useQueryClient();
    return useMutation(updateTeacher, {
        onError: (response) => {
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
                QueryClient.invalidateQueries('fetchTeachersData')
        }
    })
}

export const useLockTeacherAccount = () => {
    const QueryClient = useQueryClient();
    return useMutation(lockTeacherAccount, {
        onError: (response) => {
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
                QueryClient.invalidateQueries('fetchTeachersData')
        }
    })
}
export const useUnLockTeacherAccount = () => {
    const QueryClient = useQueryClient();
    return useMutation(unLockTeacherAccount, {
        onError: (response) => {
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
                QueryClient.invalidateQueries('fetchTeachersData')
        }
    })
}