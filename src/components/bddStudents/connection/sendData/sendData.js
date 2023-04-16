import { useMutation, useQueryClient } from "react-query";
import { addStudent, deleteStudent, lockStudentAccount, resetStudent, unLockStudentAccount, updateStudent, uploadStudentSeeder } from "./axiosUrl";

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

                QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}


// addStudent

export const useAddStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(addStudent, {
        onError: (response) => {
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


export const useDeleteStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(deleteStudent, {
        onError: (response) => {
           
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

export const useResetStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(resetStudent, {
        onError: (response) => {
           
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

// 

export const useUpdateStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(updateStudent, {
        onError: (response) => {
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