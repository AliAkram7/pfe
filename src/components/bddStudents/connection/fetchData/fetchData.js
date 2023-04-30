import { useQuery } from "react-query";
import { adminfetchDepartmentsInfo,  adminFetchYearScholar,  fetchDepartmentInfo, fetchStudentsData } from "./axiosUrl";


export const useFetchDepartmentInfo=(onSuccess)=>{
    return useQuery('fetchDepartmentInfo', fetchDepartmentInfo,
     {  onSuccess:()=>{} , 
    }  )
}

// fetchStudentsDate


export const useFetchStudentsData=(payload, year)=>{

    return useQuery(['fetchStudentsData', payload ,year ], fetchStudentsData,
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



export const useAdminFetchYearScholar=(onSuccess)=>{
    return useQuery('adminFetchYearScholar', adminFetchYearScholar,
     {  onSuccess:()=>{} , 
    }  )
}
// adminFetchYearScholar

