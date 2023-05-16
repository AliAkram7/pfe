import { useQuery, useQueryClient } from "react-query";
import axiosClient from "../../../axois-client";
import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";


const fetchSpecialtyInformation = () => {
    return axiosClient.get('/teacher/specialty_manager/fetchSpecialtyInfo');
}


export const useFetchSpecialtyInformation = () => {
    return useQuery('fetchSpecialtyInformation', fetchSpecialtyInformation, {
        // refetchInterval: 30 * 1000,

    }
    )
}


const fetchListTheme = ({ queryKey }) => {
    const yearId = queryKey[1];
    return axiosClient.get(`/teacher/specialty_manager/fetchSuggestedTheme/${yearId}`);
}
export const userFetchListTheme = (yearId) => {
    return useQuery(['fetchListOfTheme', yearId], fetchListTheme, {
        refetchInterval: 30 * 1000,
        // refetchOnWindowFocus: false,
        // cacheTime: 1000 
    })
}

// /teacher/specialty_manager/SpecialtyManagerValidity 

const validateTheme = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/SpecialtyManagerValidity', payload);
}

export const useValidateTheme = () => {
    const queryClient = useQueryClient()

    return useMutation(validateTheme, {
        onSuccess: () => {
            queryClient.invalidateQueries('fetchListOfTheme');
        }

    }
    )
}


const publishListOfTheme = () => {
    return axiosClient.post('/teacher/specialty_manager/publishTheListOfThemes');
}


export const usePublishListOfTheme = () => {

    return useMutation(publishListOfTheme, {
        onSuccess: () => {
            showNotification({
                title: 'theme published successfully',
                message: '',
                color: 'green',

            });

        },
    })

}
const affectThemeToStudents = () => {
    return axiosClient.post('/teacher/specialty_manager/affectThemeToStudents');
}

export const useAffectThemeToStudents = () => {
    return useMutation(affectThemeToStudents, {});
}


const affectFramerToStudents = () => {
    return axiosClient.post('/teacher/specialty_manager/affectFramerToStudents');
}

export const useAffectFramerToStudents = () => {
    return useMutation(affectFramerToStudents, {});
}

