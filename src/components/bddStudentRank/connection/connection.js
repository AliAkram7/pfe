import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosClient from "../../../axois-client";


const getRanking = ({ queryKey }) => {
    const selectedYearId = queryKey[1];

    return axiosClient.get(`/teacher/specialty_manager/getRanking/${selectedYearId}`);
}


export const useGetRanking = (selectedYearId) => {
    return useQuery(['MSFetchRanking', selectedYearId], getRanking, {
        // refetchOnWindowFocus:false , 
        refetchInterval: 30 * 1000,
    }
    )
}
const getStudentsWithoutRank = ({ queryKey }) => {
    const selectedYearId = queryKey[1]
    return axiosClient.get(`/teacher/specialty_manager/getStudentWithoutRank/${selectedYearId}`);
}

export const useGetStudentsWithoutRank = (selectedYearId) => {
    return useQuery(['getStudentsWithoutRank', selectedYearId], getStudentsWithoutRank, {});
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
    const queryClient = useQueryClient()
    return useMutation(uploadStudentsRanks, {
        onSuccess: () => {
            queryClient.invalidateQueries('MSFetchRanking')
        }
    })
}

//  /teacher/specialty_manager/deleteRank

const deleteStudentRank = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/deleteRank', payload)
}

export const useDeleteStudentRank = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteStudentRank, {
        onSuccess: () => {
            queryClient.invalidateQueries('MSFetchRanking')
        }
    })
}

const updateRank = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/updateRank', payload);
}


export const useUpdateRank = () => {
    const queryClient = useQueryClient();
    return useMutation(updateRank, {
        onSuccess: () => {
            queryClient.invalidateQueries('MSFetchRanking')
        }
    })
}

export const teacherFetchYearScholar = () => {
    return axiosClient.get('/teacher/fetchYearsScholar');
}


export const useTeacherFetchYearScholar = (onSuccess) => {
    return useQuery('teacherFetchYearScholar', teacherFetchYearScholar,
        {
            onSuccess: () => { },
        })
}