import { useMutation, useQueryClient } from "react-query";
import { addStudent, deleteStudent, lockStudentAccount, unLockStudentAccount, updateStudent, uploadStudentSeeder } from "./axiosUrl";

export const useUploadStudentSeeder = () => {
    const QueryClient = useQueryClient();
    return useMutation(uploadStudentSeeder, {

        onError: (response) => {
            console.log(response.message);
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
            console.log('file uploaded')
                QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}


// addStudent

export const useAddStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(addStudent, {
        onError: (response) => {
            console.log(response.message);
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
            console.log('file uploaded')
                QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}


export const useDeleteStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(deleteStudent, {
        onError: (response) => {
            console.log(response.message);
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
            console.log('file uploaded')
                QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}

export const useUpdateStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(updateStudent, {
        onError: (response) => {
            console.log(response.message);
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
                QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}

export const useLockStudentAccount = () => {
    const QueryClient = useQueryClient();
    return useMutation(lockStudentAccount, {
        onError: (response) => {
            console.log(response.message);
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
                QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}
export const useUnLockStudentAccount = () => {
    const QueryClient = useQueryClient();
    return useMutation(unLockStudentAccount, {
        onError: (response) => {
            console.log(response.message);
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },  
        onSuccess:()=>{
                QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}