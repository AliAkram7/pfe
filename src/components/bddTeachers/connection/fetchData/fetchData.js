import { useQuery } from "react-query";
import axiosClient from "../../../../axois-client";
import { adminfetchDepartmentsInfo,  fetchDepartmentInfo, fetchGradesData, fetchResearchFocus, fetchRolesData, fetchStudentsData, fetchTeachersData } from "./axiosUrl";


export const useFetchDepartmentInfo=(onSuccess)=>{
    return useQuery('fetchDepartmentInfo', fetchDepartmentInfo,
     {  onSuccess:()=>{} , 
    }  )
}


export const useFetchStudentsData=(payload)=>{

    return useQuery(['fetchStudentsData', payload], fetchStudentsData,
     {  onSuccess:()=>{} , 
            refetchOnWindowFocus:false, 
    }
    
    )
}

export const useAdminfetchDepartmentsInfo=(onSuccess)=>{
    return useQuery('adminfetchDepartmentsInfo', adminfetchDepartmentsInfo,
     {  onSuccess:()=>{} , 
    }  )
}

export const useAdminFetchTeachersData=()=>{
    return useQuery('fetchTeachersData', fetchTeachersData, {

    })
}

// fetchGradesData


export const useAdminFetchGradesData=()=>{
    return useQuery('fetchGradesData', fetchGradesData, {
    })
}

export const useAdminFetchRolesData=()=>{
    return useQuery('fetchRolesData', fetchRolesData, {
    })
}

// fetchResearchFocus

export const useFetchResearchFocus=()=>{
    return useQuery('fetchResearchFocus', fetchResearchFocus, {
    })
}


