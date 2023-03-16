import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosClient from "../../../axois-client"




const fetchListOfFramer = () => {
    return axiosClient.get('/teacher/specialty_manager/fetchFramerTeacher');
}

export const useFetchListOfFramer = () => {
    return useQuery('fetchListOfFramer', fetchListOfFramer, {})
}


const fetchListOfNotFramer = () => {
    return axiosClient.get('/teacher/specialty_manager/getTeacherNotFramer');
}

export const useFetchListOfNotFramer = () => {
    return useQuery('fetchListOfNotFramer', fetchListOfNotFramer, {})
}


const addTeacherAsFramer = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/addFramer', payload);
}

export const useAddTeacherAsFramer = () => {
    const queryClient = useQueryClient();
    return useMutation(addTeacherAsFramer, {
        onSuccess: () => {
            queryClient.invalidateQueries('fetchListOfNotFramer')
            queryClient.invalidateQueries('fetchListOfFramer')
        }
    })
}

const deleteTeacherFarmer = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/removeFarmer', payload)
}

export const useDeleteTeacherFarmer = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteTeacherFarmer, {
        onSuccess: () => {
            queryClient.invalidateQueries('fetchListOfNotFramer')
            queryClient.invalidateQueries('fetchListOfFramer')
        }
    })
}

// /teacher/specialty_manager/publishListOfFarmers


const publishListOfFarmers = () => {
    return axiosClient.post('/teacher/specialty_manager/publishListOfFarmers');
}

export const usePublishListOfFarmers = () => {
    return useMutation(publishListOfFarmers, {})
}

