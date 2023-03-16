import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosClient from "../../../axois-client";


const getRanking = () => {
    return axiosClient.get('/teacher/specialty_manager/getRanking');

}

export const useGetRanking = () => {
    return useQuery('MSFetchRanking', getRanking, {
        // refetchOnWindowFocus:false , 
        refetchInterval: 30 * 1000,

    }
    )
}
const getStudentsWithoutRank = () => {
    return axiosClient.get('/teacher/specialty_manager/getStudentWithoutRank');
}

export const useGetStudentsWithoutRank = () => {
    return useQuery('getStudentsWithoutRank', getStudentsWithoutRank, {});
}

const addRankByStudent = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/addRankByStudent', payload);
}

export const useAddRankStudent = () => {
    const queryClient = useQueryClient()
    return useMutation(addRankByStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries('MSFetchRanking')
        }
    })
}


const uploadStudentsRanks = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/uploadRanks', payload)
}

export const useUploadStudentsRanks = () => {
    return useMutation(uploadStudentsRanks, {

    })
}

//  /teacher/specialty_manager/deleteRank

const deleteStudentRank = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/deleteRank', payload)
}

export const useDeleteStudentRank = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteStudentRank, {
        onSuccess:()=>{
            queryClient.invalidateQueries('MSFetchRanking')
        }
    })
}

const updateRank=(payload)=>{
    return axiosClient.post('/teacher/specialty_manager/updateRank',payload) ; 
}


export const useUpdateRank=()=>{
    const queryClient = useQueryClient() ; 
    return useMutation(updateRank, {
        onSuccess:()=>{
            queryClient.invalidateQueries('MSFetchRanking')
        }
    })
}


