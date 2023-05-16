import { useQuery, useQueryClient } from "react-query";
import axiosClient from "../../../axois-client";
import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";


const fetchListTeams = ({ queryKey }) => {
    const selectedYearId = queryKey[1];
    return axiosClient.get(`/teacher/specialty_manager/fetchTeams/${selectedYearId}`);
}
export const userFetchListTeams = (selectedYearId) => {
    return useQuery(['fetchListTeams', selectedYearId], fetchListTeams, {
        // refetchInterval: 30 * 1000,
        refetchOnWindowFocus: false,
        // cacheTime: 1000 
    })
}

const fetchSingleStudents = ({queryKey}) => {
    const  selectedYearId = queryKey[1] ;
    return axiosClient.get(`/teacher/specialty_manager/fetchSingleStudents/${selectedYearId}`);
}

export const useFetchSingleStudents = (selectedYearId) => {
    return useQuery(["fetchSingleStudents", selectedYearId], fetchSingleStudents, {});
}

// /teacher/specialty_manager/addSingleStudentInTeam


const addSingleStudentInTeam = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/addSingleStudentInTeam', payload);
}


export const useAddSingleStudentInTeam = () => {
    const queryClient = useQueryClient()
    return useMutation(addSingleStudentInTeam, {
        onSuccess: () => {
            queryClient.invalidateQueries('fetchSingleStudents');
            queryClient.invalidateQueries('fetchListTeams');
        }
    });
}




const createPeriod = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/createPeriod', payload);
}


export const useCreatePeriod = () => {
    const queryClient = useQueryClient()
    return useMutation(createPeriod, {
        onSuccess: () => {
            queryClient.invalidateQueries('fetchSingleStudents');
            queryClient.invalidateQueries('fetchListTeams');
        }
    });
}


const getAppointmentsDates = ({ queryKey }) => {
    const payload = queryKey[1];
    return axiosClient.post('/teacher/specialty_manager/getAppointmentsDates', payload);
}
export const useGetAppointmentsDates = (payload) => {
    return useQuery(['getAppointmentsDates', payload], getAppointmentsDates, {
        refetchOnWindowFocus: false,
        retry: false,
    })
}


const getAppointmentInfo = ({ queryKey }) => {
    const payload = queryKey[1];
    return axiosClient.post('/teacher/specialty_manager/fetchAppointmentData', payload);
}


export const useGetAppointmentInfo = (payload) => {
    const queryClient = useQueryClient()
    return useQuery(['getAppointmentInfo', payload], getAppointmentInfo, {});
}



const fetchTeachers = ({queryKey}) => {
    const supervisor_code = queryKey[1]
    return axiosClient.get(`/teacher/specialty_manager/fetchTeachers/${supervisor_code}`);
}


export const useFetchTeachers = (payload) => {
    const queryClient = useQueryClient()
    return useQuery(['fetchTeachersJury',payload], fetchTeachers, {
        refetchOnWindowFocus: false,
    });
}


const sendLicenseJuryMember = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/sendListOfLicenseJury', payload);
}

export const useSendLicenseJuryMember = () => {
    return useMutation(sendLicenseJuryMember, {});
}

// /teacher/specialty_manager/fetchJuryMembersGroups


const fetchJuryMembersGroups = () => {
    return axiosClient.get('/teacher/specialty_manager/fetchJuryMembersGroups');
}


export const useFetchJuryMembersGroups = () => {

    return useQuery('fetchJuryMembersGroups', fetchJuryMembersGroups, {
        refetchOnWindowFocus: false,
    });
}



const createPresentation = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/createPresentation', payload);
}

export const useCreatePresentation = () => {
    return useMutation(createPresentation, {});
}


// /teacher/specialty_manager/affectJuryToTeamsRn


const createPresentationRn = (payload) => {
    return axiosClient.post('/teacher/specialty_manager/affectJuryToTeamsRn', payload);
}

export const useCreatePresentationRn = () => {
    return useMutation(createPresentationRn, {
        onError: (response) => {
            showNotification({
                title: 'error',
                message: 'some things goes wrong try again later',
                color: 'red',
            })
        },
        onSuccess: () => {
            showNotification({
                title: 'presentation date fixed successfully',
                message: '',
                color: 'green',
            });

        },
    });
}
