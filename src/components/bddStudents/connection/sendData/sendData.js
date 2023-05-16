import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { addStudent, deleteStudent, deleteStudentInscription, lockStudentAccount, resetStudent, unLockStudentAccount, updateStudent, uploadStudentSeeder } from "./axiosUrl";

export const useUploadStudentSeeder = () => {
    const QueryClient = useQueryClient();
    return useMutation(uploadStudentSeeder, {

        onError: (response) => {
            showNotification({
                title: 'Error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {

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
                title: 'Error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {
            QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}


export const useDeleteStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(deleteStudent, {
        onError: () => {

            showNotification({
                title: 'Error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {
            showNotification({
                title: 'Success',
                message: 'delete students account  successfully',
                color: 'red',
            })
            QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}

export const useDeleteInscription = () => {
    const QueryClient = useQueryClient();
    return useMutation(deleteStudentInscription, {
        onError: () => {

            showNotification({
                title: 'Error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
            QueryClient.invalidateQueries('fetchStudentsData')

        },
        onSuccess: () => {
            showNotification({
                title: 'Success',
                message: 'delete students inscription successfully',
                color: 'teal',
            })
            QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}



export const useResetStudent = () => {
    const QueryClient = useQueryClient();
    return useMutation(resetStudent, {
        onError: () => {

            showNotification({
                title: 'Error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {

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
                title: 'Error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {
            QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}

export const useLockStudentAccount = () => {
    const QueryClient = useQueryClient();
    return useMutation(lockStudentAccount, {
        onError: (response) => {
            showNotification({
                title: 'Error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {
            QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}
export const useUnLockStudentAccount = () => {
    const QueryClient = useQueryClient();
    return useMutation(unLockStudentAccount, {
        onError: (response) => {
            showNotification({
                title: 'Error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {
            QueryClient.invalidateQueries('fetchStudentsData')
        }
    })
}