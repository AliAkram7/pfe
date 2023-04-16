import { useQuery } from "react-query";
import { adminfetchDepartmentsInfo,  fetchDepartmentInfo, fetchStudentsData } from "./axiosUrl";


export const useFetchDepartmentInfo=(onSuccess)=>{
    return useQuery('fetchDepartmentInfo', fetchDepartmentInfo,
     {  onSuccess:()=>{} , 
    }  )
}

// fetchStudentsDate


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